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
    "<circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/>"
    "<circle cx='8' cy='8' r='6' fill='%233f51b5'/>"
    "<text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text>"
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


def clean_text(v: Any) -> str:
    if v is None:
        return ""
    return str(v).strip()


def default_value(param_type: str) -> str:
    kind = (param_type or "").lower()
    if kind in ("float", "double", "number"):
        return "0.0"
    if kind in ("int", "integer"):
        return "0"
    return ""


def range_options(min_v: Any, max_v: Any, param_type: str = "") -> List[List[str]]:
    if min_v is None or max_v is None:
        return []
    if not isinstance(min_v, (int, float)) or not isinstance(max_v, (int, float)):
        return []
    if max_v < min_v:
        return []

    kind = (param_type or "").lower()
    if kind in ("float", "double", "number"):
        # Float ranges use exactly 20 steps (inclusive endpoints => 21 options).
        steps = 20
        delta = (float(max_v) - float(min_v)) / steps
        decimals = 2
        if delta != 0:
            txt = f"{delta:.10f}".rstrip("0").rstrip(".")
            if "." in txt:
                decimals = max(2, min(6, len(txt.split(".")[1])))

        out = []
        for i in range(steps + 1):
            v = float(min_v) + (delta * i)
            if i == steps:
                v = float(max_v)
            sv = f"{v:.{decimals}f}"
            out.append([sv, sv])
        return out

    if max_v - min_v > 200:
        return []
    out = []
    v = min_v
    while v <= max_v:
        sv = str(int(v) if float(v).is_integer() else v)
        out.append([sv, sv])
        v += 1
    return out


def build_nested_param_meta(params: List[Dict[str, Any]], field_prefix: str) -> List[Dict[str, Any]]:
    nested_meta: List[Dict[str, Any]] = []
    for sub in params or []:
        if not is_enabled(sub.get("enabled"), True):
            continue

        sub_name = sub.get("name", "param")
        sub_type = (sub.get("type") or "string").lower()
        sub_default_v = sub.get("default")
        sub_options = sub.get("options") or []
        sub_min = sub.get("min")
        sub_max = sub.get("max")
        sub_field = f"{field_prefix}_{slugify(sub_name).upper()}"

        sub_option_descriptions: Dict[str, str] = {}
        if sub_options:
            sub_dd = [
                [str(sopt.get("value", "")), str(sopt.get("value", ""))]
                for sopt in sub_options
            ]
            for sopt in sub_options:
                sub_option_descriptions[str(sopt.get("value", ""))] = clean_text(
                    sopt.get("description", "")
                )
            sub_default = sub_dd[0][1] if sub_dd else ""
        else:
            sub_ranged = range_options(sub_min, sub_max, sub_type)
            if sub_min is not None and sub_max is not None and sub_ranged:
                sub_dd = sub_ranged
                sub_default = sub_ranged[0][1]
            else:
                sub_dd = []
                if sub_default_v is not None:
                    sub_default = safe_value(sub_default_v)
                elif sub_min is not None and sub_max is None:
                    sub_default = safe_value(sub_min)
                elif sub_max is not None and sub_min is None:
                    sub_default = safe_value(sub_max)
                else:
                    sub_default = default_value(sub_type)

        # Only support one-level option parameters.
        # Nested option->parameters under these additional parameters are ignored.
        sub_option_parameters: Dict[str, List[Dict[str, Any]]] = {}

        nested_meta.append(
            {
                "name": sub_name,
                "field": sub_field,
                "type": sub_type,
                "description": sub.get("description", ""),
                "options": sub_dd,
                "default": sub_default,
                "option_parameters": sub_option_parameters,
                "option_descriptions": sub_option_descriptions,
            }
        )

    return nested_meta


def js_dump(obj: Any) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2)


def normalize_category(cat: str) -> str:
    cat = cat or "General"
    return cat.strip()


def is_item_enabled(item: Dict[str, Any]) -> bool:
    value = item.get("enabled", True)
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value != 0
    if isinstance(value, str):
        return value.strip().lower() not in ("", "0", "false", "no", "off")
    return bool(value)


def is_enabled(value: Any, default: bool = True) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value != 0
    if isinstance(value, str):
        return value.strip().lower() not in ("", "0", "false", "no", "off")
    return bool(value)


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
    action_label = str(action).split("/")[-1] if "/" in str(action) else str(action)
    block_type = f"behavior__{slugify(category)}__{slugify(action)}"
    description = clean_text(item.get("description", ""))

    args0 = [
        {
            "type": "field_label",
            "text": action_label,
            "name": "TITLE"
        }
    ]
    if description:
        args0.insert(
            0,
            {
                "type": "field_image",
                "src": QUESTION_ICON_DATA_URI,
                "width": 16,
                "height": 16,
                "alt": "?",
                "name": "HELP"
            },
        )

    param_meta: List[Dict[str, Any]] = []
    for param in item.get("parameters", []):
        if not is_enabled(param.get("enabled"), True):
            continue
        name = param.get("name", "param")
        p_type = (param.get("type") or "string").lower()
        default_v = param.get("default")
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
        option_param_meta: Dict[str, List[Dict[str, Any]]] = {}
        option_descriptions: Dict[str, str] = {}
        if options:
            dd = [[str(opt.get("value", "")), str(opt.get("value", ""))] for opt in options]
            for opt in options:
                option_descriptions[str(opt.get("value", ""))] = clean_text(
                    opt.get("description", "")
                )
            args0.append({"type": "field_dropdown", "name": field_name, "options": dd})
            default = dd[0][1] if dd else ""
            for opt in options:
                opt_value = str(opt.get("value", ""))
                nested_meta = build_nested_param_meta(
                    opt.get("parameters") or [],
                    f"OPT_{slugify(name).upper()}",
                )
                if nested_meta:
                    option_param_meta[opt_value] = nested_meta
        else:
            ranged = range_options(min_v, max_v, p_type)
            if min_v is not None and max_v is not None and ranged:
                args0.append({"type": "field_dropdown", "name": field_name, "options": ranged})
                default = ranged[0][1]
            else:
                if default_v is not None:
                    default = safe_value(default_v)
                elif min_v is not None and max_v is None:
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
                "description": param.get("description", ""),
                "option_parameters": option_param_meta,
                "option_descriptions": option_descriptions,
            }
        )

    block_json = {
        "type": block_type,
        "message0": " ".join(["%" + str(i + 1) for i in range(len(args0))]),
        "args0": args0,
        "previousStatement": "BTNode",
        "nextStatement": "BTNode",
        "colour": 210,
        "tooltip": description,
        "helpUrl": ""
    }

    return {
        "block_type": block_type,
        "category": category,
        "kind": "behavior",
        "label": action_label,
        "action": action,
        "description": description,
        "json": block_json,
        "parameters": param_meta,
        "has_children": False,
        "enabled_keys": []
    }


def build_bt_block(item: Dict[str, Any]) -> Dict[str, Any]:
    block_kind = "bt_logic" if bool((item.get("parametersDef") or {}).get("children", {}).get("enabled")) else "bt_function"
    type_name = item.get("type", "Node")
    block_type = f"{block_kind}__{slugify(type_name)}"
    description = clean_text(item.get("description", ""))

    args0 = [{"type": "field_label", "text": type_name, "name": "TITLE"}]
    if description:
        args0.insert(
            0,
            {
                "type": "field_image",
                "src": QUESTION_ICON_DATA_URI,
                "width": 16,
                "height": 16,
                "alt": "?",
                "name": "HELP"
            },
        )

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
        default_v = meta.get("default")
        min_v = meta.get("min")
        max_v = meta.get("max")
        field_name = f"PARAM_{slugify(key).upper()}"

        ranged = range_options(min_v, max_v, meta_type)
        if min_v is not None and max_v is not None and ranged:
            args0.append({"type": "field_dropdown", "name": field_name, "options": ranged})
            default = ranged[0][1]
        else:
            if default_v is not None:
                default = safe_value(default_v)
            elif min_v is not None and max_v is None:
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
        "tooltip": description,
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
        "description": description,
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
    option_param_map = {
        b["block_type"]: {
            p["field"]: p.get("option_parameters", {})
            for p in b.get("parameters", [])
            if p.get("option_parameters")
        }
        for b in blocks
    }
    option_tips = {
        b["block_type"]: {
            p["field"]: p.get("option_descriptions", {})
            for p in b.get("parameters", [])
            if p.get("option_descriptions")
        }
        for b in blocks
    }

    registrar_name = "registerBlocks_" + slugify(path.stem)
    content = f"""(() => {{
const BLOCKS = {js_dump(arr)};
const BLOCK_TOOLTIPS = {js_dump(tips)};
const PARAM_TOOLTIPS = {js_dump(param_tips)};
const OPTION_PARAM_MAP = {js_dump(option_param_map)};
const OPTION_TOOLTIPS = {js_dump(option_tips)};
const HELP_ICON = {json.dumps(QUESTION_ICON_DATA_URI)};

function setClickHelp(field, text) {{
  if (!field) return;
  if (field.setTooltip) field.setTooltip('');
  if (!text) return;
  const msg = String(text);

  function ensureHelpPopup() {{
    window.BRIC = window.BRIC || {{}};
    let el = window.BRIC.helpPopupEl || document.querySelector('.blocklyTooltipDiv');
    if (!el) {{
      el = document.createElement('div');
      el.className = 'blocklyTooltipDiv';
      document.body.appendChild(el);
    }}
    window.BRIC.helpPopupEl = el;
    if (!window.BRIC.hideHelpPopup) {{
      window.BRIC.hideHelpPopup = () => {{
        el.style.display = 'none';
        window.BRIC.helpPopupAnchor = null;
      }};
    }}
    if (!window.BRIC.helpPopupBound) {{
      document.addEventListener('keydown', (evt) => {{
        if (evt.key === 'Escape') window.BRIC.hideHelpPopup();
      }});
      document.addEventListener('click', (evt) => {{
        const anchor = window.BRIC.helpPopupAnchor;
        if (!anchor) return;
        if (el.contains(evt.target)) return;
        if (anchor.contains && anchor.contains(evt.target)) return;
        window.BRIC.hideHelpPopup();
      }}, true);
      window.BRIC.helpPopupBound = true;
    }}
    return el;
  }}

  function showHelpPopup(anchor, text) {{
    if (!text) return;
    const popup = ensureHelpPopup();
    const rect = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
    popup.textContent = String(text);
    popup.style.display = 'block';
    if (rect) {{
      const margin = 8;
      const preferredLeft = rect.left + rect.width + margin;
      const top = Math.max(8, rect.top - 4);
      const maxLeft = window.innerWidth - popup.offsetWidth - 8;
      let left = Math.min(preferredLeft, maxLeft);
      if (left < 8) left = 8;
      popup.style.left = `${{Math.round(left)}}px`;
      popup.style.top = `${{Math.round(top)}}px`;
    }} else {{
      popup.style.left = '12px';
      popup.style.top = '12px';
    }}
    window.BRIC.helpPopupAnchor = anchor || null;
  }}

  const onClick = () => {{
    const anchor = field.getClickTarget_ ? field.getClickTarget_() : null;
    showHelpPopup(anchor, msg);
  }};
  if (field.setOnClickHandler) {{
    field.setOnClickHandler(onClick);
    return;
  }}
  if (field.getClickTarget_) {{
    const target = field.getClickTarget_();
    if (target && target.addEventListener) {{
      target.addEventListener('click', onClick);
    }}
  }}
}}

function setHoverOptionHelp(field, optionDescriptions) {{
  if (!field) return;
  const byValue = optionDescriptions || {{}};
  if (!Object.keys(byValue).length) return;
  field.__bricOptionDescriptions = byValue;

  function ensureHelpPopup() {{
    window.BRIC = window.BRIC || {{}};
    let el = window.BRIC.helpPopupEl || document.querySelector('.blocklyTooltipDiv');
    if (!el) {{
      el = document.createElement('div');
      el.className = 'blocklyTooltipDiv';
      document.body.appendChild(el);
    }}
    window.BRIC.helpPopupEl = el;
    if (!window.BRIC.hideHelpPopup) {{
      window.BRIC.hideHelpPopup = () => {{
        el.style.display = 'none';
        window.BRIC.helpPopupAnchor = null;
      }};
    }}
    return el;
  }}

  function showHelp(anchor, msg) {{
    if (!msg) return;
    const popup = ensureHelpPopup();
    const rect = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
    popup.textContent = msg;
    popup.style.display = 'block';
    if (rect) {{
      const margin = 8;
      const preferredLeft = rect.left + rect.width + margin;
      const top = Math.max(8, rect.top - 4);
      const maxLeft = window.innerWidth - popup.offsetWidth - 8;
      let left = Math.min(preferredLeft, maxLeft);
      if (left < 8) left = 8;
      popup.style.left = `${{Math.round(left)}}px`;
      popup.style.top = `${{Math.round(top)}}px`;
    }} else {{
      popup.style.left = '12px';
      popup.style.top = '12px';
    }}
    window.BRIC.helpPopupAnchor = anchor || null;
  }}

  const target = field.getClickTarget_ ? field.getClickTarget_() : null;
  const showSelected = () => {{
    const currentMap = field.__bricOptionDescriptions || {{}};
    const value = field.getValue ? String(field.getValue() || '') : '';
    const msg = currentMap[value] || '';
    if (!msg) {{
      if (window.BRIC && window.BRIC.helpPopupAnchor === target && window.BRIC.hideHelpPopup) {{
        window.BRIC.hideHelpPopup();
      }}
      return;
    }}
    showHelp(target, msg);
  }};
  const hide = () => {{
    if (window.BRIC && window.BRIC.helpPopupAnchor === target && window.BRIC.hideHelpPopup) {{
      window.BRIC.hideHelpPopup();
    }}
  }};

  if (target && !target.__bricOptionHelpBound) {{
    target.addEventListener('mouseenter', showSelected);
    target.addEventListener('mousemove', showSelected);
    target.addEventListener('mouseleave', hide);
    target.__bricOptionHelpBound = true;
  }}

  if (typeof field.showEditor_ === 'function' && !field.__bricShowEditorWrapped) {{
    const baseShowEditor = field.showEditor_.bind(field);
    field.showEditor_ = function(...args) {{
      const result = baseShowEditor(...args);
      window.BRIC = window.BRIC || {{}};
      window.BRIC.activeOptionHelpField = field;

      window.setTimeout(() => {{
        const dropdownDiv = document.querySelector('.blocklyDropDownDiv');
        if (!dropdownDiv) return;
        if (dropdownDiv.__bricOptionMenuHelpBound) return;

        const findMenuItem = (node) => {{
          if (!node || !node.closest) return null;
          return node.closest('.goog-menuitem, .blocklyMenuItem');
        }};
        const valueFromMenuItem = (itemEl) => {{
          if (!itemEl) return '';
          const dataValue = itemEl.getAttribute('data-value') || (itemEl.dataset && itemEl.dataset.value);
          if (dataValue != null && String(dataValue).trim()) return String(dataValue).trim();
          return String(itemEl.textContent || '').trim();
        }};

        dropdownDiv.addEventListener('mousemove', (evt) => {{
          const itemEl = findMenuItem(evt.target);
          const activeField = window.BRIC && window.BRIC.activeOptionHelpField;
          const currentMap = (activeField && activeField.__bricOptionDescriptions) || {{}};
          if (!itemEl) return;
          const value = valueFromMenuItem(itemEl);
          const msg = currentMap[value] || '';
          if (!msg) {{
            if (window.BRIC && window.BRIC.helpPopupAnchor === itemEl && window.BRIC.hideHelpPopup) {{
              window.BRIC.hideHelpPopup();
            }}
            return;
          }}
          showHelp(itemEl, msg);
        }});

        dropdownDiv.addEventListener('mouseleave', () => {{
          if (window.BRIC && window.BRIC.hideHelpPopup) {{
            window.BRIC.hideHelpPopup();
          }}
        }});

        dropdownDiv.addEventListener('click', () => {{
          if (window.BRIC && window.BRIC.hideHelpPopup) {{
            window.BRIC.hideHelpPopup();
          }}
        }});

        dropdownDiv.__bricOptionMenuHelpBound = true;
      }}, 0);
      return result;
    }};
    field.__bricShowEditorWrapped = true;
  }}
}}

function snapshotFieldValues(block) {{
  const out = {{}};
  (block.inputList || []).forEach((input) => {{
    (input.fieldRow || []).forEach((field) => {{
      if (!field || !field.name) return;
      try {{
        out[field.name] = block.getFieldValue(field.name);
      }} catch (err) {{
        // Ignore unsupported fields.
      }}
    }});
  }});
  return out;
}}

function clearDynamicOptionInputs(block) {{
  const names = (block.inputList || [])
    .map((input) => input && input.name)
    .filter((name) => typeof name === 'string' && name.startsWith('OPT_DYN_'));
  names.forEach((name) => block.removeInput(name, true));
}}

function appendOptionDefs(block, defs, priorValues, tokenRef, triggerFields) {{
  (defs || []).forEach((meta) => {{
    tokenRef.v += 1;
    const inputName = 'OPT_DYN_' + tokenRef.v;
    const input = block.appendDummyInput(inputName);
    const helpFieldName = 'HELP_' + meta.field;
    input.appendField(new Blockly.FieldImage(HELP_ICON, 16, 16, '?'), helpFieldName);
    input.appendField(String(meta.name || 'param'));

    const prior = priorValues[meta.field];
    if (Array.isArray(meta.options) && meta.options.length) {{
      input.appendField(new Blockly.FieldDropdown(meta.options), meta.field);
      const nextValue = prior != null ? String(prior) : (meta.default == null ? '' : String(meta.default));
      if (nextValue) {{
        try {{
          block.setFieldValue(nextValue, meta.field);
        }} catch (err) {{
          // Ignore when value is outside dropdown options.
        }}
      }}
    }} else {{
      const txt = prior != null ? String(prior) : (meta.default == null ? '' : String(meta.default));
      input.appendField(new Blockly.FieldTextInput(txt), meta.field);
    }}

    const field = block.getField(meta.field);
    setHoverOptionHelp(field, meta.option_descriptions || {{}});
    const helpField = block.getField(helpFieldName);
    setClickHelp(helpField, meta.description || '');

    const selected = block.getFieldValue(meta.field) || '';
    const nested = ((meta.option_parameters || {{}})[selected]) || [];
    if (meta.option_parameters && Object.keys(meta.option_parameters).length) {{
      triggerFields.add(meta.field);
    }}
    if (nested.length) {{
      appendOptionDefs(block, nested, priorValues, tokenRef, triggerFields);
    }}
  }});
}}

function rerenderOptionParams(block, blockType) {{
  const byField = OPTION_PARAM_MAP[blockType] || {{}};
  const rootParents = Object.keys(byField);
  if (!rootParents.length) return;

  const priorValues = snapshotFieldValues(block);
  clearDynamicOptionInputs(block);
  const tokenRef = {{ v: 0 }};
  const triggerFields = new Set(rootParents);
  rootParents.forEach((parentField) => {{
    const selected = block.getFieldValue(parentField) || '';
    const defs = (byField[parentField] || {{}})[selected] || [];
    appendOptionDefs(block, defs, priorValues, tokenRef, triggerFields);
  }});
  block.__optionTriggerFields = triggerFields;
  if (block.render) block.render();
}}

function {registrar_name}() {{
  Blockly.defineBlocksWithJsonArray(BLOCKS);
  Object.entries(BLOCK_TOOLTIPS).forEach(([blockType, tip]) => {{
    const def = Blockly.Blocks[blockType];
    if (def) {{
      const baseInit = def.init;
      def.init = function wrappedInit() {{
        baseInit.call(this);
        this.setTooltip(tip || '');
        setClickHelp(this.getField('HELP'), tip || '');
        const perField = PARAM_TOOLTIPS[blockType] || {{}};
        const perOptionField = OPTION_TOOLTIPS[blockType] || {{}};
        Object.entries(perField).forEach(([fieldName, fieldTip]) => {{
          const field = this.getField(fieldName);
          setHoverOptionHelp(field, perOptionField[fieldName] || {{}});
          const helpField = this.getField('HELP_' + fieldName.replace('PARAM_', ''));
          setClickHelp(helpField, fieldTip || '');
        }});

        const optionParents = Object.keys(OPTION_PARAM_MAP[blockType] || {{}});
        rerenderOptionParams(this, blockType);
        this.setOnChange((event) => {{
          if (!event || event.isUiEvent) return;
          if (event.blockId !== this.id) return;
          if (event.type !== Blockly.Events.BLOCK_CHANGE) return;
          if (event.element !== 'field') return;
          const triggerFields = this.__optionTriggerFields || new Set(optionParents);
          if (!triggerFields.has(event.name)) return;
          if (this.__renderingOptionParams) return;
          this.__renderingOptionParams = true;
          try {{
            rerenderOptionParams(this, blockType);
          }} finally {{
            this.__renderingOptionParams = false;
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
    option_param_map = {
        b["block_type"]: {
            p["field"]: p.get("option_parameters", {})
            for p in b.get("parameters", [])
            if p.get("option_parameters")
        }
        for b in blocks
    }
    lines = [
        "(() => {",
        "const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;",
        f"const OPTION_PARAM_MAP = {js_dump(option_param_map)};",
        "",
    ]
    lines.append(
        "function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }"
    )
    lines.append(
        "function parseChildNodes(raw) { return (raw || '').split('\\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }"
    )
    lines.append(
        "function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }"
    )
    lines.append(
        "function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { out[meta.name] = parseTyped(block.getFieldValue(meta.field), meta.type); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }"
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

            lines.append(f"  const optionMetaByField = OPTION_PARAM_MAP['{btype}'] || {{}};")
            lines.append("  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {")
            lines.append("    const selected = block.getFieldValue(parentField) || '';")
            lines.append("    const defs = byOption[selected] || [];")
            lines.append("    collectOptionParams(block, defs, parameter);")
            lines.append("  });")

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
        if not block_types:
            continue
        display_name = display_category_name(cat)
        contents.append(
            {
                "kind": "category",
                "name": display_name,
                "categorystyle": f"{slugify(cat)}_category",
                "contents": [{"kind": "block", "type": bt} for bt in block_types],
            }
        )

    # Google Blockly built-in dynamic category for user-defined functions.
    contents.append(
        {
            "kind": "category",
            "name": "Functions",
            "categorystyle": "functions_category",
            "custom": "PROCEDURE",
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
    # Built-in Functions category uses a dedicated style.
    category_styles["functions_category"] = {
        "colour": "#3f51b5",
    }

    theme = {
        "base": "classic",
        "blockStyles": {
            "logic_blocks": {"colourPrimary": "#f39c12"},
            "function_blocks": {"colourPrimary": "#2980b9"},
            "action_blocks": {"colourPrimary": "#27ae60"},
            # Built-in Blockly function/procedure blocks in Functions category.
            "procedure_blocks": {
                "colourPrimary": "#3f51b5",
                "colourSecondary": "#3647a1",
                "colourTertiary": "#2f3f8f",
            },
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
        if not is_item_enabled(item):
            continue
        behavior_groups[normalize_category(item.get("category", "General"))].append(build_behavior_block(item))

    bt_logic = []
    bt_function = []
    for item in bt_list:
        if not is_item_enabled(item):
            continue
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

    bt_logic_types = [b["block_type"] for b in bt_logic]
    if bt_logic_types:
        toolbox_categories["BT_Logic"] = bt_logic_types

    bt_function_types = [
        b["block_type"] for b in bt_function if b.get("node_type") != "Root"
    ]
    if bt_function_types:
        toolbox_categories["BT_Function"] = bt_function_types

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
