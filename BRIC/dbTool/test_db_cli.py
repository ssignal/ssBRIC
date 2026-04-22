#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from typing import Any, Dict, List

# set ROOT_DIR with the current path.
ROOT_DIR = Path(__file__).resolve().parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from db_lib import DBClient


def _load_db_config() -> Dict[str, Any]:
    cfg_path = ROOT_DIR / "dbinfo.json"
    if not cfg_path.exists():
        raise RuntimeError(f"Missing DB config file: {cfg_path}")
    try:
        data = json.loads(cfg_path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise RuntimeError(f"Failed to parse DB config: {cfg_path}") from exc
    if not isinstance(data, dict):
        raise RuntimeError(f"Invalid DB config format: {cfg_path}")
    return data


def _prompt_table_choice(tables: List[str]) -> str:
    print("\nTables:")
    for idx, name in enumerate(tables, start=1):
        print(f"  {idx}. {name}")

    while True:
        raw = input("\nSelect table by number or name: ").strip()
        if not raw:
            print("Selection is required.")
            continue

        if raw.isdigit():
            pos = int(raw)
            if 1 <= pos <= len(tables):
                return tables[pos - 1]
            print(f"Invalid number. Enter 1..{len(tables)}.")
            continue

        if raw in tables:
            return raw

        print("Table not found. Enter a valid number or exact table name.")


def _prompt_limit(default: int = 20) -> int | None:
    raw = (
        input(f"Row limit (Enter for {default}, 'all' for no limit): ").strip().lower()
    )
    if not raw:
        return default
    if raw == "all":
        return None
    if raw.isdigit() and int(raw) >= 0:
        return int(raw)
    print(f"Invalid limit '{raw}'. Using default {default}.")
    return default


def main() -> int:
    try:
        cfg = _load_db_config()
        client = DBClient(cfg)
        tables_rows = client.read("SHOW TABLES")
        if not tables_rows:
            print("No tables found.")
            return 0

        # For SHOW TABLES, each row has one key with table name.
        tables: List[str] = []
        for row in tables_rows:
            if not isinstance(row, dict) or not row:
                continue
            table_name = str(next(iter(row.values()))).strip()
            if table_name:
                tables.append(table_name)

        if not tables:
            print("No tables found.")
            return 0

        selected = _prompt_table_choice(tables)
        limit = _prompt_limit(default=20)

        if limit is None:
            sql = f"SELECT * FROM `{selected}`"
        else:
            sql = f"SELECT * FROM `{selected}` LIMIT {limit}"

        rows = client.read(sql)
        print(f"\nSelected table: {selected}")
        print(f"Fetched rows: {len(rows)}")
        print(json.dumps(rows, ensure_ascii=False, indent=2))
        return 0
    except KeyboardInterrupt:
        print("\nCancelled.")
        return 130
    except Exception as exc:
        print(f"Error: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
