#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="./app"
PORT_FILE="port"
DEST_ROOT="${HOME}/work/ROBO/BRIC_demo"

if [ ! -d "${SRC_DIR}" ]; then
	echo "Error: source directory not found: ${SRC_DIR}" >&2
	exit 1
fi

cp -rf "${SRC_DIR}" "${DEST_ROOT}"

cd "${DEST_ROOT}"
echo "3000" >"${PORT_FILE}"
exec python3 app.py
