#!/usr/bin/env python3
"""Generate Blockly sources from prompt_block and ros2 command specs.

This script reads `prompt_block`, loads target command json files from `ros2command`,
and generates:
1) block JSON definitions in `bric_app/src/CustomBlocks/blockJson`
2) block register JS in `bric_app/src/CustomBlocks`
3) code generator JS in `bric_app/src/Generators`
4) toolbox category updates in `bric_app/src/Toolbox/toolboxCustomBasic.js`

It supports option-driven active child parameters via `x_dynamic` metadata.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path
from typing import Any


def _extract(pattern: str, text: str, default: str = "") -> str:
    m = re.search(pattern, text, flags=re.MULTILINE | re.DOTALL)
    return m.group(1).strip() if m else default


def parse_prompt(prompt_path: Path) -> dict[str, Any]:
    text = prompt_path.read_text(encoding="utf-8")
    file_path_block = _extract(r"# File Path(.*?)(?:# Special Case|\Z)", text, default=text)

    json_section = _extract(r"## Json file for blocks(.*?)(?:\n## |\Z)", file_path_block, default="")
    block_register_section = _extract(r"## Block Register(.*?)(?:\n## |\Z)", file_path_block, default="")
    toolbox_section = _extract(r"## Toolbox(.*?)(?:\n## |\Z)", file_path_block, default="")
    codegen_section = _extract(r"## Code generator(.*?)(?:\n## |\Z)", file_path_block, default="")

    target_path = _extract(r"Target Path:\s*([^\n]+)", json_section, default="ros2command")
    target_files_block = _extract(r"Target Files:\s*(.*?)\n\s*-\s*Output Path:", json_section, default="")
    target_files = re.findall(r"([A-Za-z0-9_./-]+\.json)", target_files_block)
    if not target_files:
        target_files = ["ros2_command_ai_HEAD.json"]

    block_json_template = _extract(
        r"Output Path:\s*([^\n]+)",
        json_section,
        default="bric_app/src/CustomBlocks/blockJson/{XXX}.json",
    )
    block_register_template = _extract(
        r"Output Path:\s*([^\n]+)",
        block_register_section,
        default="bric_app/src/CustomBlocks/ros2Blocks_{YYY}.js",
    )
    toolbox_path = _extract(
        r"Output Path:\s*([^\n]+)",
        toolbox_section,
        default="./Toolbox/toolboxCustomBasic.js",
    )
    codegen_template = _extract(
        r"Output Path:\s*([^\n]+)",
        codegen_section,
        default="bric_app/src/Generators/ros2Blocks_{YYY}.js",
    )

    return {
        "target_path": target_path,
        "target_files": target_files,
        "block_json_template": block_json_template,
        "block_register_template": block_register_template,
        "toolbox_path": toolbox_path,
        "codegen_template": codegen_template,
    }


def to_field_name(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9]+", "_", name).strip("_").upper()


def to_safe_id(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")


def humanize(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9]+", " ", name).strip().lower()


def stringify_value(value: Any) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    return str(value)


def parse_condition_equal(condition: str) -> tuple[str, str] | None:
    text = condition.strip()
    if not text:
        return None
    m = re.search(
        r"(?:only\s+when\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*==\s*([A-Za-z0-9_\"'\-]+)",
        text,
        flags=re.IGNORECASE,
    )
    if not m:
        return None
    key = m.group(1).strip()
    raw_value = m.group(2).strip()
    if (raw_value.startswith("'") and raw_value.endswith("'")) or (
        raw_value.startswith('"') and raw_value.endswith('"')
    ):
        raw_value = raw_value[1:-1]
    return key, raw_value


def build_dropdown_entries(param: dict[str, Any]) -> list[dict[str, str]]:
    options = param.get("options")
    if not isinstance(options, list) or not options:
        return []

    entries: list[dict[str, str]] = []
    for opt in options:
        value_str = stringify_value(opt.get("value", ""))
        desc = str(opt.get("description", "")).strip()
        condition = str(opt.get("condition", "")).strip()

        base = value_str if value_str else "(empty)"
        if desc:
            base = f"{base} - {desc}"
        if condition:
            base = f"{base} ({condition})"

        entries.append(
            {
                "label": base[:96],
                "value": value_str,
                "condition": condition,
            }
        )
    return entries


def build_arg_from_param(param: dict[str, Any]) -> dict[str, Any]:
    p_type = str(param.get("type", "str")).lower()
    default = param.get("default")
    field_name = to_field_name(str(param.get("name", "param")))

    dropdown_entries = build_dropdown_entries(param)
    if dropdown_entries:
        return {
            "type": "field_dropdown",
            "name": field_name,
            "options": [[entry["label"], entry["value"]] for entry in dropdown_entries],
        }

    if p_type == "bool":
        return {
            "type": "field_dropdown",
            "name": field_name,
            "options": [["true", "true"], ["false", "false"]],
        }

    if p_type in {"int", "float", "number"}:
        value = default if isinstance(default, (int, float)) else 0
        return {
            "type": "field_number",
            "name": field_name,
            "value": value,
            "precision": 1,
        }

    # Default to text input for str and others.
    text = "" if default is None else str(default)
    return {
        "type": "field_input",
        "name": field_name,
        "text": text,
    }


def collect_dynamic_meta(parameters: list[dict[str, Any]]) -> dict[str, Any] | None:
    root_field = ""
    child_map: dict[str, list[str]] = {}
    child_defs: dict[str, dict[str, Any]] = {}

    for param in parameters:
        options = param.get("options")
        if not isinstance(options, list) or not options:
            continue

        for opt in options:
            child = opt.get("parameters")
            if not isinstance(child, dict) or not child.get("name"):
                continue
            opt_value = stringify_value(opt.get("value"))
            child_field = to_field_name(str(child.get("name")))
            child_map.setdefault(opt_value, [])
            if child_field not in child_map[opt_value]:
                child_map[opt_value].append(child_field)
            child_defs[child_field] = build_arg_from_param(child)
            if not root_field:
                root_field = to_field_name(str(param.get("name", "")))

    if not root_field:
        return None

    conditional_dropdowns: dict[str, dict[str, Any]] = {}
    for param in parameters:
        field_name = to_field_name(str(param.get("name", "")))
        entries = build_dropdown_entries(param)
        if not entries:
            continue

        options = param.get("options")
        if not isinstance(options, list):
            continue

        base_options: list[list[str]] = []
        options_by_root: dict[str, list[list[str]]] = {}
        has_root_condition = False
        for opt, entry in zip(options, entries):
            condition = str(opt.get("condition", "")).strip()
            parsed = parse_condition_equal(condition) if condition else None
            option_item = [entry["label"], entry["value"]]
            if parsed:
                condition_field, condition_value = parsed
                if to_field_name(condition_field) == root_field:
                    has_root_condition = True
                    key = stringify_value(condition_value)
                    options_by_root.setdefault(key, []).append(option_item)
                    continue
            base_options.append(option_item)

        if has_root_condition:
            conditional_dropdowns[field_name] = {
                "base_options": base_options,
                "options_by_root": options_by_root,
                "all_options": [[entry["label"], entry["value"]] for entry in entries],
            }

    all_child_fields = sorted(child_defs.keys())
    return {
        "root_field": root_field,
        "child_fields_by_value": child_map,
        "all_child_fields": all_child_fields,
        "child_arg_defs": [child_defs[name] for name in all_child_fields],
        "conditional_dropdowns": conditional_dropdowns,
    }


def build_block_definitions(source_file: str, data: dict[str, Any]) -> list[dict[str, Any]]:
    stem = Path(source_file).stem
    parts = stem.split("_")
    group = parts[2].lower() if len(parts) >= 4 else "ros2"
    module = parts[-1].upper()
    module_lower = module.lower()

    blocks: list[dict[str, Any]] = []
    for command in data.get("commands", []):
        command_id = str(command.get("command_id", "unknown"))
        block_type = f"c_{group}_{module_lower}_{to_safe_id(command_id)}"
        parameters = command.get("parameters") or []
        event = str(command.get("event", ""))

        args: list[dict[str, Any]] = []
        arg_names: set[str] = set()
        labels: list[str] = [f"{module} {command_id}"]

        dynamic = collect_dynamic_meta(parameters)

        for param in parameters:
            p_name = str(param.get("name", ""))
            if not p_name or "[]" in p_name:
                continue
            arg_def = build_arg_from_param(param)
            if arg_def["name"] in arg_names:
                continue
            arg_names.add(arg_def["name"])
            args.append(arg_def)
            labels.append(f"{humanize(p_name)} %{len(args)}")

        if dynamic:
            for child_arg in dynamic.get("child_arg_defs", []):
                if child_arg["name"] in arg_names:
                    continue
                arg_names.add(child_arg["name"])
                args.append(child_arg)
                labels.append(f"{humanize(child_arg['name'])} %{len(args)}")

        block_def: dict[str, Any] = {
            "type": block_type,
            "message0": " ".join(labels).strip(),
            "args0": args,
            "previousStatement": None,
            "nextStatement": None,
            "style": "execute_blocks",
            "tooltip": event,
            "helpUrl": "",
        }
        if dynamic:
            x_dynamic = {
                "root_field": dynamic["root_field"],
                "child_fields_by_value": dynamic["child_fields_by_value"],
                "all_child_fields": dynamic["all_child_fields"],
            }
            if dynamic.get("conditional_dropdowns"):
                x_dynamic["conditional_dropdowns"] = dynamic["conditional_dropdowns"]
            block_def["x_dynamic"] = x_dynamic
        blocks.append(block_def)

    return blocks


def render_register_js(module_suffix: str, block_json_rel_import: str) -> str:
    return f"""import Blockly from 'blockly/core';
import blockDefs from '{block_json_rel_import}';

const createField = (argDef) => {{
  const type = String(argDef.type || '');
  if (type === 'field_dropdown') {{
    const options = Array.isArray(argDef.options) && argDef.options.length ? argDef.options : [['N/A', 'N/A']];
    return new Blockly.FieldDropdown(options);
  }}
  if (type === 'field_number') {{
    return new Blockly.FieldNumber(
      Number(argDef.value ?? 0),
      argDef.min ?? undefined,
      argDef.max ?? undefined,
      argDef.precision ?? 1
    );
  }}
  return new Blockly.FieldTextInput(String(argDef.text ?? ''));
}};

const normalizeDropdownOptions = (rawOptions) => {{
  const source = Array.isArray(rawOptions) ? rawOptions : [];
  const out = [];
  const seen = new Set();
  source.forEach((opt) => {{
    if (!Array.isArray(opt) || opt.length < 2) return;
    const labelRaw = opt[0] == null ? '' : String(opt[0]);
    const valueRaw = opt[1] == null ? '' : String(opt[1]);
    const label = labelRaw.trim() ? labelRaw : '(empty)';
    const key = `${{label}}::${{valueRaw}}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push([label, valueRaw]);
  }});
  if (!out.length) out.push(['N/A', 'N/A']);
  return out;
}};

const updateConditionalDropdowns = (block, def, rootValue) => {{
  const dyn = def.x_dynamic || {{}};
  const maps = dyn.conditional_dropdowns || {{}};
  if (!block.__dynamicOptionSignatures) block.__dynamicOptionSignatures = {{}};
  Object.entries(maps).forEach(([fieldName, meta]) => {{
    const input = block.getInput(`${{fieldName}}_INPUT`);
    if (!input) return;
    const base = Array.isArray(meta.base_options) ? meta.base_options : [];
    const scoped = (meta.options_by_root && meta.options_by_root[rootValue]) || [];
    const mergedRaw = [...base, ...scoped];
    const options = mergedRaw.length
      ? normalizeDropdownOptions(mergedRaw)
      : normalizeDropdownOptions(meta.all_options);

    const prev = String(block.getFieldValue(fieldName) ?? '');
    const existing = block.getField(fieldName);
    const signature = JSON.stringify(options);
    const shouldRebuild = !existing || block.__dynamicOptionSignatures[fieldName] !== signature;
    if (shouldRebuild && existing) {{
      input.removeField(fieldName, true);
    }}
    if (shouldRebuild) {{
      input.appendField(new Blockly.FieldDropdown(options), fieldName);
      block.__dynamicOptionSignatures[fieldName] = signature;
    }}
    const values = new Set(options.map((opt) => String(opt[1])));
    const nextValue = values.has(prev) ? prev : String(options[0][1]);
    if (String(block.getFieldValue(fieldName) ?? '') !== nextValue) {{
      block.setFieldValue(nextValue, fieldName);
    }}
  }});
}};

const syncDynamicFields = (block, def) => {{
  const dyn = def.x_dynamic;
  if (!dyn) return;
  const rootValue = String(block.getFieldValue(dyn.root_field));
  updateConditionalDropdowns(block, def, rootValue);
  const active = new Set((dyn.child_fields_by_value && dyn.child_fields_by_value[rootValue]) || []);
  (dyn.all_child_fields || []).forEach((fieldName) => {{
    const input = block.getInput(`${{fieldName}}_INPUT`);
    if (input) input.setVisible(active.has(fieldName));
  }});
  if (block.rendered) block.render();
}};

const registerDynamicBlock = (def) => {{
  Blockly.Blocks[def.type] = {{
    init: function () {{
      const args = Array.isArray(def.args0) ? def.args0 : [];
      args.forEach((argDef) => {{
        const label = String(argDef.name || '').toLowerCase();
        this.appendDummyInput(`${{argDef.name}}_INPUT`)
          .appendField(label)
          .appendField(createField(argDef), argDef.name);
      }});
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setStyle(def.style || 'execute_blocks');
      this.setTooltip(def.tooltip || '');
      this.setHelpUrl(def.helpUrl || '');
      syncDynamicFields(this, def);
    }},
    onchange: function (event) {{
      if (!this.workspace || this.isInFlyout) return;
      if (event && event.blockId && event.blockId !== this.id) return;
      syncDynamicFields(this, def);
    }},
  }};
}};

const registerBlock = (def) => {{
  if (!def || !def.type) return;
  if (def.x_dynamic) {{
    registerDynamicBlock(def);
    return;
  }}
  Blockly.Blocks[def.type] = {{
    init: function () {{
      this.jsonInit(def);
    }},
  }};
}};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerBlock);

export {{ blockDefs as ros2Blocks{module_suffix} }};
"""


def render_generator_js(module_suffix: str, block_json_rel_import: str) -> str:
    return f"""import {{ javascriptGenerator }} from 'blockly/javascript';
import blockDefs from '{block_json_rel_import}';

const getFieldNames = (def) => {{
  const args = Array.isArray(def.args0) ? def.args0 : [];
  return args
    .filter((arg) => arg && typeof arg.name === 'string' && String(arg.type || '').startsWith('field_'))
    .map((arg) => arg.name);
}};

const buildParams = (block, def) => {{
  const dyn = def.x_dynamic;
  const fieldNames = getFieldNames(def);
  if (!dyn) {{
    const params = {{}};
    fieldNames.forEach((name) => {{
      params[name] = block.getFieldValue(name);
    }});
    return params;
  }}

  const params = {{}};
  const root = dyn.root_field;
  const rootValue = String(block.getFieldValue(root));
  params[root] = rootValue;

  const activeChildren = new Set((dyn.child_fields_by_value && dyn.child_fields_by_value[rootValue]) || []);
  const allChildren = new Set(dyn.all_child_fields || []);

  fieldNames.forEach((name) => {{
    if (name === root) return;
    if (allChildren.has(name)) {{
      if (activeChildren.has(name)) {{
        params[name] = block.getFieldValue(name);
      }}
      return;
    }}
    params[name] = block.getFieldValue(name);
  }});
  return params;
}};

const registerGenerator = (def) => {{
  if (!def || !def.type) return;
  javascriptGenerator.forBlock[def.type] = function (block) {{
    const message = {{
      blockType: def.type,
      parameters: buildParams(block, def),
    }};
    return `console.log(${{JSON.stringify(JSON.stringify(message))}});\\n`;
  }};
}};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerGenerator);

export {{ blockDefs as ros2Blocks{module_suffix} }};
"""


def render_category_block(module_suffix: str, block_types: list[str]) -> str:
    lines = [
        f"    // AUTO-GEN-START: ROS2_{module_suffix}",
        "    {",
        "      'kind': 'category',",
        f"      'name': '{module_suffix}',",
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
    if lines[-1].endswith(","):
        lines[-1] = lines[-1][:-1]
    lines.extend(
        [
            "      ],",
            "    },",
            f"    // AUTO-GEN-END: ROS2_{module_suffix}",
        ]
    )
    return "\n".join(lines)


def strip_autogen_block(content: str, module_suffix: str) -> str:
    start_marker = f"// AUTO-GEN-START: ROS2_{module_suffix}"
    end_marker = f"// AUTO-GEN-END: ROS2_{module_suffix}"
    if start_marker in content and end_marker in content:
        pattern = re.compile(
            rf"\s*{re.escape(start_marker)}.*?{re.escape(end_marker)}\s*",
            flags=re.DOTALL,
        )
        return pattern.sub("\n", content)
    return content


def strip_named_categories(content: str, module_suffix: str) -> str:
    # Remove existing categories with same name to avoid duplicates/stale block refs.
    category_re = re.compile(
        rf"""
        \n\s*\{{\n
        \s*'kind':\s*'category',\n
        \s*'name':\s*'{re.escape(module_suffix)}',\n
        [\s\S]*?
        \n\s*\],\n
        \s*\}},\n?
        """,
        flags=re.VERBOSE,
    )
    return category_re.sub("\n", content)


def upsert_toolbox_category(toolbox_path: Path, module_suffix: str, block_types: list[str], dry_run: bool) -> None:
    content = toolbox_path.read_text(encoding="utf-8")
    category_text = render_category_block(module_suffix, block_types)

    content = strip_autogen_block(content, module_suffix)
    content = strip_named_categories(content, module_suffix)

    sep_match = re.search(r"\{\s*'kind':\s*'sep'\s*,", content)
    insert_at = sep_match.start() if sep_match else -1
    if insert_at == -1:
        # fallback: insert before the first top-level closing list marker
        insert_at = content.rfind("  ],")
    if insert_at == -1:
        raise RuntimeError(f"Could not find toolbox insertion point: {toolbox_path}")

    prefix = content[:insert_at]
    if not prefix.endswith("\n"):
        prefix += "\n"
    content = prefix + category_text + "\n" + content[insert_at:]

    if not dry_run:
        toolbox_path.write_text(content, encoding="utf-8")


def resolve_output_template(template: str, xxx: str, yyy: str) -> str:
    return template.replace("{XXX}", xxx).replace("{YYY}", yyy)


def ensure_block_json_extension(path: Path) -> Path:
    if path.suffix.lower() == ".js":
        return path.with_suffix(".json")
    return path


def write_text(path: Path, content: str, dry_run: bool) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not dry_run:
        path.write_text(content, encoding="utf-8")


def write_json(path: Path, data: Any, dry_run: bool) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not dry_run:
        path.write_text(json.dumps(data, ensure_ascii=True, indent=2) + "\n", encoding="utf-8")


def generate_for_target(
    repo_root: Path,
    target_path: str,
    source_file: str,
    block_json_template: str,
    block_register_template: str,
    generator_template: str,
    toolbox_path: str,
    dry_run: bool,
) -> None:
    source_path = repo_root / target_path / source_file
    if not source_path.exists():
        raise FileNotFoundError(f"Source command file not found: {source_path}")

    source_data = json.loads(source_path.read_text(encoding="utf-8"))
    block_defs = build_block_definitions(source_file, source_data)
    stem = Path(source_file).stem
    suffix = stem.split("_")[-1]

    block_json_out = ensure_block_json_extension(
        repo_root / resolve_output_template(block_json_template, stem, suffix)
    )
    block_register_out = repo_root / resolve_output_template(block_register_template, stem, suffix)
    generator_out = repo_root / resolve_output_template(generator_template, stem, suffix)

    # Relative imports from output files.
    rel_for_register = os.path.relpath(block_json_out, start=block_register_out.parent).replace("\\", "/")
    rel_for_generator = os.path.relpath(block_json_out, start=generator_out.parent).replace("\\", "/")
    block_json_import_for_register = rel_for_register if rel_for_register.startswith(".") else f"./{rel_for_register}"
    block_json_import_for_generator = rel_for_generator if rel_for_generator.startswith(".") else f"./{rel_for_generator}"

    write_json(block_json_out, block_defs, dry_run=dry_run)
    write_text(
        block_register_out,
        render_register_js(suffix, block_json_import_for_register),
        dry_run=dry_run,
    )
    write_text(
        generator_out,
        render_generator_js(suffix, block_json_import_for_generator),
        dry_run=dry_run,
    )

    toolbox_abs = repo_root / toolbox_path
    if not toolbox_abs.exists():
        # Prompt path may be relative to bric_app/src.
        toolbox_abs = repo_root / "bric_app/src" / toolbox_path.strip("./")
    upsert_toolbox_category(toolbox_abs, suffix, [b["type"] for b in block_defs], dry_run=dry_run)

    print(f"[ok] source:    {source_path}")
    print(f"[ok] blocks:    {block_json_out}")
    print(f"[ok] register:  {block_register_out}")
    print(f"[ok] generator: {generator_out}")
    print(f"[ok] toolbox:   {toolbox_abs}")


def upsert_autogen_import_block(
    file_path: Path,
    start_marker: str,
    end_marker: str,
    import_lines: list[str],
    anchor_pattern: str,
    dry_run: bool,
) -> None:
    content = file_path.read_text(encoding="utf-8")
    payload = "\n".join(
        [f"// {start_marker}"] + import_lines + [f"// {end_marker}"]
    )

    block_re = re.compile(
        rf"\n?\s*// {re.escape(start_marker)}.*?// {re.escape(end_marker)}\n?",
        flags=re.DOTALL,
    )
    if block_re.search(content):
        content = block_re.sub("\n" + payload + "\n", content)
    else:
        m = re.search(anchor_pattern, content, flags=re.MULTILINE)
        if not m:
            raise RuntimeError(f"Could not find insertion anchor in {file_path}")
        insert_at = m.end()
        content = content[:insert_at] + "\n" + payload + content[insert_at:]

    if not dry_run:
        file_path.write_text(content, encoding="utf-8")


def update_index_imports(repo_root: Path, suffixes: list[str], dry_run: bool) -> None:
    unique_suffixes = sorted(set(suffixes))
    if not unique_suffixes:
        return

    blocks_index = repo_root / "bric_app/src/CustomBlocks/blocks.js"
    generators_index = repo_root / "bric_app/src/Generators/generators.js"

    block_imports = [f"import './ros2Blocks_{s}.js';" for s in unique_suffixes]
    gen_imports = [f"import './ros2Blocks_{s}.js';" for s in unique_suffixes]

    upsert_autogen_import_block(
        file_path=blocks_index,
        start_marker="AUTO-GEN-START: ROS2_BLOCK_IMPORTS",
        end_marker="AUTO-GEN-END: ROS2_BLOCK_IMPORTS",
        import_lines=block_imports,
        anchor_pattern=r"^import\s+\*\s+as\s+developer\s+from\s+'\.\/developer\.js';\s*$",
        dry_run=dry_run,
    )
    upsert_autogen_import_block(
        file_path=generators_index,
        start_marker="AUTO-GEN-START: ROS2_GENERATOR_IMPORTS",
        end_marker="AUTO-GEN-END: ROS2_GENERATOR_IMPORTS",
        import_lines=gen_imports,
        anchor_pattern=r"^import\s+\*\s+as\s+developerGenerator\s+from\s+'\.\/developer\.js';\s*$",
        dry_run=dry_run,
    )
    print(f"[ok] index:     {blocks_index}")
    print(f"[ok] index:     {generators_index}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate Blockly sources from prompt_block")
    parser.add_argument("--repo-root", default=".", help="Repository root path")
    parser.add_argument("--prompt", default="prompt_block", help="Prompt file path")
    parser.add_argument("--dry-run", action="store_true", help="Parse and print target outputs without writing files")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    prompt_path = (repo_root / args.prompt).resolve()
    if not prompt_path.exists():
        raise FileNotFoundError(f"Prompt file not found: {prompt_path}")

    conf = parse_prompt(prompt_path)
    generated_suffixes: list[str] = []
    for source_file in conf["target_files"]:
        generated_suffixes.append(Path(source_file).stem.split("_")[-1])
        generate_for_target(
            repo_root=repo_root,
            target_path=conf["target_path"],
            source_file=source_file,
            block_json_template=conf["block_json_template"],
            block_register_template=conf["block_register_template"],
            generator_template=conf["codegen_template"],
            toolbox_path=conf["toolbox_path"],
            dry_run=args.dry_run,
        )
    update_index_imports(repo_root=repo_root, suffixes=generated_suffixes, dry_run=args.dry_run)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
