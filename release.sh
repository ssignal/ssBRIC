#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="./app"
PORT_FILE="port"
DEST_ROOT="${HOME}/work/ROBO/BRIC_demo"
MODE="${1:-}"
SCENARIO_MODE="${2:-}"

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

backup_demo_scenarios() {
	local demo_root="$1"
	local backup_root="$2"
	local scenarios_dir="${demo_root}/data/scenarios"
	local scenarios_backup="${backup_root}/scenarios"

	if [ -d "${scenarios_dir}" ]; then
		echo "Backup saved scenarios: ${scenarios_dir}"
		cp -a "${scenarios_dir}" "${scenarios_backup}"
	else
		echo "No saved scenarios to backup: ${scenarios_dir}"
	fi
}

restore_demo_scenarios() {
	local demo_root="$1"
	local backup_root="$2"
	local scenarios_dir="${demo_root}/data/scenarios"
	local scenarios_backup="${backup_root}/scenarios"

	if [ -d "${scenarios_backup}" ]; then
		echo "Restore saved scenarios: ${scenarios_dir}"
		rm -rf "${scenarios_dir}"
		mkdir -p "$(dirname "${scenarios_dir}")"
		cp -a "${scenarios_backup}" "${scenarios_dir}"
	else
		echo "Skip restore: no scenario backup found"
	fi
}

STAMP="$(kst_stamp)"

print_usage() {
	echo "Usage: $0 [demo|update|launch] [keep|overwrite|remove]"
	echo "   or: $0 [1-7]"
	echo "  demo   : update demo version (append test timestamp title)"
	echo "  update : update only (no title stamp)"
	echo "  launch : launch without update"
	echo "  keep      : keep stored scenarios in target (backup and restore)"
	echo "  overwrite : overwrite stored scenarios with source scenarios"
	echo "  remove    : remove stored scenarios after update"
}

apply_selection_number() {
	local choice="$1"
	case "${choice}" in
	1)
		MODE="demo"
		SCENARIO_MODE="keep"
		;;
	2)
		MODE="demo"
		SCENARIO_MODE="overwrite"
		;;
	3)
		MODE="demo"
		SCENARIO_MODE="remove"
		;;
	4)
		MODE="update"
		SCENARIO_MODE="keep"
		;;
	5)
		MODE="update"
		SCENARIO_MODE="overwrite"
		;;
	6)
		MODE="update"
		SCENARIO_MODE="remove"
		;;
	7)
		MODE="launch"
		SCENARIO_MODE=""
		;;
	*)
		echo "Error: invalid choice '${choice}'" >&2
		exit 1
		;;
	esac
}

validate_mode_args() {
	if [ -n "${MODE}" ]; then
		case "${MODE}" in
		demo | update | launch)
			:
			;;
		1 | 2 | 3 | 4 | 5 | 6 | 7)
			apply_selection_number "${MODE}"
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
}

choose_numbered_selection() {
	echo "Select launch option:"
	echo "1) demo + keep stored scenarios"
	echo "2) demo + overwrite with source scenarios"
	echo "3) demo + remove stored scenarios"
	echo "4) update + keep stored scenarios"
	echo "5) update + overwrite with source scenarios"
	echo "6) update + remove stored scenarios"
	echo "7) launch without update"
	read -r -p "Enter choice [1-7]: " choice
	apply_selection_number "${choice}"
}

validate_mode_args

if [ -n "${MODE}" ] && [ "${MODE}" != "launch" ]; then
	if [ -n "${SCENARIO_MODE}" ]; then
		case "${SCENARIO_MODE}" in
		keep | overwrite | remove)
			:
			;;
		*)
			echo "Error: invalid scenario mode '${SCENARIO_MODE}'" >&2
			print_usage
			exit 1
			;;
		esac
	else
		choose_numbered_selection
	fi
elif [ -z "${MODE}" ]; then
	choose_numbered_selection
fi

echo "Mode: ${MODE}"
if [ "${MODE}" = "demo" ] || [ "${MODE}" = "update" ]; then
	SCENARIO_BACKUP_ROOT=""

	if [ ! -d "${SRC_DIR}" ]; then
		echo "Error: source directory not found: ${SRC_DIR}" >&2
		exit 1
	fi

	if [ "${SCENARIO_MODE}" = "keep" ]; then
		SCENARIO_BACKUP_ROOT="$(mktemp -d)"
		backup_demo_scenarios "${DEST_ROOT}" "${SCENARIO_BACKUP_ROOT}"
	fi

	echo "Remove the target folder: ${DEST_ROOT}"
	rm -rf "${DEST_ROOT}"
	echo "Copy the application source: ${SRC_DIR}"
	cp -rf "${SRC_DIR}" "${DEST_ROOT}"

	if [ "${SCENARIO_MODE}" = "keep" ]; then
		restore_demo_scenarios "${DEST_ROOT}" "${SCENARIO_BACKUP_ROOT}"
		rm -rf "${SCENARIO_BACKUP_ROOT}"
	elif [ "${SCENARIO_MODE}" = "remove" ]; then
		echo "Remove stored scenarios: ${DEST_ROOT}/data/scenarios"
		rm -rf "${DEST_ROOT}/data/scenarios"
		mkdir -p "${DEST_ROOT}/data/scenarios"
	else
		echo "Overwrite stored scenarios with source copy"
	fi

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
