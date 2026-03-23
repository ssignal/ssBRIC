#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="./app"
PORT_FILE="port"
DEST_ROOT="${HOME}/work/ROBO/BRIC_demo"

if [ ! -d "${SRC_DIR}" ]; then
	echo "Error: source directory not found: ${SRC_DIR}" >&2
	exit 1
fi

kst_stamp() {
	TZ=Asia/Seoul date '+%y%m%d-%H:%M'
}

append_stamp_to_title() {
	local app_dir="$1"
	local stamp="$2"
	local index_html="${app_dir}/templates/index.html"

	if [ ! -f "${index_html}" ]; then
		echo "Warning: title file not found: ${index_html}" >&2
		return
	fi

	# Append timestamp postfix to browser title and top menu title.
	sed -E -i \
		-e "s#(<title>)([^<]+)(</title>)#\\1\\2 (Test) ${stamp}\\3#" \
		-e "s#(id=\"brand-home\"[^>]*>)([^<]+)(</button>)#\\1\\2 (Test) ${stamp}\\3#" \
		"${index_html}"
}

STAMP="$(kst_stamp)"

echo "Remove the target folder: ${DEST_ROOT}"
rm -rf "${DEST_ROOT}"
echo "Copy the application source: ${SRC_DIR}"
cp -rf "${SRC_DIR}" "${DEST_ROOT}"

echo "Append KST stamp in demo copy only: ${STAMP}"
append_stamp_to_title "${DEST_ROOT}" "${STAMP}"

cd "${DEST_ROOT}"
echo "Change the port number for release. 3000"
echo "3000" >"${PORT_FILE}"
echo "Launch the application"
exec python3 app.py
