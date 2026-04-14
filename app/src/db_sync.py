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


def _fetch_motion_rows(client: DBClient, table: str) -> list[dict[str, str]]:
    rows = client.read(
        f"SELECT name, description FROM `{table}` WHERE name IS NOT NULL AND name <> '' ORDER BY name"  # noqa: E501
    )
    out: list[dict[str, str]] = []
    for row in rows:
        name = str(row.get("name", "")).strip()
        if not name:
            continue
        out.append(
            {
                "value": name,
                "description": str(row.get("description", "")).strip(),
            }
        )
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
                    {"value": f"expressive_motion.{name}", "description": desc}
                    for name, desc in [
                        (r.get("value", ""), r.get("description", "")) for r in expressive_rows
                    ]
                    if name
                ]
                add_pose = [
                    {"value": f"pose_motion.{name}", "description": desc}
                    for name, desc in [
                        (r.get("value", ""), r.get("description", "")) for r in pose_rows
                    ]
                    if name
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

    except Exception as exc:  # noqa: BLE001
        summary["ok"] = False
        summary["warnings"].append(str(exc))
    finally:
        client.close()

    return summary
