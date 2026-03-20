(() => {
const BLOCKS = [
  {
    "type": "bt_logic__ifthenelse",
    "message0": "%1 %2 %3 %4 %5",
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
    "colour": "#1f77b4",
    "tooltip": "2개 또는 3개의 연결작업 지정 => 조건/ 조건 성공시 작업/ 조건 실패시 작업",
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
    "message0": "%1 %2 %3 %4 %5 %6 %7",
    "args0": [
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
    "colour": "#1f77b4",
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
    "colour": "#1f77b4",
    "tooltip": "연결된 작업이 실패할 경우, 지정된 횟수 만큼 작업 반복 실행.",
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
    "message0": "%1 %2 %3 %4",
    "args0": [
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
    "colour": "#1f77b4",
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
    "message0": "%1 %2 %3 %4 %5",
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
    "colour": "#1f77b4",
    "tooltip": "지정된 시간만큼 대기 후 연결된 작업 실행.",
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
    "message0": "%1 %2 %3 %4 %5",
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
    "colour": "#1f77b4",
    "tooltip": "연결된 작업의 결과를 모두 성공으로 처리.",
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
    "message0": "%1 %2 %3 %4 %5",
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
    "colour": "#1f77b4",
    "tooltip": "연결된 작업의 결과를 모두 실패로 처리.",
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
    "message0": "%1 %2 %3 %4 %5 %6 %7",
    "args0": [
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
    "colour": "#1f77b4",
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
    "message0": "%1 %2 %3 %4",
    "args0": [
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
    "colour": "#1f77b4",
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
    "message0": "%1 %2 %3 %4 %5 %6 %7",
    "args0": [
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
    "colour": "#1f77b4",
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
        "text": "Timeout",
        "name": "TITLE"
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
    "colour": "#1f77b4",
    "tooltip": "지정된 시간내에 연결된 작업 완료 되어야 성공.",
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
    "message0": "%1 %2 %3 %4 %5",
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
    "colour": "#1f77b4",
    "tooltip": "2개 또는 3개의 연결작업 지정 => 조건/ 조건 성공시 반복될 작업/ 조건 실패시 작업",
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
  "bt_logic__ifthenelse": "2개 또는 3개의 연결작업 지정 => 조건/ 조건 성공시 작업/ 조건 실패시 작업",
  "bt_logic__parallel": "",
  "bt_logic__recovery": "연결된 작업이 실패할 경우, 지정된 횟수 만큼 작업 반복 실행.",
  "bt_logic__sequence": "",
  "bt_logic__delay": "지정된 시간만큼 대기 후 연결된 작업 실행.",
  "bt_logic__forcesuccess": "연결된 작업의 결과를 모두 성공으로 처리.",
  "bt_logic__forcefailure": "연결된 작업의 결과를 모두 실패로 처리.",
  "bt_logic__loop": "",
  "bt_logic__retryuntilsuccess": "",
  "bt_logic__repeat": "",
  "bt_logic__timeout": "지정된 시간내에 연결된 작업 완료 되어야 성공.",
  "bt_logic__whiledoelse": "2개 또는 3개의 연결작업 지정 => 조건/ 조건 성공시 반복될 작업/ 조건 실패시 작업"
};
const PARAM_TOOLTIPS = {
  "bt_logic__ifthenelse": {
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__parallel": {
    "PARAM_THRESHOLD": "Number of child successes required to return success.",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__recovery": {
    "PARAM_ATTEMPT": "Number of recovery attempts.",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__sequence": {
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__delay": {
    "PARAM_TICKRATE": "Delay time in milliseconds before the child is updated."
  },
  "bt_logic__forcesuccess": {
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__forcefailure": {
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__loop": {
    "PARAM_REPEAT": "Iteration count. 0 means infinite loop.",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__retryuntilsuccess": {
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__repeat": {
    "PARAM_REPEAT": "Number of repetitions before returning success.",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_logic__timeout": {
    "PARAM_TICKRATE": "Tick period in milliseconds.",
    "PARAM_TIMEOUT": "Timeout in milliseconds."
  },
  "bt_logic__whiledoelse": {
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
})();
