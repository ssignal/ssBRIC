#!/usr/bin/env python3
"""Generate Blockly sources from BehaviorList/BTList.json and prompt_block_btList.

This generator reads the prompt file, loads BT list metadata, and writes:
1) block JSON definitions in bric_app/src/CustomBlocks/blockJson
2) block register JS in bric_app/src/CustomBlocks
3) code generator JS in bric_app/src/Generators
4) toolbox category entries in bric_app/src/Toolbox/toolboxCustomBasic.js

The prompt does not define an explicit block-json output path, so this script
uses:
  bric_app/src/CustomBlocks/blockJson/BTList_{module}.json
"""

from __future__ import annotations

import argparse
import json
import os
import re
from collections import OrderedDict
from pathlib import Path
from typing import Any


def _extract(pattern: str, text: str, default: str = "") -> str:
    match = re.search(pattern, text, flags=re.MULTILINE | re.DOTALL)
    return match.group(1).strip() if match else default


def parse_prompt(prompt_path: Path) -> dict[str, str]:
    text = prompt_path.read_text(encoding="utf-8")
    behavior_list_path = _extract(
        r"## BehaviorList\s*(.*?)\n## Block Register",
        text,
        default="./BehaviorList/BTList.json",
    )
    behavior_list_candidates = re.findall(r"([A-Za-z0-9_./-]+\.json)", behavior_list_path)
    behavior_list_file = behavior_list_candidates[0] if behavior_list_candidates else "./BehaviorList/BTList.json"

    block_register_template = _extract(
        r"## Block Register\s*-?\s*Output Path:\s*([^\n]+)",
        text,
        default="bric_app/src/CustomBlocks/ros2Blocks_{YYY}.js",
    )
    generator_template = _extract(
        r"## Code generator\s*-?\s*Output Path:\s*([^\n]+)",
        text,
        default="bric_app/src/Generators/ros2Blocks_{YYY}.js",
    )
    toolbox_path = _extract(
        r"## Toolbox\s*Output Path:\s*([^\n]+)",
        text,
        default="./Toolbox/toolboxCustomBasic.js",
    )

    return {
        "behavior_list_file": behavior_list_file,
        "block_register_template": block_register_template,
        "generator_template": generator_template,
        "toolbox_path": toolbox_path,
    }


def resolve_behavior_list_path(repo_root: Path, configured_path: str) -> Path:
    candidates = [
        repo_root / configured_path,
        repo_root / "BehaviorList/BTList.json",
        repo_root / "BehaviorList/BT_List.json",
        repo_root / configured_path.replace("BehaviroList", "BehaviorList").replace("BT_List", "BTList"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError(f"Behavior list file not found. Tried: {', '.join(str(c) for c in candidates)}")


def humanize(text: str) -> str:
    return re.sub(r"[_/]+", " ", text).strip()


def to_field_name(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9]+", "_", name).strip("_").upper()


def slugify_ascii(text: str) -> str:
    slug = re.sub(r"[^A-Za-z0-9]+", "_", text).strip("_").lower()
    return slug


def resolve_module_suffix(category: str, items: list[dict[str, Any]]) -> str:
    category_slug = slugify_ascii(category)
    if category_slug:
        return category_slug

    prefixes = []
    for item in items:
        action = str(item.get("action", ""))
        prefix = action.split("/", 1)[0].strip()
        if prefix:
            prefixes.append(slugify_ascii(prefix))

    prefixes = [prefix for prefix in prefixes if prefix]
    if prefixes:
        first = prefixes[0]
        if all(prefix == first for prefix in prefixes):
            return first

    return "btlist"


def build_dropdown_options_from_values(min_value: Any, max_value: Any) -> list[list[str]] | None:
    if min_value is None or max_value is None:
        return None
    if not isinstance(min_value, int) or not isinstance(max_value, int):
        return None
    if max_value < min_value:
        return None
    if max_value - min_value > 100:
        return None
    return [[str(value), str(value)] for value in range(min_value, max_value + 1)]


def stringify_default(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, bool):
        return "true" if value else "false"
    return str(value)


def default_text_for_type(param_type: str) -> str:
    normalized = param_type.strip().lower()
    if normalized in {"float", "double", "number"}:
        return "0.0"
    if normalized in {"int", "integer"}:
        return "0"
    if normalized in {"str", "string"}:
        return ""
    return ""


QUESTION_ICON_SVG = (
    "data:image/svg+xml;utf8,"
    "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>"
    "<circle cx='9' cy='9' r='7.25' fill='white' stroke='black' stroke-width='1.5'/>"
    "<text x='9' y='12.2' text-anchor='middle' font-family='Arial,sans-serif' font-size='11' "
    "font-weight='700' fill='black'>?</text>"
    "</svg>"
)


def build_help_icon_arg(field_name: str, tooltip: str) -> dict[str, Any]:
    return {
        "type": "field_image",
        "name": field_name,
        "src": QUESTION_ICON_SVG,
        "width": 18,
        "height": 18,
        "alt": "?",
        "flipRtl": False,
        "x_tooltip": tooltip,
    }


def build_arg_from_parameter(param: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    name = str(param.get("name", "param"))
    field_name = to_field_name(name)
    help_field_name = f"{field_name}_HELP"
    param_type = str(param.get("type", "string"))
    description = str(param.get("description", "")).strip()
    options = param.get("options") or []
    min_value = param.get("min")
    max_value = param.get("max")

    metadata = {
        "name": name,
        "field": field_name,
        "help_field": help_field_name,
        "type": param_type,
        "description": description,
    }

    if isinstance(options, list) and options:
        dropdown_options: list[list[str]] = []
        for option in options:
            if isinstance(option, dict):
                value = stringify_default(option.get("value"))
                option_description = str(option.get("description", "")).strip()
            else:
                value = stringify_default(option)
                option_description = ""
            label = value if not option_description else f"{value} - {option_description}"
            dropdown_options.append([label, value])
        return (
            {
                "type": "field_dropdown",
                "name": field_name,
                "options": dropdown_options,
            },
            metadata,
        )

    range_options = build_dropdown_options_from_values(min_value, max_value)
    if range_options is not None:
        return (
            {
                "type": "field_dropdown",
                "name": field_name,
                "options": range_options,
            },
            metadata,
        )

    default_text = default_text_for_type(param_type)
    if min_value is not None and max_value is None:
        default_text = stringify_default(min_value)
    elif max_value is not None and min_value is None:
        default_text = stringify_default(max_value)

    return (
        {
            "type": "field_input",
            "name": field_name,
            "text": default_text,
        },
        metadata,
    )


def build_block_definitions(category: str, items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    module_suffix = resolve_module_suffix(category, items)
    block_defs: list[dict[str, Any]] = []

    for item in items:
        action = str(item.get("action", "")).strip()
        if not action:
            continue

        action_slug = slugify_ascii(action)
        block_type = f"c_bt_{module_suffix}_{action_slug}"
        parameters = item.get("parameters") or []
        args: list[dict[str, Any]] = []
        x_parameters: list[dict[str, Any]] = []
        description = str(item.get("description", "")).strip()

        args.append(build_help_icon_arg("HELP_ICON", description))
        labels = ["%1", humanize(action)]

        for param in parameters:
            arg_def, metadata = build_arg_from_parameter(param)
            args.append(build_help_icon_arg(metadata["help_field"], metadata["description"]))
            args.append(arg_def)
            x_parameters.append(metadata)
            labels.append(f"%{len(args) - 1} {humanize(metadata['name'])} %{len(args)}")

        block_def = {
            "type": block_type,
            "message0": " ".join(labels).strip(),
            "args0": args,
            "previousStatement": None,
            "nextStatement": None,
            "style": "execute_blocks",
            "tooltip": "",
            "helpUrl": "",
            "x_action": action,
            "x_category": category,
            "x_description": description,
            "x_parameters": x_parameters,
        }
        block_defs.append(block_def)

    return block_defs


def render_register_js(module_suffix: str, block_json_rel_import: str) -> str:
    export_name = re.sub(r"[^A-Za-z0-9]+", "_", module_suffix).strip("_") or "BTList"
    return f"""import Blockly from 'blockly/core';
import blockDefs from '{block_json_rel_import}';

const registerBlock = (def) => {{
  if (!def || !def.type) return;
  Blockly.Blocks[def.type] = {{
    init: function () {{
      this.jsonInit(def);
      this.setTooltip('');
      const helpField = this.getField('HELP_ICON');
      const description = String(def.x_description || '').trim() || String(def.args0?.[0]?.x_tooltip || '').trim();
      if (helpField && description) {{
        helpField.setTooltip(description);
      }}
      const params = Array.isArray(def.x_parameters) ? def.x_parameters : [];
      params.forEach((param) => {{
        const field = this.getField(param.help_field);
        const arg = Array.isArray(def.args0) ? def.args0.find((candidate) => candidate?.name === param.help_field) : null;
        const paramDescription = String(param.description || arg?.x_tooltip || '').trim();
        if (field && paramDescription) {{
          field.setTooltip(paramDescription);
        }}
      }});
    }},
  }};
}};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerBlock);

export {{ blockDefs as btListBlocks{export_name} }};
"""


def render_generator_js(module_suffix: str, block_json_rel_import: str) -> str:
    export_name = re.sub(r"[^A-Za-z0-9]+", "_", module_suffix).strip("_") or "BTList"
    return f"""import {{ javascriptGenerator }} from 'blockly/javascript';
import blockDefs from '{block_json_rel_import}';

const castValue = (raw, type) => {{
  const normalized = String(type || '').toLowerCase();
  if (normalized === 'integer' || normalized === 'int') {{
    const parsed = Number.parseInt(raw, 10);
    return Number.isNaN(parsed) ? raw : parsed;
  }}
  if (normalized === 'float' || normalized === 'double' || normalized === 'number') {{
    const parsed = Number.parseFloat(raw);
    return Number.isNaN(parsed) ? raw : parsed;
  }}
  if (normalized === 'bool' || normalized === 'boolean') {{
    if (raw === 'true') return true;
    if (raw === 'false') return false;
  }}
  return raw;
}};

const buildParameters = (block, def) => {{
  const output = {{}};
  const metas = Array.isArray(def.x_parameters) ? def.x_parameters : [];
  metas.forEach((meta) => {{
    output[meta.name] = castValue(block.getFieldValue(meta.field), meta.type);
  }});
  return output;
}};

const registerGenerator = (def) => {{
  if (!def || !def.type) return;
  javascriptGenerator.forBlock[def.type] = function (block) {{
    const payload = {{
      type: 'Action',
      action: def.x_action,
      parameter: buildParameters(block, def),
    }};
    return `console.log(${{JSON.stringify(JSON.stringify(payload))}});\\n`;
  }};
}};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerGenerator);

export {{ blockDefs as btListGenerators{export_name} }};
"""


def render_category_block(category: str, module_suffix: str, block_types: list[str]) -> str:
    lines = [
        f"    // AUTO-GEN-START: BTLIST_{module_suffix}",
        "    {",
        "      'kind': 'category',",
        f"      'name': {json.dumps(category, ensure_ascii=False)},",
        "      'categorystyle': 'execute_category',",
        "      'contents': [",
    ]
    for block_type in block_types:
        lines.extend(
            [
                "        {",
                "          'kind': 'block',",
                f"          'type': '{block_type}'",
                "        },",
            ]
        )
    if block_types:
        lines[-1] = lines[-1][:-1]
    lines.extend(
        [
            "      ],",
            "    },",
            f"    // AUTO-GEN-END: BTLIST_{module_suffix}",
        ]
    )
    return "\n".join(lines)


def strip_autogen_block(content: str, module_suffix: str) -> str:
    start_marker = f"// AUTO-GEN-START: BTLIST_{module_suffix}"
    end_marker = f"// AUTO-GEN-END: BTLIST_{module_suffix}"
    pattern = re.compile(rf"\s*{re.escape(start_marker)}.*?{re.escape(end_marker)}\s*", flags=re.DOTALL)
    return pattern.sub("\n", content)


def strip_named_category(content: str, category: str) -> str:
    encoded_category = json.dumps(category, ensure_ascii=False)
    pattern = re.compile(
        rf"""
        \n\s*\{{\n
        \s*'kind':\s*'category',\n
        \s*'name':\s*{re.escape(encoded_category)},\n
        [\s\S]*?
        \n\s*\],\n
        \s*\}},\n?
        """,
        flags=re.VERBOSE,
    )
    return pattern.sub("\n", content)


def resolve_toolbox_path(repo_root: Path, configured_path: str) -> Path:
    candidates = [
        repo_root / configured_path,
        repo_root / "bric_app/src" / configured_path.strip("./"),
        repo_root / "bric_app/src/Toolbox/toolboxCustomBasic.js",
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError(f"Toolbox file not found. Tried: {', '.join(str(c) for c in candidates)}")


def upsert_toolbox_category(
    toolbox_path: Path,
    category: str,
    module_suffix: str,
    block_types: list[str],
    dry_run: bool,
) -> None:
    content = toolbox_path.read_text(encoding="utf-8")
    category_text = render_category_block(category, module_suffix, block_types)
    content = strip_autogen_block(content, module_suffix)
    content = strip_named_category(content, category)

    sep_match = re.search(r"\{\s*'kind':\s*'sep'\s*,", content)
    insert_at = sep_match.start() if sep_match else content.rfind("  ],")
    if insert_at == -1:
        raise RuntimeError(f"Could not find toolbox insertion point: {toolbox_path}")

    prefix = content[:insert_at]
    if not prefix.endswith("\n"):
        prefix += "\n"
    content = prefix + category_text + "\n" + content[insert_at:]

    if not dry_run:
        toolbox_path.write_text(content, encoding="utf-8")


def upsert_autogen_import_block(
    file_path: Path,
    start_marker: str,
    end_marker: str,
    import_lines: list[str],
    anchor_pattern: str,
    dry_run: bool,
) -> None:
    content = file_path.read_text(encoding="utf-8")
    payload = "\n".join([f"// {start_marker}"] + import_lines + [f"// {end_marker}"])
    block_pattern = re.compile(
        rf"\n?\s*// {re.escape(start_marker)}.*?// {re.escape(end_marker)}\n?",
        flags=re.DOTALL,
    )

    if block_pattern.search(content):
        content = block_pattern.sub("\n" + payload + "\n", content)
    else:
        anchor = re.search(anchor_pattern, content, flags=re.MULTILINE)
        if not anchor:
            raise RuntimeError(f"Could not find insertion anchor in {file_path}")
        insert_at = anchor.end()
        content = content[:insert_at] + "\n" + payload + content[insert_at:]

    if not dry_run:
        file_path.write_text(content, encoding="utf-8")


def update_index_imports(repo_root: Path, suffixes: list[str], dry_run: bool) -> None:
    unique_suffixes = sorted(set(suffixes))
    if not unique_suffixes:
        return

    blocks_index = repo_root / "bric_app/src/CustomBlocks/blocks.js"
    generators_index = repo_root / "bric_app/src/Generators/generators.js"

    block_imports = [f"import './ros2Blocks_{suffix}.js';" for suffix in unique_suffixes]
    generator_imports = [f"import './ros2Blocks_{suffix}.js';" for suffix in unique_suffixes]

    upsert_autogen_import_block(
        file_path=blocks_index,
        start_marker="AUTO-GEN-START: BTLIST_BLOCK_IMPORTS",
        end_marker="AUTO-GEN-END: BTLIST_BLOCK_IMPORTS",
        import_lines=block_imports,
        anchor_pattern=r"^// AUTO-GEN-END: ROS2_BLOCK_IMPORTS\s*$",
        dry_run=dry_run,
    )
    upsert_autogen_import_block(
        file_path=generators_index,
        start_marker="AUTO-GEN-START: BTLIST_GENERATOR_IMPORTS",
        end_marker="AUTO-GEN-END: BTLIST_GENERATOR_IMPORTS",
        import_lines=generator_imports,
        anchor_pattern=r"^// AUTO-GEN-END: ROS2_GENERATOR_IMPORTS\s*$",
        dry_run=dry_run,
    )


def resolve_output_template(template: str, module_suffix: str) -> str:
    return template.replace("{YYY}", module_suffix)


def ensure_block_json_path(repo_root: Path, module_suffix: str) -> Path:
    return repo_root / f"bric_app/src/CustomBlocks/blockJson/BTList_{module_suffix}.json"


def write_text(path: Path, content: str, dry_run: bool) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not dry_run:
        path.write_text(content, encoding="utf-8")


def write_json(path: Path, data: Any, dry_run: bool) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not dry_run:
        path.write_text(json.dumps(data, ensure_ascii=True, indent=2) + "\n", encoding="utf-8")


def generate_for_category(
    repo_root: Path,
    category: str,
    items: list[dict[str, Any]],
    block_register_template: str,
    generator_template: str,
    toolbox_path: str,
    dry_run: bool,
) -> str:
    module_suffix = resolve_module_suffix(category, items)
    block_defs = build_block_definitions(category, items)

    block_json_out = ensure_block_json_path(repo_root, module_suffix)
    block_register_out = repo_root / resolve_output_template(block_register_template, module_suffix)
    generator_out = repo_root / resolve_output_template(generator_template, module_suffix)

    rel_for_register = os.path.relpath(block_json_out, start=block_register_out.parent).replace("\\", "/")
    rel_for_generator = os.path.relpath(block_json_out, start=generator_out.parent).replace("\\", "/")
    block_json_import_for_register = rel_for_register if rel_for_register.startswith(".") else f"./{rel_for_register}"
    block_json_import_for_generator = rel_for_generator if rel_for_generator.startswith(".") else f"./{rel_for_generator}"

    write_json(block_json_out, block_defs, dry_run=dry_run)
    write_text(
        block_register_out,
        render_register_js(module_suffix, block_json_import_for_register),
        dry_run=dry_run,
    )
    write_text(
        generator_out,
        render_generator_js(module_suffix, block_json_import_for_generator),
        dry_run=dry_run,
    )

    toolbox_abs = resolve_toolbox_path(repo_root, toolbox_path)
    upsert_toolbox_category(
        toolbox_path=toolbox_abs,
        category=category,
        module_suffix=module_suffix,
        block_types=[block_def["type"] for block_def in block_defs],
        dry_run=dry_run,
    )

    print(f"[ok] category:  {category}")
    print(f"[ok] blocks:    {block_json_out}")
    print(f"[ok] register:  {block_register_out}")
    print(f"[ok] generator: {generator_out}")
    print(f"[ok] toolbox:   {toolbox_abs}")
    return module_suffix


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate Blockly sources from prompt_block_btList")
    parser.add_argument("--repo-root", default=".", help="Repository root path")
    parser.add_argument("--prompt", default="prompt_block_btList", help="Prompt file path")
    parser.add_argument("--dry-run", action="store_true", help="Parse and print target outputs without writing files")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    prompt_path = (repo_root / args.prompt).resolve()
    if not prompt_path.exists():
        raise FileNotFoundError(f"Prompt file not found: {prompt_path}")

    conf = parse_prompt(prompt_path)
    behavior_list_path = resolve_behavior_list_path(repo_root, conf["behavior_list_file"])
    items = json.loads(behavior_list_path.read_text(encoding="utf-8"))
    if not isinstance(items, list):
        raise ValueError(f"Behavior list must be a JSON array: {behavior_list_path}")

    grouped: OrderedDict[str, list[dict[str, Any]]] = OrderedDict()
    for item in items:
        category = str(item.get("category", "")).strip()
        if not category:
            continue
        grouped.setdefault(category, []).append(item)

    generated_suffixes: list[str] = []
    for category, category_items in grouped.items():
        generated_suffixes.append(
            generate_for_category(
                repo_root=repo_root,
                category=category,
                items=category_items,
                block_register_template=conf["block_register_template"],
                generator_template=conf["generator_template"],
                toolbox_path=conf["toolbox_path"],
                dry_run=args.dry_run,
            )
        )

    update_index_imports(repo_root=repo_root, suffixes=generated_suffixes, dry_run=args.dry_run)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
