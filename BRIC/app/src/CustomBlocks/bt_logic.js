const BLOCKS = [
  {
    "type": "bt_logic__fallback",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Fallback",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__ifthenelse",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "IfThenElse",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__parallel",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Parallel",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PARAMETER"
      },
      {
        "type": "field_label",
        "text": "parameter"
      },
      {
        "type": "field_input",
        "name": "PARAM_PARAMETER",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_THRESHOLD"
      },
      {
        "type": "field_label",
        "text": "threshold"
      },
      {
        "type": "field_input",
        "name": "PARAM_THRESHOLD",
        "text": "0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__pipelinesequence",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "PipelineSequence",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__pipelineselect",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "PipelineSelect",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_INDEX"
      },
      {
        "type": "field_label",
        "text": "index"
      },
      {
        "type": "field_input",
        "name": "PARAM_INDEX",
        "text": "1"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PARAMETER"
      },
      {
        "type": "field_label",
        "text": "parameter"
      },
      {
        "type": "field_input",
        "name": "PARAM_PARAMETER",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__reactivefallback",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "ReactiveFallback",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__reactivesequence",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "ReactiveSequence",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__recovery",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Recovery",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ATTEMPT"
      },
      {
        "type": "field_label",
        "text": "attempt"
      },
      {
        "type": "field_input",
        "name": "PARAM_ATTEMPT",
        "text": "0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PARAMETER"
      },
      {
        "type": "field_label",
        "text": "parameter"
      },
      {
        "type": "field_input",
        "name": "PARAM_PARAMETER",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__sequence",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Sequence",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__sequencestar",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "SequenceStar",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__delay",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Delay",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__forcesuccess",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "ForceSuccess",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__forcefailure",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "ForceFailure",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__inverse",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Inverse",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__loop",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Loop",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PARAMETER"
      },
      {
        "type": "field_label",
        "text": "parameter"
      },
      {
        "type": "field_input",
        "name": "PARAM_PARAMETER",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_REPEAT"
      },
      {
        "type": "field_label",
        "text": "repeat"
      },
      {
        "type": "field_input",
        "name": "PARAM_REPEAT",
        "text": "0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__retry",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Retry",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ATTEMPT"
      },
      {
        "type": "field_label",
        "text": "attempt"
      },
      {
        "type": "field_input",
        "name": "PARAM_ATTEMPT",
        "text": "0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PARAMETER"
      },
      {
        "type": "field_label",
        "text": "parameter"
      },
      {
        "type": "field_input",
        "name": "PARAM_PARAMETER",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__retryuntilsuccess",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "RetryUntilSuccess",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__repeat",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Repeat",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PARAMETER"
      },
      {
        "type": "field_label",
        "text": "parameter"
      },
      {
        "type": "field_input",
        "name": "PARAM_PARAMETER",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_REPEAT"
      },
      {
        "type": "field_label",
        "text": "repeat"
      },
      {
        "type": "field_input",
        "name": "PARAM_REPEAT",
        "text": "0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__timeout",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Timeout",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PARAMETER"
      },
      {
        "type": "field_label",
        "text": "parameter"
      },
      {
        "type": "field_input",
        "name": "PARAM_PARAMETER",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TIMEOUT"
      },
      {
        "type": "field_label",
        "text": "timeout"
      },
      {
        "type": "field_input",
        "name": "PARAM_TIMEOUT",
        "text": "1"
      }
    ],
    "colour": 35,
    "tooltip": "Not used",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_logic__whiledoelse",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "WhileDoElse",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ID"
      },
      {
        "type": "field_label",
        "text": "id"
      },
      {
        "type": "field_input",
        "name": "PARAM_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TICKRATE"
      },
      {
        "type": "field_label",
        "text": "tickrate"
      },
      {
        "type": "field_input",
        "name": "PARAM_TICKRATE",
        "text": "0"
      }
    ],
    "colour": 35,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "message1": "children %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILDREN",
        "check": "BTNode"
      }
    ]
  }
];
const BLOCK_TOOLTIPS = {
  "bt_logic__fallback": "",
  "bt_logic__ifthenelse": "",
  "bt_logic__parallel": "",
  "bt_logic__pipelinesequence": "",
  "bt_logic__pipelineselect": "",
  "bt_logic__reactivefallback": "",
  "bt_logic__reactivesequence": "",
  "bt_logic__recovery": "",
  "bt_logic__sequence": "",
  "bt_logic__sequencestar": "",
  "bt_logic__delay": "",
  "bt_logic__forcesuccess": "",
  "bt_logic__forcefailure": "",
  "bt_logic__inverse": "",
  "bt_logic__loop": "",
  "bt_logic__retry": "",
  "bt_logic__retryuntilsuccess": "",
  "bt_logic__repeat": "",
  "bt_logic__timeout": "Not used",
  "bt_logic__whiledoelse": ""
};
const PARAM_TOOLTIPS = {
  "bt_logic__fallback": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__ifthenelse": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__parallel": {
    "PARAM_ID": "",
    "PARAM_PARAMETER": "",
    "PARAM_THRESHOLD": "Number of child successes required to return success.",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__pipelinesequence": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__pipelineselect": {
    "PARAM_ID": "",
    "PARAM_INDEX": "1-based child index whose result decides the node result.",
    "PARAM_PARAMETER": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__reactivefallback": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__reactivesequence": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__recovery": {
    "PARAM_ATTEMPT": "Number of recovery attempts.",
    "PARAM_ID": "",
    "PARAM_PARAMETER": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__sequence": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__sequencestar": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__delay": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Delay time in milliseconds before the child is updated."
  },
  "bt_logic__forcesuccess": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__forcefailure": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__inverse": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__loop": {
    "PARAM_ID": "",
    "PARAM_PARAMETER": "",
    "PARAM_REPEAT": "Iteration count. 0 means infinite loop.",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__retry": {
    "PARAM_ATTEMPT": "Number of retry attempts.",
    "PARAM_ID": "",
    "PARAM_PARAMETER": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__retryuntilsuccess": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__repeat": {
    "PARAM_ID": "",
    "PARAM_PARAMETER": "",
    "PARAM_REPEAT": "Number of repetitions before returning success.",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__timeout": {
    "PARAM_ID": "",
    "PARAM_PARAMETER": "",
    "PARAM_TICKRATE": "Tick period in milliseconds.",
    "PARAM_TIMEOUT": "Timeout in milliseconds."
  },
  "bt_logic__whiledoelse": {
    "PARAM_ID": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  }
};

function registerBlocks_bt_logic() {
  Blockly.defineBlocksWithJsonArray(BLOCKS);
  Object.entries(BLOCK_TOOLTIPS).forEach(([blockType, tip]) => {
    const def = Blockly.Blocks[blockType];
    if (def) {
      const baseInit = def.init;
      def.init = function wrappedInit() {
        baseInit.call(this);
        this.setTooltip(tip || '');
        const perField = PARAM_TOOLTIPS[blockType] || {};
        Object.entries(perField).forEach(([fieldName, fieldTip]) => {
          const field = this.getField(fieldName);
          if (field && field.setTooltip) {
            field.setTooltip(fieldTip || '');
          }
          const helpField = this.getField('HELP_' + fieldName.replace('PARAM_', ''));
          if (helpField && helpField.setTooltip) {
            helpField.setTooltip(fieldTip || '');
          }
        });
      };
    }
  });
}

window.BRIC = window.BRIC || {};
window.BRIC.blockRegistrars = window.BRIC.blockRegistrars || [];
window.BRIC.blockRegistrars.push(registerBlocks_bt_logic);
