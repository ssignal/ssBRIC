import json
from pathlib import Path
from typing import Any

from src.db_lib import DBClient


def _read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default


def _write_json_if_changed(path: Path, data: Any) -> bool:
    before = ""
    if path.exists():
        before = path.read_text(encoding="utf-8")
    after = json.dumps(data, ensure_ascii=False, indent=2)
    if before == after:
        return False
    path.write_text(after, encoding="utf-8")
    return True


def _fetch_with_display_name(
    client: DBClient,
    sql_with: str,
    sql_without: str,
) -> tuple[list[dict[str, Any]], bool]:
    """Run sql_with (includes display_name column); fall back to sql_without on error.

    Returns (rows, has_display_name).
    """
    try:
        return client.read(sql_with), True
    except Exception:
        try:
            return client.read(sql_without), False
        except Exception:
            return [], False


def _fetch_robot_types(client: DBClient) -> list[dict[str, str]]:
    rows, has_dn = _fetch_with_display_name(
        client,
        "SELECT name, display_name FROM `RobotType`"
        " WHERE name IS NOT NULL AND name <> '' ORDER BY name",
        "SELECT name FROM `RobotType`"
        " WHERE name IS NOT NULL AND name <> '' ORDER BY name",
    )
    out: list[dict[str, str]] = []
    for row in rows:
        name = str(row.get("name", "")).strip()
        if not name:
            continue
        out.append({
            "value": name,
            "display_name": (str(row.get("display_name") or "").strip() or name) if has_dn else name,  # noqa: E501
        })
    return out


def _fetch_robot_list(client: DBClient) -> list[dict[str, str]]:
    """Fetch RobotList with graceful fallback for varying column names.

    Tries combinations of (display_name | no display_name) x (robot_type | type | neither).
    The robot-type column may be named 'robot_type' or 'type'.
    """
    rows: list[dict[str, Any]] = []
    has_dn = False
    rt_col: str | None = None

    for cols, dn, rt in [
        ("name, display_name, robot_type", True, "robot_type"),
        ("name, display_name, type", True, "type"),
        ("name, robot_type", False, "robot_type"),
        ("name, type", False, "type"),
        ("name, display_name", True, None),
        ("name", False, None),
    ]:
        try:
            rows = client.read(
                f"SELECT {cols} FROM `RobotList`"
                " WHERE name IS NOT NULL AND name <> '' ORDER BY name"
            )
            has_dn = dn
            rt_col = rt
            break
        except Exception:
            continue

    out: list[dict[str, str]] = []
    for row in rows:
        name = str(row.get("name", "")).strip()
        if not name:
            continue
        rt_val = str(row.get(rt_col, "") or "").strip() if rt_col else ""
        dn_val = (str(row.get("display_name") or "").strip() or name) if has_dn else name
        out.append({
            "value": name,
            "display_name": dn_val,
            "robot_type": rt_val,
        })
    return out


def _fetch_behavior_categories(client: DBClient, robot_type: str = "") -> list[str]:
    """Return category names from BehaviorCategory filtered by robot_type.

    robot_type_list is a JSON array column; the value 'common' matches every
    robot type.  When robot_type is empty all categories are returned.
    """
    try:
        rows = client.read(
            "SELECT name, robot_type_list FROM `BehaviorCategory`"
            " WHERE name IS NOT NULL AND name <> '' ORDER BY name"
        )
    except Exception:
        return []
    out: list[str] = []
    for row in rows:
        name = str(row.get("name", "")).strip()
        if not name:
            continue
        if not robot_type:
            out.append(name)
            continue
        raw = row.get("robot_type_list") or "[]"
        try:
            types: list[str] = json.loads(raw) if isinstance(raw, str) else list(raw)
        except Exception:
            types = []
        if "common" in types or robot_type in types:
            out.append(name)
    return out


def _fetch_operation_profiles(client: DBClient) -> list[dict[str, str]]:
    rows, has_dn = _fetch_with_display_name(
        client,
        "SELECT name, display_name FROM `OperationProfile`"
        " WHERE name IS NOT NULL AND name <> '' ORDER BY name",
        "SELECT name FROM `OperationProfile`"
        " WHERE name IS NOT NULL AND name <> '' ORDER BY name",
    )
    out: list[dict[str, str]] = []
    for row in rows:
        name = str(row.get("name", "")).strip()
        if not name:
            continue
        out.append({
            "value": name,
            "display_name": (str(row.get("display_name") or "").strip() or name) if has_dn else name,  # noqa: E501
        })
    return out


_CATEGORY_DISPLAY: dict[str, str] = {
    "lcd": "LCD",
}


def _category_display_name(cat: str) -> str:
    """Return the display-form category name used in BlockListRobot.json."""
    key = cat.strip().lower()
    return _CATEGORY_DISPLAY.get(key, cat.strip().title())


def _fetch_behavior_capability_rows(client: DBClient) -> list[dict[str, Any]]:
    """Fetch all rows from BehaviorCapability and convert to BlockListRobot item dicts."""
    try:
        rows = client.read(
            "SELECT name, category, robot_type, description, parameter"
            " FROM `BehaviorCapability`"
            " WHERE name IS NOT NULL AND name <> ''"
            " ORDER BY category, name"
        )
    except Exception:
        return []

    out: list[dict[str, Any]] = []
    for row in rows:
        action = str(row.get("name", "")).strip()
        if not action:
            continue
        category = _category_display_name(str(row.get("category") or ""))
        description = str(row.get("description") or "").strip().replace("\r\n", "\n").replace("\r", "\n")
        robot_type = str(row.get("robot_type") or "").strip()

        raw_param = row.get("parameter")
        try:
            parameters: list[Any] = json.loads(raw_param) if raw_param else []
        except Exception:
            parameters = []

        item: dict[str, Any] = {
            "category": category,
            "action": action,
            "description": description,
            "enabled": True,
            "parameters": parameters,
        }
        if robot_type and robot_type.lower() != "common":
            item["robot_type"] = robot_type

        out.append(item)
    return out


def _update_blocklist_from_capability(
    path: Path, capability_rows: list[dict[str, Any]]
) -> bool:
    """Fully replace BlockListRobot.json with rows from BehaviorCapability.

    Items whose action starts with 'BRIC.' are manually crafted — kept from
    the existing file unchanged.  All other items are replaced by DB data.
    If capability_rows is empty the file is left unchanged.
    """
    if not capability_rows:
        return False

    existing: list[Any] = _read_json(path, [])
    if not isinstance(existing, list):
        existing = []

    bric_items = [
        item for item in existing
        if isinstance(item, dict) and str(item.get("action", "")).startswith("BRIC.")
    ]

    merged = bric_items + capability_rows
    return _write_json_if_changed(path, merged)


# Template for the BRIC.start_motion wrapper block.
# Options are populated at sync time by _update_blocklist_robot.
_BRIC_START_MOTION_TEMPLATE: dict[str, Any] = {
    "action": "BRIC.start_motion:motion/start_motion",
    "category": "Motion",
    "description": "Motion 시작 명령",
    "enabled": True,
    "parameters": [
        {
            "name": "name",
            "type": "string",
            "description": "Motion task name",
            "enabled": True,
            "options": [],
            "min": None,
            "max": None,
        }
    ],
}


def _ensure_bric_start_motion_block(path: Path) -> bool:
    """Insert the BRIC.start_motion wrapper block into BlockListRobot.json if absent."""
    data = _read_json(path, [])
    if not isinstance(data, list):
        data = []

    already = any(
        isinstance(item, dict)
        and str(item.get("action", "")) == "BRIC.start_motion:motion/start_motion"
        for item in data
    )
    if already:
        return False

    import copy
    data = [copy.deepcopy(_BRIC_START_MOTION_TEMPLATE)] + data
    return _write_json_if_changed(path, data)


def _fetch_motion_rows(client: DBClient, table: str) -> list[dict[str, str]]:
    # Try progressively fewer columns; most permissive first.
    # Tier 1: name + display_name + robot_type + operation_profile + description
    # Tier 2: name + display_name + description
    # Tier 3: name + description
    rows: list[dict[str, Any]] = []
    has_display_name = False
    has_profile_cols = False
    for cols, dn, pc in [
        ("name, display_name, robot_type, operation_profile, description", True, True),
        ("name, display_name, description", True, False),
        ("name, description", False, False),
    ]:
        try:
            rows = client.read(
                f"SELECT {cols} FROM `{table}`"
                f" WHERE name IS NOT NULL AND name <> '' ORDER BY name"
            )
            has_display_name = dn
            has_profile_cols = pc
            break
        except Exception:
            continue
    out: list[dict[str, str]] = []
    for row in rows:
        name = str(row.get("name", "")).strip()
        if not name:
            continue
        entry: dict[str, str] = {
            "value": name,
            "display_name": (str(row.get("display_name") or "").strip() or name)
            if has_display_name
            else name,
            "description": str(row.get("description", "")).strip(),
        }
        if has_profile_cols:
            rt = str(row.get("robot_type") or "").strip()
            op = str(row.get("operation_profile") or "").strip()
            if rt:
                entry["robot_type"] = rt
            if op:
                entry["operation_profile"] = op
        out.append(entry)
    return out


def _update_blocklist_robot(
    path: Path,
    expressive_rows: list[dict[str, str]],
    pose_rows: list[dict[str, str]],
) -> bool:
    data = _read_json(path, [])
    if not isinstance(data, list):
        return False

    changed = False
    for item in data:
        if not isinstance(item, dict):
            continue
        category = str(item.get("category", "")).strip().lower()
        if category != "motion":
            continue
        action = str(item.get("action", "")).strip()
        params = item.get("parameters")
        if not isinstance(params, list):
            continue

        if action == "motion/start_motion":
            # Build the name-options for each task type from DB rows.
            def _name_param(rows: list[dict[str, str]]) -> dict[str, Any]:
                return {
                    "name": "name",
                    "type": "string",
                    "description": "Motion name",
                    "enabled": True,
                    "options": rows,
                    "min": None,
                    "max": None,
                }

            # Find or build the task_type parameter.
            task_type_param = next(
                (p for p in params if isinstance(p, dict) and p.get("name") == "task_type"),
                None,
            )

            if task_type_param is None:
                # Build the full parameter structure from scratch.
                task_type_options: list[dict[str, Any]] = []
                if expressive_rows:
                    task_type_options.append({
                        "value": "expressive_motion",
                        "description": "expressive_motion motion",
                        "parameters": [_name_param(expressive_rows)],
                    })
                if pose_rows:
                    task_type_options.append({
                        "value": "pose_motion",
                        "description": "pose motion",
                        "parameters": [_name_param(pose_rows)],
                    })
                if task_type_options:
                    item["parameters"] = [
                        {
                            "name": "task_type",
                            "type": "string",
                            "description": "Motion task type",
                            "enabled": True,
                            "options": task_type_options,
                            "min": None,
                            "max": None,
                        },
                        {
                            "name": "repeat",
                            "type": "string",
                            "description": "Motion repetition type",
                            "enabled": True,
                            "options": [
                                {"value": "once", "description": "Run once"},
                                {"value": "loop", "description": "Repeat continuously"},
                            ],
                            "min": None,
                            "max": None,
                        },
                    ]
                    changed = True
            else:
                # Update existing task_type options in-place.
                options = task_type_param.get("options")
                if not isinstance(options, list):
                    continue
                for opt in options:
                    if not isinstance(opt, dict):
                        continue
                    opt_value = str(opt.get("value", ""))
                    nested = opt.get("parameters")
                    if not isinstance(nested, list):
                        continue
                    target_rows: list[dict[str, str]] = []
                    if opt_value == "expressive_motion":
                        target_rows = expressive_rows
                    elif opt_value == "pose_motion":
                        target_rows = pose_rows
                    if not target_rows:
                        continue
                    for nested_param in nested:
                        if not isinstance(nested_param, dict):
                            continue
                        if str(nested_param.get("name", "")) == "name":
                            if nested_param.get("options") != target_rows:
                                nested_param["options"] = target_rows
                                changed = True

        if action == "BRIC.start_motion:motion/start_motion":
            for p in params:
                if not isinstance(p, dict) or str(p.get("name", "")) != "name":
                    continue
                current_options = p.get("options")
                if not isinstance(current_options, list):
                    current_options = []
                keep = list(current_options)
                if expressive_rows:
                    keep = [
                        o
                        for o in keep
                        if not (
                            isinstance(o, dict)
                            and str(o.get("value", "")).startswith("expressive_motion.")
                        )
                    ]
                if pose_rows:
                    keep = [
                        o
                        for o in keep
                        if not (
                            isinstance(o, dict)
                            and str(o.get("value", "")).startswith("pose_motion.")
                        )
                    ]

                add_expressive = [
                    {
                        k: v
                        for k, v in {
                            "value": f"expressive_motion.{r['value']}",
                            "display_name": f"expressive_motion.{r.get('display_name', r['value'])}",  # noqa: E501
                            "description": r.get("description", ""),
                            "robot_type": r.get("robot_type", ""),
                            "operation_profile": r.get("operation_profile", ""),
                        }.items()
                        if v  # omit empty strings to keep options clean
                        or k in ("value", "display_name")
                    }
                    for r in expressive_rows
                    if r.get("value")
                ]
                add_pose = [
                    {
                        k: v
                        for k, v in {
                            "value": f"pose_motion.{r['value']}",
                            "display_name": f"pose_motion.{r.get('display_name', r['value'])}",
                            "description": r.get("description", ""),
                            "robot_type": r.get("robot_type", ""),
                            "operation_profile": r.get("operation_profile", ""),
                        }.items()
                        if v or k in ("value", "display_name")
                    }
                    for r in pose_rows
                    if r.get("value")
                ]
                merged = keep + add_expressive + add_pose
                if p.get("options") != merged:
                    p["options"] = merged
                    changed = True

    if not changed:
        return False
    return _write_json_if_changed(path, data)


def _update_start_motion(
    path: Path,
    expressive_rows: list[dict[str, str]],
    pose_rows: list[dict[str, str]],
) -> bool:
    current = _read_json(path, [])
    if not isinstance(current, list):
        current = []

    retained = list(current)
    if expressive_rows:
        retained = [
            row
            for row in retained
            if not (
                isinstance(row, dict)
                and str(row.get("name", "")).startswith("expressive_motion.")
            )
        ]
    if pose_rows:
        retained = [
            row
            for row in retained
            if not (
                isinstance(row, dict)
                and str(row.get("name", "")).startswith("pose_motion.")
            )
        ]

    out: list[dict[str, Any]] = list(retained)
    if expressive_rows:
        for row in expressive_rows:
            name = str(row.get("value", "")).strip()
            if not name:
                continue
            out.append(
                {
                    "name": f"expressive_motion.{name}",
                    "data": {"task_type": "expressive_motion", "name": name, "repeat": 0},
                }
            )
    if pose_rows:
        for row in pose_rows:
            name = str(row.get("value", "")).strip()
            if not name:
                continue
            out.append(
                {
                    "name": f"pose_motion.{name}",
                    "data": {"task_type": "pose_motion", "name": name, "repeat": 0},
                }
            )
    return _write_json_if_changed(path, out)


def _fetch_poi_rows(client: DBClient) -> list[dict[str, Any]]:
    """Read POI table, including area and floor columns when available.

    Returns one entry per unique (area, floor, name) combination.
    """
    rows: list[dict[str, Any]] = []
    has_display_name = has_robot_type = has_op_profile = has_coords = False
    has_area = has_floor = False

    attempts: list[tuple[str, dict[str, bool]]] = [
        (
            "name, display_name, robot_type, operation_profile, area, floor,"
            " position_x, position_y, position_z, description",
            dict(dn=True, rt=True, op=True, area=True, floor=True, coords=True),
        ),
        (
            "name, display_name, robot_type, area, floor,"
            " position_x, position_y, position_z, description",
            dict(dn=True, rt=True, op=False, area=True, floor=True, coords=True),
        ),
        (
            "name, display_name, area, floor,"
            " position_x, position_y, position_z, description",
            dict(dn=True, rt=False, op=False, area=True, floor=True, coords=True),
        ),
        (
            "name, display_name, area, floor, description",
            dict(dn=True, rt=False, op=False, area=True, floor=True, coords=False),
        ),
        (
            "name, display_name, position_x, position_y, position_z, description",
            dict(dn=True, rt=False, op=False, area=False, floor=False, coords=True),
        ),
        (
            "name, display_name, description",
            dict(dn=True, rt=False, op=False, area=False, floor=False, coords=False),
        ),
        (
            "name, description",
            dict(dn=False, rt=False, op=False, area=False, floor=False, coords=False),
        ),
    ]
    flags: dict[str, bool] = {}
    for cols, flags in attempts:
        try:
            rows = client.read(
                f"SELECT {cols} FROM `POI`"
                f" WHERE name IS NOT NULL AND name <> ''"
                f" ORDER BY area, floor, name"
            )
            has_display_name = flags["dn"]
            has_robot_type = flags["rt"]
            has_op_profile = flags["op"]
            has_area = flags["area"]
            has_floor = flags["floor"]
            has_coords = flags["coords"]
            break
        except Exception:
            continue

    out: list[dict[str, Any]] = []
    seen_composite: set[tuple[str, str, str]] = set()
    for row in rows:
        name = str(row.get("name", "")).strip()
        if not name:
            continue
        area_val = str(row.get("area") or "").strip() if has_area else ""
        floor_val = str(row.get("floor") or "").strip() if has_floor else ""
        composite = (name, area_val, floor_val)
        if composite in seen_composite:
            continue
        seen_composite.add(composite)

        display_name = (
            str(row.get("display_name") or "").strip() or name
        ) if has_display_name else name

        entry: dict[str, Any] = {
            "value": name,
            "display_name": display_name,
            "description": str(row.get("description") or "").strip(),
        }
        if has_area and area_val:
            entry["area"] = area_val
        if has_floor and floor_val:
            entry["floor"] = floor_val
        if has_robot_type:
            rt_val = str(row.get("robot_type") or "").strip()
            if rt_val:
                entry["robot_type"] = rt_val
        if has_op_profile:
            op_val = str(row.get("operation_profile") or "").strip()
            if op_val:
                entry["operation_profile"] = op_val
        if has_coords:
            entry["position_x"] = row.get("position_x")
            entry["position_y"] = row.get("position_y")
            entry["position_z"] = row.get("position_z")
        out.append(entry)
    return out


# ─── BRIC:move_to_pose additional block ──────────────────────────────────────

# Placeholder keeps options non-empty so the generator emits a dropdown field
# instead of a text-input. Replaced by _update_move_to_pose_block_options.
_AREA_PLACEHOLDER = {"value": "_", "display_name": "---"}

_BRIC_MOVE_TO_POSE_TEMPLATE: dict[str, Any] = {
    "action": "BRIC:move_to_pose",
    "category": "Navigation",
    "description": "Select area / floor / session / POI",
    "enabled": True,
    "parameters": [
        {
            "name": "area",
            "type": "string",
            "description": "Area",
            "enabled": True,
            "options": [_AREA_PLACEHOLDER],
            "min": None,
            "max": None,
        },
        {
            "name": "floor",
            "type": "string",
            "description": "Floor",
            "enabled": True,
            "options": [_AREA_PLACEHOLDER],
            "min": None,
            "max": None,
        },
        {
            "name": "session",
            "type": "string",
            "description": "Session",
            "enabled": True,
            "options": [_AREA_PLACEHOLDER],
            "min": None,
            "max": None,
        },
        {
            "name": "poi",
            "type": "string",
            "description": "Point of Interest",
            "enabled": True,
            "options": [_AREA_PLACEHOLDER],
            "min": None,
            "max": None,
        },
    ],
}


def _fetch_area_information_rows(client: DBClient) -> list[dict[str, Any]]:
    """Read AreaInformation table.

    Returns a list of dicts with:
      area        — full area string (e.g. "LG sciencepark W10")
      information — parsed dict of {floor: [session, ...]}
    """
    out: list[dict[str, Any]] = []
    try:
        rows = client.read(
            "SELECT area, information FROM `AreaInformation`"
            " WHERE area IS NOT NULL AND area <> '' ORDER BY area"
        )
    except Exception:
        return out

    for row in rows:
        area = str(row.get("area") or "").strip()
        if not area:
            continue
        raw = row.get("information") or "{}"
        try:
            info = json.loads(raw) if isinstance(raw, str) else raw
            if not isinstance(info, dict):
                info = {}
        except Exception:
            info = {}
        out.append({"area": area, "information": info})
    return out


def _ensure_bric_move_to_pose_block(path: Path) -> bool:
    """Insert the BRIC:move_to_pose block into BlockListRobot.json if absent."""
    import copy

    data = _read_json(path, [])
    if not isinstance(data, list):
        data = []

    already = any(
        isinstance(item, dict) and str(item.get("action", "")) == "BRIC:move_to_pose"
        for item in data
    )
    if already:
        return False

    # Insert before other BRIC blocks so it appears first in the category
    insert_at = next(
        (i for i, item in enumerate(data)
         if isinstance(item, dict) and str(item.get("action", "")).startswith("BRIC")),
        0,
    )
    data.insert(insert_at, copy.deepcopy(_BRIC_MOVE_TO_POSE_TEMPLATE))
    return _write_json_if_changed(path, data)


def _update_move_to_pose_block_options(
    path: Path,
    area_info_rows: list[dict[str, Any]],
    poi_rows: list[dict[str, Any]],
) -> bool:
    """Rebuild BRIC:move_to_pose block options from AreaInformation + POI rows.

    area    — one per AreaInformation row (full string from DB)
    floor   — unique (area, floor) pairs; each carries area metadata
    session — unique (area, floor, session) triples; each carries area+floor metadata
    poi     — POI rows with valid coordinates only; each carries area+floor metadata
              and position_x/y/z for export-time lookup
    """
    if not area_info_rows:
        return False

    data = _read_json(path, [])
    if not isinstance(data, list):
        return False

    # area options
    area_opts = [
        {"value": r["area"], "display_name": r["area"]}
        for r in area_info_rows
    ]
    if not area_opts:
        return False

    # floor options
    seen_floor: set[tuple[str, str]] = set()
    floor_opts: list[dict[str, Any]] = []
    for r in area_info_rows:
        for floor_key in r["information"].keys():
            pair = (r["area"], floor_key)
            if pair not in seen_floor:
                seen_floor.add(pair)
                floor_opts.append({"value": floor_key, "display_name": floor_key, "area": r["area"]})
    if not floor_opts:
        floor_opts = [_AREA_PLACEHOLDER]

    # session options
    seen_sess: set[tuple[str, str, str]] = set()
    session_opts: list[dict[str, Any]] = []
    for r in area_info_rows:
        for floor_key, sessions in r["information"].items():
            for sess in (sessions if isinstance(sessions, list) else []):
                sess_str = str(sess).strip()
                if not sess_str:
                    continue
                triple = (r["area"], floor_key, sess_str)
                if triple not in seen_sess:
                    seen_sess.add(triple)
                    session_opts.append({
                        "value": sess_str,
                        "display_name": sess_str,
                        "area": r["area"],
                        "floor": floor_key,
                    })
    if not session_opts:
        session_opts = [_AREA_PLACEHOLDER]

    # poi options — only include rows that have full x/y/z coordinates
    poi_opts: list[dict[str, Any]] = []
    for r in poi_rows:
        if r.get("position_x") is None or r.get("position_y") is None or r.get("position_z") is None:
            continue
        entry: dict[str, Any] = {
            "value": r["value"],
            "display_name": _poi_display_name(r, poi_rows),
            "area": r.get("area", ""),
            "floor": r.get("floor", ""),
            "position_x": r["position_x"],
            "position_y": r["position_y"],
            "position_z": r["position_z"],
        }
        if r.get("description"):
            entry["description"] = r["description"]
        poi_opts.append(entry)
    if not poi_opts:
        poi_opts = [_AREA_PLACEHOLDER]

    changed = False
    for item in data:
        if not isinstance(item, dict):
            continue
        if str(item.get("action", "")).strip() != "BRIC:move_to_pose":
            continue
        for p in item.get("parameters") or []:
            if not isinstance(p, dict):
                continue
            pname = str(p.get("name", ""))
            new_opts = {"area": area_opts, "floor": floor_opts, "session": session_opts, "poi": poi_opts}.get(pname)
            if new_opts is not None and p.get("options") != new_opts:
                p["options"] = new_opts
                changed = True

    if not changed:
        return False
    return _write_json_if_changed(path, data)


def _remove_old_bric_blocks(path: Path) -> bool:
    """Remove deprecated BRIC:area and BRIC.POI blocks from BlockListRobot.json."""
    data = _read_json(path, [])
    if not isinstance(data, list):
        return False
    old_actions = {"BRIC:area", "BRIC.POI:navigation/move_to_pose"}
    filtered = [
        item for item in data
        if not (isinstance(item, dict) and str(item.get("action", "")) in old_actions)
    ]
    if len(filtered) == len(data):
        return False
    return _write_json_if_changed(path, filtered)


def _poi_display_name(row: dict[str, Any], all_rows: list[dict[str, Any]]) -> str:
    """Return a disambiguated display label for a POI option.

    When the same `name` appears across multiple areas, prefix the area so the
    user can tell them apart.  When the name is unique, return `display_name`.
    """
    name = str(row.get("value", "") or "")
    base = str(row.get("display_name") or name)
    duplicates = sum(1 for r in all_rows if str(r.get("value", "") or "") == name)
    if duplicates > 1:
        area = str(row.get("area") or "").strip()
        if area:
            return f"{area} › {base}"
    return base


def _write_bric_move_to_pose_ref(path: Path, poi_rows: list[dict[str, Any]]) -> bool:
    """Write bric_move_to_pose.json — BT export reference for BRIC:move_to_pose block.

    Each entry maps a composite key "{area}::{floor}::{poi_name}" to the pose data
    used by navigation/move_to_pose. Only includes POIs with full coordinates.
    """
    entries: list[dict[str, Any]] = []
    for r in poi_rows:
        if r.get("position_x") is None or r.get("position_y") is None or r.get("position_z") is None:
            continue
        name = str(r.get("value", "")).strip()
        area = str(r.get("area", "")).strip()
        floor = str(r.get("floor", "")).strip()
        if not (name and area):
            continue
        key = f"{area}::{floor}::{name}"
        entries.append({
            "name": key,
            "data": {
                "pose_type": "map",
                "pose": {
                    "x": float(r["position_x"]),
                    "y": float(r["position_y"]),
                    "z": float(r["position_z"]),
                },
            },
        })
    return _write_json_if_changed(path, entries)


def _update_poi_json(path: Path, poi_rows: list[dict[str, Any]]) -> bool:
    """Update POI.json reference file from DB rows.

    Keeps existing manually-crafted entries not present in DB.
    Replaces/adds entries for each DB row using its name as key.
    Data format: { "pose_type": "map", "pose": { "x": ..., "y": ..., "z": ... } }
    """
    if not poi_rows:
        return False

    current = _read_json(path, [])
    if not isinstance(current, list):
        current = []

    db_names = {str(r["value"]) for r in poi_rows if r.get("value")}
    retained = [
        row for row in current
        if isinstance(row, dict) and str(row.get("name", "")) not in db_names
    ]

    new_entries: list[dict[str, Any]] = []
    for row in poi_rows:
        name = str(row.get("value", "")).strip()
        if not name:
            continue
        x = row.get("position_x")
        y = row.get("position_y")
        z = row.get("position_z")
        pose: dict[str, Any] = {}
        if x is not None:
            pose["x"] = float(x)
        if y is not None:
            pose["y"] = float(y)
        if z is not None:
            pose["z"] = float(z)
        data_val: dict[str, Any] = {"pose_type": "map"}
        if pose:
            data_val["pose"] = pose
        new_entries.append({"name": name, "data": data_val})

    out = retained + new_entries
    return _write_json_if_changed(path, out)


def sync_block_info_from_db(base_dir: Path) -> dict[str, Any]:
    summary: dict[str, Any] = {
        "ok": True,
        "updated": [],
        "warnings": [],
        "counts": {},
    }

    cfg_path = base_dir / "dbinfo.json"
    cfg = _read_json(cfg_path, {})
    if not isinstance(cfg, dict):
        summary["ok"] = False
        summary["warnings"].append("dbinfo.json is missing or invalid")
        return summary

    client = DBClient(cfg)
    try:
        capability_rows = _fetch_behavior_capability_rows(client)
        summary["counts"]["BehaviorCapability"] = len(capability_rows)

        blocklist_path = base_dir / "btInfo" / "BlockListRobot.json"
        if _update_blocklist_from_capability(blocklist_path, capability_rows):
            summary["updated"].append("btInfo/BlockListRobot.json (capability)")

        if _ensure_bric_start_motion_block(blocklist_path):
            summary["updated"].append("btInfo/BlockListRobot.json (bric wrapper)")

        expressive_rows = _fetch_motion_rows(client, "MotionExpressive")
        pose_rows = _fetch_motion_rows(client, "MotionPose")
        summary["counts"] = {
            "MotionExpressive": len(expressive_rows),
            "MotionPose": len(pose_rows),
        }

        if _update_blocklist_robot(
            base_dir / "btInfo" / "BlockListRobot.json",
            expressive_rows,
            pose_rows,
        ):
            summary["updated"].append("btInfo/BlockListRobot.json")

        if _update_start_motion(
            base_dir / "btInfo" / "start_motion.json",
            expressive_rows,
            pose_rows,
        ):
            summary["updated"].append("btInfo/start_motion.json")

        # BRIC:move_to_pose additional block (area + floor + session + POI)
        area_info_rows = _fetch_area_information_rows(client)
        summary["counts"]["AreaInformation"] = len(area_info_rows)

        poi_rows = _fetch_poi_rows(client)
        summary["counts"]["POI"] = len(poi_rows)

        # Insert the new block first, populate options, then remove old deprecated blocks
        if _ensure_bric_move_to_pose_block(blocklist_path):
            summary["updated"].append("btInfo/BlockListRobot.json (bric move_to_pose)")

        if _update_move_to_pose_block_options(blocklist_path, area_info_rows, poi_rows):
            summary["updated"].append("btInfo/BlockListRobot.json (move_to_pose options)")

        if _remove_old_bric_blocks(blocklist_path):
            summary["updated"].append("btInfo/BlockListRobot.json (removed deprecated BRIC blocks)")

        if _update_poi_json(base_dir / "btInfo" / "POI.json", poi_rows):
            summary["updated"].append("btInfo/POI.json")

        if _write_bric_move_to_pose_ref(base_dir / "btInfo" / "bric_move_to_pose.json", poi_rows):
            summary["updated"].append("btInfo/bric_move_to_pose.json")

        # Fetch profile table row counts for summary only (data served live from DB).
        robot_types = _fetch_robot_types(client)
        robot_list = _fetch_robot_list(client)
        operation_profiles = _fetch_operation_profiles(client)
        summary["counts"].update({
            "RobotType": len(robot_types),
            "RobotList": len(robot_list),
            "OperationProfile": len(operation_profiles),
        })

    except Exception as exc:  # noqa: BLE001
        summary["ok"] = False
        summary["warnings"].append(str(exc))
    finally:
        client.close()

    return summary
