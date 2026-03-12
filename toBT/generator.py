#!/usr/bin/env python3

import argparse
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path


NODE_PREFIX = "__BT_NODE__:"

NODE_WRAPPER = r"""
const fs = require("fs");
const path = require("path");
const util = require("util");
const vm = require("vm");

const inputPath = process.argv[2];
const source = fs.readFileSync(inputPath, "utf8");

const capture = (...args) => {
  process.stdout.write("%s" + util.format(...args) + "\n");
};

const sandbox = {
  console: {
    log: capture,
    info: capture,
    debug: capture,
    warn: capture,
  },
  require,
  process,
  Buffer,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  setImmediate,
  clearImmediate,
  __dirname: path.dirname(inputPath),
  __filename: inputPath,
  module: { exports: {} },
  exports: {},
};

sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: inputPath });
""" % NODE_PREFIX


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a Behavior Tree JSON file from JavaScript output."
    )
    parser.add_argument("input_file", help="Path to the JavaScript source file.")
    parser.add_argument(
        "-o",
        "--output",
        help="Optional output JSON path. Defaults to the input file with a .json suffix.",
    )
    return parser.parse_args()


def output_path_for(input_path: Path, output_arg: str | None) -> Path:
    if output_arg:
        return Path(output_arg)
    return input_path.with_suffix(".json")


def normalize_source(source: str) -> str:
    normalized_lines: list[str] = []
    pattern = re.compile(r"^(\s*)(if|while)\s+(?!\()(.*\S)\s*$")

    for line in source.splitlines():
        match = pattern.match(line)
        if match:
            indent, keyword, condition = match.groups()
            normalized_lines.append(f"{indent}{keyword} ({condition})")
            continue

        normalized_lines.append(line)

    return "\n".join(normalized_lines) + ("\n" if source.endswith("\n") else "")


def run_javascript(input_path: Path) -> list[object]:
    source = normalize_source(input_path.read_text(encoding="utf-8"))

    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as source_handle:
        normalized_source_path = Path(source_handle.name)
        source_handle.write(source)

    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as handle:
        wrapper_path = Path(handle.name)
        handle.write(NODE_WRAPPER)

    try:
        completed = subprocess.run(
            ["node", str(wrapper_path), str(normalized_source_path)],
            capture_output=True,
            text=True,
            check=False,
        )
    finally:
        wrapper_path.unlink(missing_ok=True)
        normalized_source_path.unlink(missing_ok=True)

    if completed.returncode != 0:
        stderr = completed.stderr.strip() or "JavaScript execution failed."
        raise RuntimeError(stderr)

    nodes: list[object] = []
    for raw_line in completed.stdout.splitlines():
        if not raw_line.startswith(NODE_PREFIX):
            continue
        payload = raw_line[len(NODE_PREFIX) :].strip()
        if not payload:
            continue

        try:
            parsed = json.loads(payload)
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"Captured console output is not valid JSON: {payload}"
            ) from exc

        if isinstance(parsed, list):
            nodes.extend(parsed)
        else:
            nodes.append(parsed)

    if not nodes:
        raise ValueError(
            "No JSON nodes were captured. Ensure the JavaScript emits Behavior Tree nodes via console.log."
        )

    return nodes


def build_tree(nodes: list[object]) -> object:
    if len(nodes) == 1 and isinstance(nodes[0], dict):
        return nodes[0]

    return {
        "type": "Sequence",
        "children": nodes,
    }


def main() -> int:
    args = parse_args()
    input_path = Path(args.input_file).resolve()
    output_path = output_path_for(input_path, args.output).resolve()

    if not input_path.exists():
        print(f"Input file not found: {input_path}", file=sys.stderr)
        return 1

    try:
        nodes = run_javascript(input_path)
        tree = build_tree(nodes)
    except (RuntimeError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    output_path.write_text(json.dumps(tree, indent=2) + "\n", encoding="utf-8")
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
