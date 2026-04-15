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
            for p in params:
                if not isinstance(p, dict) or str(p.get("name", "")) != "task_type":
                    continue
                options = p.get("options")
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
            display_name = str(row.get("display_name") or "").strip() or name
            out.append(
                {
                    "name": f"expressive_motion.{display_name}",
                    "data": {"task_type": "expressive_motion", "name": name, "repeat": 0},
                }
            )
    if pose_rows:
        for row in pose_rows:
            name = str(row.get("value", "")).strip()
            if not name:
                continue
            display_name = str(row.get("display_name") or "").strip() or name
            out.append(
                {
                    "name": f"pose_motion.{display_name}",
                    "data": {"task_type": "pose_motion", "name": name, "repeat": 0},
                }
            )
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
