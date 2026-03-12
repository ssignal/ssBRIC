#!/usr/bin/env python3
import argparse
import json
import subprocess
import sys
import os
from pathlib import Path

# JS wrapper to intercept console.log and other output methods
# so we can capture the JSON emitted by the script.
NODE_WRAPPER_TEMPLATE = """
const fs = require('fs');
const path = require('path');
const util = require('util');

// Override console methods to ensure we capture the output cleanly
const originalStdout = process.stdout.write.bind(process.stdout);

function logCapture(...args) {
    // We prefix our captured lines to distinguish them from other noise
    const msg = util.format(...args);
    originalStdout("__BT_CAPTURE__:" + msg + "\\n");
}

const sandbox = {
    console: {
        log: logCapture,
        info: logCapture,
        warn: logCapture,
        error: (...args) => process.stderr.write(util.format(...args) + "\\n"),
    },
    require: require,
    process: process,
    __dirname: path.dirname(__filename),
    __filename: __filename
};

// We will wrap the user code in a function or just run it.
// For simplicity, we just require the user's file, but since we want to
// capture its output which might be at top level, we can't just require it
// if it relies on global scope or specific console. 
// Instead, we'll read the file and run it.

const userScriptPath = process.argv[2];

try {
    const userCode = fs.readFileSync(userScriptPath, 'utf8');
    
    // We use vm to run it in a context if needed, or just eval if simple.
    // But 'generator.py' used vm. Let's stick to a simpler approach if possible,
    // or use vm if we want to isolate/mock console safely.
    
    const vm = require('vm');
    vm.createContext(sandbox);
    vm.runInContext(userCode, sandbox, { filename: userScriptPath });
} catch (err) {
    process.stderr.write(err.toString() + "\\n");
    process.exit(1);
}
"""

def main():
    parser = argparse.ArgumentParser(description="Generate Behavior Tree JSON from JavaScript.")
    parser.add_argument("input_file", help="Path to the input JavaScript file.")
    args = parser.parse_args()

    input_path = Path(args.input_file)
    if not input_path.exists():
        print(f"Error: Input file '{input_path}' not found.", file=sys.stderr)
        sys.exit(1)

    # Determine output path
    output_path = input_path.with_suffix('.json')

    # Create a temporary wrapper script
    import tempfile
    with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as wrapper_file:
        wrapper_file.write(NODE_WRAPPER_TEMPLATE)
        wrapper_path = wrapper_file.name

    try:
        # Run node with the wrapper and the input file
        result = subprocess.run(
            ["node", wrapper_path, str(input_path.resolve())],
            capture_output=True,
            text=True,
            check=False
        )

        if result.returncode != 0:
            print(f"Error running JavaScript:\n{result.stderr}", file=sys.stderr)
            sys.exit(result.returncode)

        # Parse output
        bt_nodes = []
        for line in result.stdout.splitlines():
            line = line.strip()
            if line.startswith("__BT_CAPTURE__:"):
                json_str = line[len("__BT_CAPTURE__:"):]
                try:
                    data = json.loads(json_str)
                    bt_nodes.append(data)
                except json.JSONDecodeError:
                    print(f"Warning: output was not valid JSON: {json_str}", file=sys.stderr)
        
        if not bt_nodes:
            print("Warning: No Behavior Tree nodes were captured.", file=sys.stderr)
            # Create an empty Sequence or similar if nothing captured?
            # Or just an empty object.
            final_tree = {"type": "Sequence", "children": []}
        elif len(bt_nodes) == 1:
            final_tree = bt_nodes[0]
        else:
            final_tree = {
                "type": "Sequence",
                "children": bt_nodes
            }

        # Write to output file
        with open(output_path, 'w') as f:
            json.dump(final_tree, f, indent=2)
        
        print(f"Generated Behavior Tree: {output_path}")

    finally:
        # Cleanup temp file
        if os.path.exists(wrapper_path):
            os.remove(wrapper_path)

if __name__ == "__main__":
    main()
