#!/usr/bin/env python3
import argparse
import json
import sys
from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from src.db_lib import DBClient  # noqa: E402
from src.db_sync import _fetch_motion_rows, _update_blocklist_robot  # noqa: E402


def _load_db_config(cfg_path: Path) -> dict[str, Any]:
    if not cfg_path.exists():
        raise RuntimeError(f"Missing DB config file: {cfg_path}")
    try:
        data = json.loads(cfg_path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise RuntimeError(f"Failed to parse DB config: {cfg_path}") from exc
    if not isinstance(data, dict):
        raise RuntimeError(f"Invalid DB config format: {cfg_path}")
    return data


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Test tool: update btInfo/BlockListRobot.json from DB motion tables."
    )
    parser.add_argument(
        "--config",
        default=str(ROOT_DIR / "dbinfo.json"),
        help="Path to DB config JSON (default: app/dbinfo.json)",
    )
    parser.add_argument(
        "--blocklist",
        default=str(ROOT_DIR / "btInfo" / "BlockListRobot.json"),
        help="Path to BlockListRobot.json",
    )
    args = parser.parse_args()

    cfg_path = Path(args.config).resolve()
    blocklist_path = Path(args.blocklist).resolve()

    client = None
    try:
        cfg = _load_db_config(cfg_path)
        client = DBClient(cfg)

        expressive_rows = _fetch_motion_rows(client, "MotionExpressive")
        pose_rows = _fetch_motion_rows(client, "MotionPose")

        changed = _update_blocklist_robot(blocklist_path, expressive_rows, pose_rows)
        print(f"MotionExpressive rows: {len(expressive_rows)}")
        print(f"MotionPose rows: {len(pose_rows)}")
        print(f"BlockList path: {blocklist_path}")
        print(f"Updated: {changed}")
        return 0
    except Exception as exc:
        print(f"Error: {exc}")
        return 1
    finally:
        if client is not None:
            client.close()


if __name__ == "__main__":
    raise SystemExit(main())
