#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="./app"
PORT_FILE="port"
DEST_ROOT="${HOME}/work/ROBO/BRIC_demo"

if [ ! -d "${SRC_DIR}" ]; then
	echo "Error: source directory not found: ${SRC_DIR}" >&2
	exit 1
fi

echo "Remove the target folder: $DEST_ROOT"
rm -rf $DEST_ROOT
echo "Copy the application source: $SRC_DIR"
cp -rf "${SRC_DIR}" "${DEST_ROOT}"

cd "${DEST_ROOT}"
echo "Change the port number for release. 3000"
echo "3000" >"${PORT_FILE}"
echo "Launch the application"
exec python3 app.py
