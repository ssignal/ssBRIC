from typing import Any, Optional


class DBClient:
    """Small DB helper with minimal CRUD/query support for MySQL backends."""

    def __init__(self, config: dict[str, Any]):
        self.config = dict(config or {})
        self.conn = None
        self.backend = ""

    def connect(self):
        if self.conn is not None:
            return self.conn

        # Prefer PyMySQL. Fallback to mysql-connector-python if available.
        pymysql_import_error = None
        pymysql_connect_error = None
        mysql_connector_import_error = None
        mysql_connector_connect_error = None

        try:
            import pymysql  # type: ignore
        except ModuleNotFoundError as exc:
            pymysql_import_error = exc
        except Exception as exc:
            pymysql_import_error = exc
        else:
            try:
                self.conn = pymysql.connect(
                    host=self.config.get("host"),
                    port=int(self.config.get("port", 3306)),
                    user=self.config.get("user"),
                    password=self.config.get("password"),
                    database=self.config.get("database"),
                    charset="utf8mb4",
                    autocommit=True,
                    cursorclass=pymysql.cursors.DictCursor,
                )
                self.backend = "pymysql"
                return self.conn
            except Exception as exc:
                pymysql_connect_error = exc

        try:
            import mysql.connector  # type: ignore
        except Exception as exc:
            mysql_connector_import_error = exc
        else:
            try:
                self.conn = mysql.connector.connect(
                    host=self.config.get("host"),
                    port=int(self.config.get("port", 3306)),
                    user=self.config.get("user"),
                    password=self.config.get("password"),
                    database=self.config.get("database"),
                    autocommit=True,
                )
                self.backend = "mysql-connector"
                return self.conn
            except Exception as exc:
                mysql_connector_connect_error = exc

        if pymysql_import_error and mysql_connector_import_error:
            raise RuntimeError(
                "DB driver not available or DB connection failed. "
                "Install `PyMySQL` (recommended) or `mysql-connector-python`."
            ) from mysql_connector_import_error

        driver_errors = []
        if pymysql_connect_error is not None:
            driver_errors.append(f"PyMySQL: {pymysql_connect_error}")
        if mysql_connector_connect_error is not None:
            driver_errors.append(f"mysql-connector-python: {mysql_connector_connect_error}")

        details = "; ".join(driver_errors) if driver_errors else "No driver could establish a connection."  # noqa: E501
        raise RuntimeError(
            "DB connection failed with available MySQL driver(s). "
            "Check DB host/port/user/password/database settings. "
            f"Details: {details}"
        )

    def close(self):
        if self.conn is not None:
            try:
                self.conn.close()
            except Exception:
                pass
            self.conn = None

    def _cursor(self):
        conn = self.connect()
        cur = conn.cursor()
        return cur

    def fetch_all(self, sql: str, params: tuple[Any, ...] | None = None) -> list[dict[str, Any]]:
        cur = self._cursor()
        try:
            cur.execute(sql, params or ())
            rows = cur.fetchall()
            if rows is None:
                return []
            if isinstance(rows, list) and rows and not isinstance(rows[0], dict):
                cols = [d[0] for d in (cur.description or [])]
                return [dict(zip(cols, r, strict=False)) for r in rows]
            if isinstance(rows, list):
                return [dict(r) for r in rows]
            return []
        finally:
            try:
                cur.close()
            except Exception:
                pass

    def execute(self, sql: str, params: tuple[Any, ...] | None = None) -> int:
        cur = self._cursor()
        try:
            cur.execute(sql, params or ())
            rowcount = int(getattr(cur, "rowcount", 0) or 0)
            return rowcount
        finally:
            try:
                cur.close()
            except Exception:
                pass

    # CRUD convenience wrappers
    def create(self, sql: str, params: tuple[Any, ...] | None = None) -> int:
        return self.execute(sql, params)

    def read(self, sql: str, params: tuple[Any, ...] | None = None) -> list[dict[str, Any]]:
        return self.fetch_all(sql, params)

    def update(self, sql: str, params: tuple[Any, ...] | None = None) -> int:
        return self.execute(sql, params)

    def delete(self, sql: str, params: tuple[Any, ...] | None = None) -> int:
        return self.execute(sql, params)
