#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="./app"
PORT_FILE="port"
DEST_ROOT="${HOME}/work/ROBO/BRIC_demo"
MODE="${1:-}"

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

print_usage() {
	echo "Usage: $0 [demo|update|launch]"
	echo "  demo   : update demo version (append test timestamp title)"
	echo "  update : update only (no title stamp)"
	echo "  launch : launch without update"
}

choose_mode() {
	if [ -n "${MODE}" ]; then
		case "${MODE}" in
		demo | update | launch)
			return
			;;
		-h | --help | help)
			print_usage
			exit 0
			;;
		*)
			echo "Error: invalid mode '${MODE}'" >&2
			print_usage
			exit 1
			;;
		esac
	fi

	echo "Select launch option:"
	echo "1) update demo version"
	echo "2) update"
	echo "3) launch without update"
	read -r -p "Enter choice [1-3]: " choice
	case "${choice}" in
	1) MODE="demo" ;;
	2) MODE="update" ;;
	3) MODE="launch" ;;
	*)
		echo "Error: invalid choice '${choice}'" >&2
		exit 1
		;;
	esac
}

choose_mode

echo "Mode: ${MODE}"
if [ "${MODE}" = "demo" ] || [ "${MODE}" = "update" ]; then
	if [ ! -d "${SRC_DIR}" ]; then
		echo "Error: source directory not found: ${SRC_DIR}" >&2
		exit 1
	fi

	echo "Remove the target folder: ${DEST_ROOT}"
	rm -rf "${DEST_ROOT}"
	echo "Copy the application source: ${SRC_DIR}"
	cp -rf "${SRC_DIR}" "${DEST_ROOT}"

	if [ "${MODE}" = "demo" ]; then
		echo "Append KST stamp in demo copy only: ${STAMP}"
		append_stamp_to_title "${DEST_ROOT}" "${STAMP}"
	else
		echo "Skip title stamp for update mode"
	fi
else
	if [ ! -d "${DEST_ROOT}" ]; then
		echo "Error: target directory not found for launch mode: ${DEST_ROOT}" >&2
		exit 1
	fi
	echo "Launch without update: keep existing files in ${DEST_ROOT}"
fi

cd "${DEST_ROOT}"
echo "Change the port number for release. 3000"
echo "3000" >"${PORT_FILE}"
echo "Launch the application"
exec python3 app.py
