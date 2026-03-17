import json
import re
from collections import defaultdict
from pathlib import Path
from typing import Any, Dict, List, Tuple

BASE_DIR = Path(__file__).resolve().parent.parent
BT_INFO_DIR = BASE_DIR / "btInfo"
OUTPUT_DIR = BASE_DIR / "static" / "generated"

QUESTION_ICON_DATA_URI = (
    "data:image/svg+xml;utf8,"
    "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>"
    "<circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/>"
    "<text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text>"
    "</svg>"
)

ROOT_BLOCK_COLOR = "#8c564b"

COLOR_PALETTE = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
]


def slugify(text: str) -> str:
    clean = re.sub(r"[^a-zA-Z0-9]+", "_", text.strip().lower())
    clean = re.sub(r"_+", "_", clean).strip("_")
    return clean or "item"


def safe_value(v: Any) -> str:
    if v is None:
        return ""
    return str(v)


def default_value(param_type: str) -> str:
    kind = (param_type or "").lower()
    if kind in ("float", "double", "number"):
        return "0.0"
    if kind in ("int", "integer"):
        return "0"
    return ""


def range_options(min_v: Any, max_v: Any) -> List[List[str]]:
    if min_v is None or max_v is None:
        return []
    if not isinstance(min_v, (int, float)) or not isinstance(max_v, (int, float)):
        return []
    if max_v < min_v:
        return []
    if max_v - min_v > 200:
        return []
    out = []
    v = min_v
    while v <= max_v:
        sv = str(int(v) if float(v).is_integer() else v)
        out.append([sv, sv])
        v += 1
    return out


def js_dump(obj: Any) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2)


def normalize_category(cat: str) -> str:
    cat = cat or "General"
    return cat.strip()


def order_categories(categories: Dict[str, List[str]]) -> List[Tuple[str, List[str]]]:
    ordered: List[Tuple[str, List[str]]] = []
    used = set()
    priority_aliases = [
        ["BT Logic", "BT_Logic"],
        ["BT Function", "BT_Function"],
        ["자율주행", "자율 주행"],
        ["Motion"],
        ["Sound control"],
    ]

    for aliases in priority_aliases:
        for alias in aliases:
            if alias in categories and alias not in used:
                ordered.append((alias, categories[alias]))
                used.add(alias)
                break

    for cat, block_types in categories.items():
        if cat in used:
            continue
        ordered.append((cat, block_types))

    return ordered


def display_category_name(cat: str) -> str:
    mapping = {
        "BT_Logic": "BT Logic",
        "BT_Function": "BT Function",
        "자율 주행": "자율주행",
    }
    return mapping.get(cat, cat)


def build_behavior_block(item: Dict[str, Any]) -> Dict[str, Any]:
    category = normalize_category(item.get("category", "General"))
    action = item.get("action", "unknown/action")
    block_type = f"behavior__{slugify(category)}__{slugify(action)}"

    args0 = [
        {
            "type": "field_image",
            "src": QUESTION_ICON_DATA_URI,
            "width": 16,
            "height": 16,
            "alt": "?",
            "name": "HELP"
        },
        {
            "type": "field_label",
            "text": action,
            "name": "TITLE"
        }
    ]

    param_meta: List[Dict[str, Any]] = []
    for param in item.get("parameters", []):
        name = param.get("name", "param")
        p_type = (param.get("type") or "string").lower()
        options = param.get("options") or []
        min_v = param.get("min")
        max_v = param.get("max")

        args0.append(
            {
                "type": "field_image",
                "src": QUESTION_ICON_DATA_URI,
                "width": 16,
                "height": 16,
                "alt": "?",
                "name": f"HELP_{slugify(name).upper()}"
            }
        )
        args0.append(
            {
                "type": "field_label",
                "text": name
            }
        )

        field_name = f"PARAM_{slugify(name).upper()}"
        if options:
            dd = [[str(opt.get("value", "")), str(opt.get("value", ""))] for opt in options]
            args0.append({"type": "field_dropdown", "name": field_name, "options": dd})
            default = dd[0][1] if dd else ""
        else:
            ranged = range_options(min_v, max_v)
            if min_v is not None and max_v is not None and ranged:
                args0.append({"type": "field_dropdown", "name": field_name, "options": ranged})
                default = ranged[0][1]
            else:
                if min_v is not None and max_v is None:
                    default = safe_value(min_v)
                elif max_v is not None and min_v is None:
                    default = safe_value(max_v)
                else:
                    default = default_value(p_type)
                args0.append({"type": "field_input", "name": field_name, "text": default})

        param_meta.append(
            {
                "name": name,
                "field": field_name,
                "type": p_type,
                "description": param.get("description", "")
            }
        )

    block_json = {
        "type": block_type,
        "message0": " ".join(["%" + str(i + 1) for i in range(len(args0))]),
        "args0": args0,
        "previousStatement": "BTNode",
        "nextStatement": "BTNode",
        "colour": 210,
        "tooltip": item.get("description", ""),
        "helpUrl": ""
    }

    return {
        "block_type": block_type,
        "category": category,
        "kind": "behavior",
        "label": action,
        "action": action,
        "description": item.get("description", ""),
        "json": block_json,
        "parameters": param_meta,
        "has_children": False,
        "enabled_keys": []
    }


def build_bt_block(item: Dict[str, Any]) -> Dict[str, Any]:
    block_kind = "bt_logic" if bool((item.get("parametersDef") or {}).get("children", {}).get("enabled")) else "bt_function"
    type_name = item.get("type", "Node")
    block_type = f"{block_kind}__{slugify(type_name)}"

    args0 = [
        {
            "type": "field_image",
            "src": QUESTION_ICON_DATA_URI,
            "width": 16,
            "height": 16,
            "alt": "?",
            "name": "HELP"
        },
        {"type": "field_label", "text": type_name, "name": "TITLE"}
    ]

    params_def = item.get("parametersDef") or {}
    enabled_keys = []
    field_map = {}

    for key, meta in params_def.items():
        if not meta.get("enabled"):
            continue
        if key in ("child", "children"):
            continue
        enabled_keys.append(key)

        args0.append(
            {
                "type": "field_image",
                "src": QUESTION_ICON_DATA_URI,
                "width": 16,
                "height": 16,
                "alt": "?",
                "name": f"HELP_{slugify(key).upper()}"
            }
        )
        args0.append({"type": "field_label", "text": key})

        meta_type = (meta.get("type") or "string").lower()
        min_v = meta.get("min")
        max_v = meta.get("max")
        field_name = f"PARAM_{slugify(key).upper()}"

        ranged = range_options(min_v, max_v)
        if min_v is not None and max_v is not None and ranged:
            args0.append({"type": "field_dropdown", "name": field_name, "options": ranged})
            default = ranged[0][1]
        else:
            if min_v is not None and max_v is None:
                default = safe_value(min_v)
            elif max_v is not None and min_v is None:
                default = safe_value(max_v)
            else:
                default = default_value(meta_type)
            args0.append({"type": "field_input", "name": field_name, "text": default})

        field_map[key] = {
            "field": field_name,
            "type": meta_type,
            "description": meta.get("description", "")
        }

    block_json = {
        "type": block_type,
        "message0": " ".join(["%" + str(i + 1) for i in range(len(args0))]),
        "args0": args0,
        "colour": 35 if block_kind == "bt_logic" else 125,
        "tooltip": item.get("description", ""),
        "helpUrl": ""
    }

    has_children = bool((params_def.get("children") or {}).get("enabled"))
    has_child = bool((params_def.get("child") or {}).get("enabled"))

    if type_name == "Root":
        block_json["colour"] = ROOT_BLOCK_COLOR
    else:
        block_json["previousStatement"] = "BTNode"
        block_json["nextStatement"] = "BTNode"

    if has_children:
        block_json["message1"] = "children %1"
        block_json["args1"] = [{"type": "input_statement", "name": "CHILDREN", "check": "BTNode"}]
    elif has_child:
        block_json["message1"] = "child %1"
        block_json["args1"] = [{"type": "input_statement", "name": "CHILD", "check": "BTNode"}]

    return {
        "block_type": block_type,
        "category": "BT_Logic" if block_kind == "bt_logic" else "BT_Function",
        "kind": block_kind,
        "label": type_name,
        "node_type": type_name,
        "description": item.get("description", ""),
        "json": block_json,
        "parameters": [{"name": k, **v} for k, v in field_map.items()],
        "has_children": has_children,
        "has_child": has_child,
        "enabled_keys": enabled_keys
    }


def load_inputs() -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    a_path = BT_INFO_DIR / "BTList.json"
    b_path = BT_INFO_DIR / "BTList_bt.json"
    if not b_path.exists():
        b_path = BT_INFO_DIR / "BT_List_bt.json"

    if not a_path.exists():
        raise FileNotFoundError(f"Missing input: {a_path}")
    if not b_path.exists():
        raise FileNotFoundError(f"Missing input: {b_path}")

    with a_path.open("r", encoding="utf-8") as f:
        behavior_list = json.load(f)
    with b_path.open("r", encoding="utf-8") as f:
        bt_list = json.load(f)
    return behavior_list, bt_list


def emit_block_file(path: Path, blocks: List[Dict[str, Any]]):
    arr = [b["json"] for b in blocks]
    tips = {b["block_type"]: b.get("description", "") for b in blocks}
    param_tips = {
        b["block_type"]: {p["field"]: p.get("description", "") for p in b.get("parameters", [])}
        for b in blocks
    }

    registrar_name = "registerBlocks_" + slugify(path.stem)
    content = f"""(() => {{
const BLOCKS = {js_dump(arr)};
const BLOCK_TOOLTIPS = {js_dump(tips)};
const PARAM_TOOLTIPS = {js_dump(param_tips)};

function {registrar_name}() {{
  Blockly.defineBlocksWithJsonArray(BLOCKS);
  Object.entries(BLOCK_TOOLTIPS).forEach(([blockType, tip]) => {{
    const def = Blockly.Blocks[blockType];
    if (def) {{
      const baseInit = def.init;
      def.init = function wrappedInit() {{
        baseInit.call(this);
        this.setTooltip(tip || '');
        const perField = PARAM_TOOLTIPS[blockType] || {{}};
        Object.entries(perField).forEach(([fieldName, fieldTip]) => {{
          const field = this.getField(fieldName);
          if (field && field.setTooltip) {{
            field.setTooltip(fieldTip || '');
          }}
          const helpField = this.getField('HELP_' + fieldName.replace('PARAM_', ''));
          if (helpField && helpField.setTooltip) {{
            helpField.setTooltip(fieldTip || '');
          }}
        }});
      }};
    }}
  }});
}}

window.BRIC = window.BRIC || {{}};
window.BRIC.blockRegistrars = window.BRIC.blockRegistrars || [];
window.BRIC.blockRegistrars.push({registrar_name});
}})();
"""
    path.write_text(content, encoding="utf-8")


def emit_generator_file(path: Path, blocks: List[Dict[str, Any]]):
    registrar_name = "registerGenerators_" + slugify(path.stem)
    lines = [
        "(() => {",
        "const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;",
        "",
    ]
    lines.append(
        "function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }"
    )
    lines.append(
        "function parseChildNodes(raw) { return (raw || '').split('\\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }"
    )
    lines.append("")

    for block in blocks:
        btype = block["block_type"]
        lines.append(f"javascriptGenerator.forBlock['{btype}'] = function(block, generator) {{")

        if block["kind"] == "behavior":
            lines.append("  const parameter = {};")
            for p in block.get("parameters", []):
                pname = p["name"]
                fname = p["field"]
                ptype = p["type"]
                if ptype in ("int", "integer"):
                    lines.append(
                        f"  parameter['{pname}'] = Number.parseInt(block.getFieldValue('{fname}') || '0', 10);"
                    )
                elif ptype in ("float", "double", "number"):
                    lines.append(
                        f"  parameter['{pname}'] = Number.parseFloat(block.getFieldValue('{fname}') || '0');"
                    )
                else:
                    lines.append(f"  parameter['{pname}'] = block.getFieldValue('{fname}') || '';")

            lines.append("  const node = {")
            lines.append("    type: 'Action',")
            lines.append(f"    action: '{block['action']}',")
            lines.append("    parameter,")
            lines.append("    id: randomId(),")
            lines.append("  };")
            lines.append("  return JSON.stringify(node) + '\\n';")

        else:
            node_type = block.get("node_type", "Action")
            lines.append("  const node = {")
            lines.append(f"    type: '{node_type}',")
            lines.append("    id: randomId(),")
            lines.append("  };")

            for p in block.get("parameters", []):
                key = p["name"]
                fname = p["field"]
                ptype = p["type"]
                if ptype in ("int", "integer"):
                    lines.append(
                        f"  node['{key}'] = Number.parseInt(block.getFieldValue('{fname}') || '0', 10);"
                    )
                elif ptype in ("float", "double", "number"):
                    lines.append(
                        f"  node['{key}'] = Number.parseFloat(block.getFieldValue('{fname}') || '0');"
                    )
                else:
                    lines.append(f"  node['{key}'] = block.getFieldValue('{fname}') || '';")

            if block.get("has_children"):
                lines.append("  const childrenRaw = generator.statementToCode(block, 'CHILDREN');")
                lines.append("  node.children = parseChildNodes(childrenRaw);")
            if block.get("has_child"):
                lines.append("  const childRaw = generator.statementToCode(block, 'CHILD');")
                lines.append("  const childNodes = parseChildNodes(childRaw);")
                lines.append("  node.child = childNodes.length ? childNodes[0] : null;")

            lines.append("  return JSON.stringify(node) + '\\n';")

        lines.append("};")
        lines.append("")

    path.write_text("\n".join(lines), encoding="utf-8")
    lines.append("")
    lines.append(f"function {registrar_name}() {{ return true; }}")
    lines.append("window.BRIC = window.BRIC || {};")
    lines.append("window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];")
    lines.append(f"window.BRIC.generatorRegistrars.push({registrar_name});")
    lines.append("})();")
    path.write_text("\n".join(lines), encoding="utf-8")


def emit_index(path: Path, modules: List[str], register_name: str):
    target = "blockRegistrars" if register_name == "registerBlocks" else "generatorRegistrars"
    content = (
        "window.BRIC = window.BRIC || {};\n"
        f"window.BRIC.{register_name}All = function() {{\n"
        f"  (window.BRIC.{target} || []).forEach((fn) => fn());\n"
        "};\n"
    )
    path.write_text(content, encoding="utf-8")


def emit_toolbox(path: Path, categories: List[Tuple[str, List[str]]]):
    contents = []
    for cat, block_types in categories:
        display_name = display_category_name(cat)
        contents.append(
            {
                "kind": "category",
                "name": display_name,
                "categorystyle": f"{slugify(cat)}_category",
                "contents": [{"kind": "block", "type": bt} for bt in block_types],
            }
        )

    toolbox = {"kind": "categoryToolbox", "contents": contents}
    path.write_text(
        "window.toolboxCustomBasic = " + js_dump(toolbox) + ";\n",
        encoding="utf-8",
    )


def emit_theme(path: Path, categories: List[str]):
    category_styles = {}
    for i, cat in enumerate(categories):
        category_styles[f"{slugify(cat)}_category"] = {
            "colour": COLOR_PALETTE[i % len(COLOR_PALETTE)]
        }

    theme = {
        "base": "classic",
        "blockStyles": {
            "logic_blocks": {"colourPrimary": "#f39c12"},
            "function_blocks": {"colourPrimary": "#2980b9"},
            "action_blocks": {"colourPrimary": "#27ae60"},
        },
        "categoryStyles": category_styles,
        "componentStyles": {
            "workspaceBackgroundColour": "#f5f8fb",
            "toolboxBackgroundColour": "#ffffff",
            "toolboxForegroundColour": "#1f2937",
            "flyoutBackgroundColour": "#eef2f7",
            "flyoutForegroundColour": "#111827",
            "flyoutOpacity": 0.95,
            "scrollbarColour": "#94a3b8",
            "insertionMarkerColour": "#0ea5e9",
            "insertionMarkerOpacity": 0.3,
            "cursorColour": "#111827",
            "blackBackground": "#111827",
        },
    }

    path.write_text(
        "window.themeForCustomBasic = " + js_dump(theme) + ";\n",
        encoding="utf-8",
    )


def generate_all() -> Dict[str, Any]:
    behavior_list, bt_list = load_inputs()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    custom_dir = OUTPUT_DIR / "CustomBlocks"
    gen_dir = OUTPUT_DIR / "Generators"
    toolbox_dir = OUTPUT_DIR / "Toolbox"
    theme_dir = OUTPUT_DIR / "Theme"
    for d in (custom_dir, gen_dir, toolbox_dir, theme_dir):
        d.mkdir(parents=True, exist_ok=True)

    behavior_groups: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    for item in behavior_list:
        behavior_groups[normalize_category(item.get("category", "General"))].append(build_behavior_block(item))

    bt_logic = []
    bt_function = []
    for item in bt_list:
        b = build_bt_block(item)
        if b["kind"] == "bt_logic":
            bt_logic.append(b)
        else:
            bt_function.append(b)

    custom_modules = []
    gen_modules = []
    toolbox_categories: Dict[str, List[str]] = {}

    for cat, blocks in behavior_groups.items():
        mod_name = f"ros2Blocks_{slugify(cat)}.js"
        custom_modules.append(mod_name)
        gen_modules.append(mod_name)
        toolbox_categories[cat] = [b["block_type"] for b in blocks]

    custom_modules.extend(["bt_logic.js", "bt_function.js"])
    gen_modules.extend(["bt_logic.js", "bt_function.js"])

    toolbox_categories["BT_Logic"] = [b["block_type"] for b in bt_logic]
    toolbox_categories["BT_Function"] = [
        b["block_type"] for b in bt_function if b.get("node_type") != "Root"
    ]

    ordered_categories = order_categories(toolbox_categories)

    category_colors = {
        cat: COLOR_PALETTE[i % len(COLOR_PALETTE)]
        for i, (cat, _) in enumerate(ordered_categories)
    }

    all_blocks = [b for arr in behavior_groups.values() for b in arr] + bt_logic + bt_function
    for b in all_blocks:
        if b.get("node_type") == "Root":
            b["json"]["colour"] = ROOT_BLOCK_COLOR
            continue
        cat = b.get("category")
        color = category_colors.get(cat)
        if color:
            b["json"]["colour"] = color

    for cat, blocks in behavior_groups.items():
        mod_name = f"ros2Blocks_{slugify(cat)}.js"
        emit_block_file(custom_dir / mod_name, blocks)
        emit_generator_file(gen_dir / mod_name, blocks)

    emit_block_file(custom_dir / "bt_logic.js", bt_logic)
    emit_block_file(custom_dir / "bt_function.js", bt_function)
    emit_generator_file(gen_dir / "bt_logic.js", bt_logic)
    emit_generator_file(gen_dir / "bt_function.js", bt_function)

    emit_index(custom_dir / "index.js", custom_modules, "registerBlocks")
    emit_index(gen_dir / "index.js", gen_modules, "registerGenerators")
    emit_toolbox(toolbox_dir / "toolboxCustomBasic.js", ordered_categories)
    emit_theme(
        theme_dir / "themeForCustomBasic.js",
        [cat for cat, _ in ordered_categories],
    )

    manifest = {
        "generated_at": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "behavior": [b for arr in behavior_groups.values() for b in arr],
        "bt_logic": bt_logic,
        "bt_function": bt_function,
        "custom_modules": custom_modules,
        "generator_modules": gen_modules,
    }
    (OUTPUT_DIR / "manifest.json").write_text(js_dump(manifest), encoding="utf-8")

    return {
        "behavior_categories": len(behavior_groups),
        "behavior_blocks": sum(len(v) for v in behavior_groups.values()),
        "bt_logic_blocks": len(bt_logic),
        "bt_function_blocks": len(bt_function),
    }


if __name__ == "__main__":
    print(json.dumps(generate_all(), ensure_ascii=False, indent=2))
