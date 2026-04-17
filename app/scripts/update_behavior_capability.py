#!/usr/bin/env python3
"""Upsert BehaviorCapability rows from btInfo/BlockListRobot.json.

Actions listed in UPDATE_ONLY_ACTIONS already exist in the DB;
only their `parameter` column is updated.
All other actions are fully inserted (or updated on duplicate key).
"""
import argparse
import json
import sys
from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from src.db_lib import DBClient  # noqa: E402

UPDATE_ONLY_ACTIONS: frozenset[str] = frozenset(
    {
        "navigation/move_to_pose",
        "navigation/wait_move_finished",
        "motion/start_motion",
        "motion/wait_motion_finished",
        "navigation/move_in_direction",
        "navigation/stop_move",
        "navigation/rotate",
        "motion/stop_motion",
        "navigation/wait_move_finished_and_sleep",
    }
)

INSERT_SQL = """
INSERT INTO BehaviorCapability (name, category, type, robot_type, description, parameter)
VALUES (%s, %s, %s, %s, %s, %s)
ON DUPLICATE KEY UPDATE
  category    = VALUES(category),
  type        = VALUES(type),
  robot_type  = VALUES(robot_type),
  description = VALUES(description),
  parameter   = VALUES(parameter)
""".strip()

UPDATE_PARAM_SQL = """
UPDATE BehaviorCapability SET parameter = %s WHERE name = %s
""".strip()


def _load_json(path: Path) -> Any:
    if not path.exists():
        raise RuntimeError(f"File not found: {path}")
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise RuntimeError(f"Failed to parse JSON: {path}") from exc


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Upsert BehaviorCapability rows from BlockListRobot.json."
    )
    parser.add_argument(
        "--config",
        default=str(ROOT_DIR / "dbinfo.json"),
        help="Path to DB config JSON (default: app/dbinfo.json)",
    )
    parser.add_argument(
        "--blocklist",
        default=str(ROOT_DIR / "btInfo" / "BlockListRobot.json"),
        help="Path to BlockListRobot.json (default: app/btInfo/BlockListRobot.json)",
    )
    args = parser.parse_args()

    cfg_path = Path(args.config).resolve()
    blocklist_path = Path(args.blocklist).resolve()

    cfg: dict[str, Any] = _load_json(cfg_path)
    items: list[dict[str, Any]] = _load_json(blocklist_path)

    client = DBClient(cfg)
    try:
        upserted = 0
        updated = 0
        for item in items:
            action: str = item.get("action", "")
            parameters: str = json.dumps(item.get("parameters", []), ensure_ascii=False)

            if action in UPDATE_ONLY_ACTIONS:
                rows_affected = client.update(UPDATE_PARAM_SQL, (parameters, action))
                updated += rows_affected
                print(f"  [update ] {action}  ({rows_affected} row affected)")
            else:
                category: str = item.get("category", "").lower()
                description: str = item.get("description", "")
                rows_affected = client.execute(
                    INSERT_SQL,
                    (action, category, "primitive", "common", description, parameters),
                )
                upserted += 1
                print(f"  [upsert ] {action}  ({rows_affected} row affected)")

        print(f"\nDone — upserted: {upserted}, parameter-updated: {updated}")
        return 0
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    finally:
        client.close()


if __name__ == "__main__":
    raise SystemExit(main())
