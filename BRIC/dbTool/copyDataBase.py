import mysql.connector
from collections import defaultdict, deque

MYSQL_CONFIG = {
    "host": "10.231.180.140",
    "port": 36010,
    "user": "root",
    "password": "lge12345!@",
}

DB_SOURCE = "EasySetup"
DB_TARGET = ["EasySetupDevBRIC", "EasySetupDemoBRIC"]


def get_connection(database=None):
    return mysql.connector.connect(**MYSQL_CONFIG, database=database)


def get_tables(cursor, database):
    cursor.execute(
        "SELECT table_name FROM information_schema.tables "
        "WHERE table_schema = %s AND table_type = 'BASE TABLE'",
        (database,),
    )
    # Preserve order while removing any accidental duplicates.
    return list(dict.fromkeys(row[0] for row in cursor.fetchall()))


def get_tables_in_insert_order(cursor, database):
    tables = get_tables(cursor, database)
    table_set = set(tables)

    cursor.execute(
        """
        SELECT table_name, referenced_table_name
        FROM information_schema.key_column_usage
        WHERE table_schema = %s
          AND referenced_table_name IS NOT NULL
        """,
        (database,),
    )

    parent_to_children = defaultdict(set)
    indegree = {table: 0 for table in tables}

    for child_table, parent_table in cursor.fetchall():
        if child_table in table_set and parent_table in table_set:
            if child_table not in parent_to_children[parent_table]:
                parent_to_children[parent_table].add(child_table)
                indegree[child_table] += 1

    queue = deque(sorted([table for table in tables if indegree[table] == 0]))
    ordered_tables = []

    while queue:
        parent = queue.popleft()
        ordered_tables.append(parent)
        for child in sorted(parent_to_children[parent]):
            indegree[child] -= 1
            if indegree[child] == 0:
                queue.append(child)

    # Fallback for cycles/self-references: append remaining tables deterministically.
    if len(ordered_tables) != len(tables):
        remaining = sorted(
            [table for table in tables if table not in set(ordered_tables)]
        )
        ordered_tables.extend(remaining)

    return ordered_tables


def get_target_databases():
    targets = [db for db in DB_TARGET if db]
    if not targets:
        raise ValueError("DB_TARGET has no configured database names.")
    return targets


def select_command_interactive():
    print("Select command:")
    print("1. remove and copy")
    print("2. remove")
    print("3. copy")

    while True:
        choice = input("Enter command number (1-3): ").strip()
        if choice == "1":
            return "remove_and_copy"
        if choice == "2":
            return "remove"
        if choice == "3":
            return "copy"
        print("Invalid selection. Please choose 1, 2, or 3.")


def select_targets_interactive(targets):
    print("\nSelect target DB:")
    print("0. all")
    for idx, target in enumerate(targets, start=1):
        print(f"{idx}. {target}")

    while True:
        choice = input("Enter target number (e.g. 1) or comma list (e.g. 1,2): ").strip()
        if choice == "0":
            return targets

        selected = []
        valid = True
        for item in [part.strip() for part in choice.split(",") if part.strip()]:
            if not item.isdigit():
                valid = False
                break
            idx = int(item)
            if idx < 1 or idx > len(targets):
                valid = False
                break
            selected.append(targets[idx - 1])

        if valid and selected:
            # Deduplicate while preserving selection order.
            return list(dict.fromkeys(selected))

        print("Invalid selection. Choose from listed numbers, or 0 for all.")


def truncate_database_target(target_db):
    conn = get_connection(target_db)
    cursor = conn.cursor()

    cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

    tables = get_tables(cursor, target_db)
    for table in tables:
        cursor.execute(f"TRUNCATE TABLE `{table}`")

    cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
    conn.commit()

    cursor.close()
    conn.close()


def drop_all_tables_target(target_db):
    conn = get_connection(target_db)
    cursor = conn.cursor()

    cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

    tables = get_tables(cursor, target_db)
    for table in tables:
        cursor.execute(f"DROP TABLE `{table}`")

    cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
    conn.commit()

    cursor.close()
    conn.close()


def ensure_target_tables_exist(cursor, target_db):
    source_tables = get_tables(cursor, DB_SOURCE)
    target_tables = set(get_tables(cursor, target_db))

    for table in source_tables:
        if table not in target_tables:
            cursor.execute(f"CREATE TABLE `{target_db}`.`{table}` LIKE `{DB_SOURCE}`.`{table}`")


def copy_data_from_source_to_target(target_db):
    conn = get_connection()
    cursor = conn.cursor()

    ensure_target_tables_exist(cursor, target_db)
    tables = get_tables_in_insert_order(cursor, DB_SOURCE)
    processed_tables = set()

    # Preserve explicit id=0 values for AUTO_INCREMENT columns during copy.
    cursor.execute(
        """
        SET SESSION sql_mode = IF(
            @@SESSION.sql_mode = '',
            'NO_AUTO_VALUE_ON_ZERO',
            CONCAT(@@SESSION.sql_mode, ',NO_AUTO_VALUE_ON_ZERO')
        )
        """
    )
    cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

    for table in tables:
        if table in processed_tables:
            continue
        processed_tables.add(table)

        sql = f"""
        INSERT INTO `{target_db}`.`{table}`
        SELECT * FROM `{DB_SOURCE}`.`{table}`
        """
        cursor.execute(sql)

    cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
    conn.commit()
    cursor.close()
    conn.close()


def main():
    targets = get_target_databases()
    command = select_command_interactive()
    selected_targets = select_targets_interactive(targets)

    for target_db in selected_targets:
        print(f"🔹 Target DB: {target_db}")

        if command == "remove":
            print("🔹 Removing all tables from target...")
            drop_all_tables_target(target_db)

        if command == "remove_and_copy":
            print("🔹 Removing all tables from target...")
            drop_all_tables_target(target_db)

        if command in ("copy", "remove_and_copy"):
            print(f"🔹 Copying data from {DB_SOURCE} to {target_db}...")
            copy_data_from_source_to_target(target_db)

    print("✅ Requested command completed successfully.")


if __name__ == "__main__":
    main()
