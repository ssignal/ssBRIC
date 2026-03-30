import json
import re
from copy import deepcopy
from pathlib import Path
from typing import Any, Dict, List, Tuple

from flask import Flask, jsonify, render_template, request, send_from_directory

from src.generator_engine import generate_all

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data" / "scenarios"
OUTPUT_DIR = BASE_DIR / "data" / "output"
GENERATED_DIR = BASE_DIR / "static" / "generated"
MANIFEST_PATH = GENERATED_DIR / "manifest.json"
BRIC_ACTION_RE = re.compile(r"^BRIC\.([A-Za-z0-9_]+):(.*)$")
LEGACY_BLOCK_TYPE_MAP = {
    # Legacy saved workspace type before BRIC reference naming update.
    "behavior__motion__bric_motion_start_motion": "behavior__motion__bric_start_motion_motion_start_motion",
}

app = Flask(__name__)


def load_port(default: int = 8000) -> int:
    port_file = BASE_DIR / "port"
    if not port_file.exists():
        return default
    try:
        value = int(port_file.read_text(encoding="utf-8").strip())
    except (ValueError, TypeError):
        return default
    if 1 <= value <= 65535:
        return value
    return default


def scenario_path(name: str) -> Path:
    safe = (
        "".join(c for c in name if c.isalnum() or c in ("-", "_", " "))
        .strip()
        .replace(" ", "_")
    )
    if not safe:
        raise ValueError("Invalid scenario name")
    return DATA_DIR / f"{safe}.json"


def parse_manifest() -> Dict[str, Any]:
    if not MANIFEST_PATH.exists():
        generate_all()
    if not MANIFEST_PATH.exists():
        return {"behavior": [], "bt_logic": [], "bt_function": []}
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def cast_field(value: Any, field_type: str) -> Any:
    if value is None:
        return ""
    if field_type in ("int", "integer"):
        try:
            return int(value)
        except (ValueError, TypeError):
            return 0
    if field_type in ("float", "double", "number"):
        try:
            return float(value)
        except (ValueError, TypeError):
            return 0.0
    return str(value)


def bt_to_blockly(
    bt_data: Any, manifest: Dict[str, Any]
) -> Tuple[Dict[str, Any], List[str]]:
    errors: List[str] = []

    behavior_by_action = {
        item.get("action"): item for item in manifest.get("behavior", [])
    }
    bt_by_type = {
        item.get("node_type"): item
        for item in (manifest.get("bt_logic", []) + manifest.get("bt_function", []))
    }

    def make_block(node: Dict[str, Any], path: str) -> Dict[str, Any]:
        n_type = node.get("type")
        action = node.get("action")

        block_meta = None
        if action and action in behavior_by_action:
            block_meta = behavior_by_action[action]
        elif n_type and n_type in bt_by_type:
            block_meta = bt_by_type[n_type]

        if not block_meta:
            errors.append(f"{path}: unsupported node (type={n_type}, action={action})")
            return {
                "type": "bt_function__actiondummy",
                "fields": {},
            }

        block = {
            "type": block_meta["block_type"],
            "fields": {},
        }

        if block_meta.get("kind") == "behavior":
            params = node.get("parameter") or {}
            for p in block_meta.get("parameters", []):
                val = params.get(p["name"])
                block["fields"][p["field"]] = str(
                    cast_field(val, p.get("type", "string"))
                )
        else:
            for p in block_meta.get("parameters", []):
                val = node.get(p["name"])
                block["fields"][p["field"]] = str(
                    cast_field(val, p.get("type", "string"))
                )

            if block_meta.get("has_children"):
                children = node.get("children") or []
                if children:
                    first = make_block(children[0], f"{path}.children[0]")
                    current = first
                    for idx, child in enumerate(children[1:], start=1):
                        nxt = make_block(child, f"{path}.children[{idx}]")
                        current["next"] = {"block": nxt}
                        current = nxt
                    block["inputs"] = {"CHILDREN": {"block": first}}
            elif block_meta.get("has_child"):
                child = node.get("child")
                if child is None:
                    children = node.get("children") or []
                    child = children[0] if children else None
                if isinstance(child, dict):
                    block["inputs"] = {
                        "CHILD": {"block": make_block(child, f"{path}.child")}
                    }

        return block

    root_node = bt_data
    if isinstance(bt_data, list):
        if not bt_data:
            return {"blocks": {"languageVersion": 0, "blocks": []}}, []
        root_node = bt_data[0]

    if not isinstance(root_node, dict):
        return {"blocks": {"languageVersion": 0, "blocks": []}}, [
            "Scenario JSON must be an object or list"
        ]

    top = make_block(root_node, "root")
    workspace = {"blocks": {"languageVersion": 0, "blocks": [top]}}
    return workspace, errors


def is_blockly_workspace_data(data: Any) -> bool:
    if not isinstance(data, dict):
        return False
    blocks = data.get("blocks")
    if not isinstance(blocks, dict):
        return False
    arr = blocks.get("blocks")
    if not isinstance(arr, list):
        return False
    return True


def reorder_workspace_top_blocks(data: Dict[str, Any]) -> Dict[str, Any]:
    if not is_blockly_workspace_data(data):
        return data
    out = deepcopy(data)
    arr = out.get("blocks", {}).get("blocks", [])
    if not isinstance(arr, list):
        return out

    def order_of(block: Dict[str, Any]) -> int:
        t = str((block or {}).get("type", ""))
        if t in ("procedures_defnoreturn", "procedures_defreturn"):
            return 0
        return 1

    out["blocks"]["blocks"] = sorted(
        arr, key=lambda b: (order_of(b), str((b or {}).get("id", "")))
    )
    return out


def normalize_workspace_legacy_block_types(data: Dict[str, Any]) -> Dict[str, Any]:
    if not is_blockly_workspace_data(data):
        return data
    out = deepcopy(data)

    def walk_block(block: Any):
        if not isinstance(block, dict):
            return
        mapped = LEGACY_BLOCK_TYPE_MAP.get(str(block.get("type", "")))
        if mapped:
            block["type"] = mapped

        inputs = block.get("inputs")
        if isinstance(inputs, dict):
            for inp in inputs.values():
                if isinstance(inp, dict):
                    walk_block(inp.get("block"))

        nxt = block.get("next")
        if isinstance(nxt, dict):
            walk_block(nxt.get("block"))

    blocks = out.get("blocks", {}).get("blocks", [])
    if isinstance(blocks, list):
        for block in blocks:
            walk_block(block)
    return out


def preprocess_export_tree(data: Any) -> Any:
    out = deepcopy(data)
    ref_cache: Dict[str, Dict[str, Dict[str, Any]]] = {}

    def load_ref(ref_name: str) -> Dict[str, Dict[str, Any]]:
        if ref_name in ref_cache:
            return ref_cache[ref_name]
        p = BASE_DIR / "btInfo" / f"{ref_name}.json"
        table: Dict[str, Dict[str, Any]] = {}
        if p.exists():
            try:
                raw = json.loads(p.read_text(encoding="utf-8"))
                if isinstance(raw, list):
                    for row in raw:
                        if not isinstance(row, dict):
                            continue
                        n = str(row.get("name", "")).strip()
                        d = row.get("data")
                        if n and isinstance(d, dict):
                            table[n] = d
            except Exception:  # noqa: BLE001
                table = {}
        ref_cache[ref_name] = table
        return table

    def walk(node: Any):
        if isinstance(node, list):
            for item in node:
                walk(item)
            return
        if not isinstance(node, dict):
            return

        action = node.get("action")
        if isinstance(action, str):
            m = BRIC_ACTION_RE.match(action.strip())
            if m:
                ref_name = m.group(1)
                real_action = m.group(2).strip()
                param = node.get("parameter")
                if isinstance(param, dict):
                    key_name = str(param.get("name", "")).strip()
                    matched = load_ref(ref_name).get(key_name)
                    if isinstance(matched, dict):
                        # Keep reference-mapped base data, but preserve
                        # additional user-selected option parameters.
                        merged_param = deepcopy(matched)
                        for k, v in param.items():
                            # Reference key used for lookup; mapped data already
                            # has normalized values (e.g., task_type/name/repeat).
                            if k == "name":
                                continue
                            if k not in merged_param:
                                merged_param[k] = deepcopy(v)
                        node["parameter"] = merged_param
                if real_action:
                    node["action"] = real_action

        walk(node.get("child"))
        walk(node.get("children"))

        # Function-map format support: { "Root": {...}, "FuncA": { "child": {...} }, ... }
        if "Root" in node and isinstance(node.get("Root"), dict):
            walk(node.get("Root"))
            for k, v in node.items():
                if k == "Root":
                    continue
                walk(v)

    walk(out)
    return out


@app.route("/")
def index():
    css_mtime = int((BASE_DIR / "static" / "style.css").stat().st_mtime)
    js_mtime = int((BASE_DIR / "static" / "app.js").stat().st_mtime)
    return render_template("index.html", css_version=css_mtime, js_version=js_mtime)


@app.get("/src/<path:filename>")
def serve_src(filename: str):
    return send_from_directory(BASE_DIR / "src", filename)


@app.get("/manifest.json")
def serve_manifest():
    return send_from_directory(GENERATED_DIR, "manifest.json")


@app.get("/CustomBlocks/<path:filename>")
def serve_custom_blocks(filename: str):
    return send_from_directory(GENERATED_DIR / "CustomBlocks", filename)


@app.get("/Generators/<path:filename>")
def serve_generators(filename: str):
    return send_from_directory(GENERATED_DIR / "Generators", filename)


@app.get("/Toolbox/<path:filename>")
def serve_toolbox(filename: str):
    return send_from_directory(GENERATED_DIR / "Toolbox", filename)


@app.get("/Theme/<path:filename>")
def serve_theme(filename: str):
    return send_from_directory(GENERATED_DIR / "Theme", filename)


@app.post("/api/blocks/update")
def update_blocks():
    try:
        summary = generate_all()
        return jsonify({"ok": True, "summary": summary})
    except Exception as exc:  # noqa: BLE001
        return jsonify({"ok": False, "error": str(exc)}), 500


@app.get("/api/blocks/config")
def block_config():
    parse_manifest()
    return jsonify(
        {
            "manifest": "/static/generated/manifest.json",
            "toolbox": "/static/generated/Toolbox/toolboxCustomBasic.js",
            "theme": "/static/generated/Theme/themeForCustomBasic.js",
            "blocks": "/static/generated/CustomBlocks/index.js",
            "generators": "/static/generated/Generators/index.js",
        }
    )


@app.get("/api/scenarios")
def list_scenarios():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    out = []
    for f in sorted(DATA_DIR.glob("*.json")):
        out.append({"name": f.stem, "updated": f.stat().st_mtime})
    return jsonify({"items": out})


@app.get("/api/scenarios/<name>")
def get_scenario(name: str):
    try:
        p = scenario_path(name)
    except ValueError:
        return jsonify({"ok": False, "error": "Invalid scenario name"}), 400

    if not p.exists():
        return jsonify({"ok": False, "error": "Scenario not found"}), 404
    return jsonify(
        {"ok": True, "name": p.stem, "data": json.loads(p.read_text(encoding="utf-8"))}
    )


@app.post("/api/scenarios")
def save_scenario():
    body = request.get_json(silent=True) or {}
    name = body.get("name", "").strip()
    original_name = str(body.get("original_name", "")).strip()
    data = body.get("data")
    if not name:
        return jsonify({"ok": False, "error": "Scenario name is required"}), 400
    if data is None:
        return jsonify({"ok": False, "error": "Scenario data is required"}), 400

    try:
        p = scenario_path(name)
        original_path = scenario_path(original_name) if original_name else None
    except ValueError:
        return jsonify({"ok": False, "error": "Invalid scenario name"}), 400

    # Prevent overwriting a different existing scenario when saving with a new name.
    if p.exists() and (original_path is None or p != original_path):
        return jsonify({"ok": False, "error": "Scenario name already exists"}), 409

    if is_blockly_workspace_data(data):
        data = reorder_workspace_top_blocks(data)

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return jsonify({"ok": True, "name": p.stem})


@app.post("/api/behavior-tree/export")
def export_behavior_tree():
    body = request.get_json(silent=True) or {}
    data = body.get("data")
    if data is None:
        return jsonify({"ok": False, "error": "Behavior tree data is required"}), 400

    processed = preprocess_export_tree(data)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUTPUT_DIR / "behaviorTree.json"
    out.write_text(json.dumps(processed, ensure_ascii=False, indent=2), encoding="utf-8")
    return jsonify({"ok": True, "path": str(out.relative_to(BASE_DIR))})


@app.delete("/api/scenarios/<name>")
def delete_scenario(name: str):
    try:
        p = scenario_path(name)
    except ValueError:
        return jsonify({"ok": False, "error": "Invalid scenario name"}), 400

    if not p.exists():
        return jsonify({"ok": False, "error": "Scenario not found"}), 404
    p.unlink()
    return jsonify({"ok": True})


@app.post("/api/scenarios/rename")
def rename_scenario():
    body = request.get_json(silent=True) or {}
    old_name = str(body.get("old_name", "")).strip()
    new_name = str(body.get("new_name", "")).strip()

    if not old_name:
        return jsonify({"ok": False, "error": "Old scenario name is required"}), 400
    if not new_name:
        return jsonify({"ok": False, "error": "New scenario name is required"}), 400

    try:
        old_path = scenario_path(old_name)
        new_path = scenario_path(new_name)
    except ValueError:
        return jsonify({"ok": False, "error": "Invalid scenario name"}), 400

    if not old_path.exists():
        return jsonify({"ok": False, "error": "Scenario not found"}), 404
    if old_path == new_path:
        return jsonify({"ok": True, "name": new_path.stem})
    if new_path.exists():
        return jsonify({"ok": False, "error": "Scenario name already exists"}), 409

    old_path.rename(new_path)
    return jsonify({"ok": True, "name": new_path.stem})


@app.get("/api/scenarios/<name>/blockly")
def scenario_as_blockly(name: str):
    try:
        p = scenario_path(name)
    except ValueError:
        return jsonify({"ok": False, "error": "Invalid scenario name"}), 400

    if not p.exists():
        return jsonify({"ok": False, "error": "Scenario not found"}), 404

    scenario_json = json.loads(p.read_text(encoding="utf-8"))
    if is_blockly_workspace_data(scenario_json):
        workspace = normalize_workspace_legacy_block_types(scenario_json)
        workspace = reorder_workspace_top_blocks(workspace)
        return jsonify({"ok": True, "workspace": workspace, "errors": []})

    workspace, errors = bt_to_blockly(scenario_json, parse_manifest())
    return jsonify({"ok": True, "workspace": workspace, "errors": errors})


if __name__ == "__main__":
    generate_all()
    app.run(host="0.0.0.0", port=load_port(), debug=True)
