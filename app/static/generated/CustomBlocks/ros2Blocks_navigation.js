(() => {
const BLOCKS = [
  {
    "type": "behavior__navigation__bric_move_to_pose",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "move_to_pose",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_AREA"
      },
      {
        "type": "field_label",
        "text": "area"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_AREA",
        "options": [
          [
            "LG Digital Park P1",
            "LG Digital Park P1"
          ],
          [
            "LG sciencepark W02",
            "LG sciencepark W02"
          ],
          [
            "LG sciencepark W10",
            "LG sciencepark W10"
          ],
          [
            "LG Seocho R&D",
            "LG Seocho R&D"
          ],
          [
            "LG Seocho R&D Podium",
            "LG Seocho R&D Podium"
          ]
        ]
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_FLOOR"
      },
      {
        "type": "field_label",
        "text": "floor"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_FLOOR",
        "options": [
          [
            "1",
            "1"
          ],
          [
            "2",
            "2"
          ],
          [
            "3",
            "3"
          ],
          [
            "B1",
            "B1"
          ],
          [
            "B2",
            "B2"
          ],
          [
            "4",
            "4"
          ],
          [
            "5",
            "5"
          ],
          [
            "6",
            "6"
          ],
          [
            "7",
            "7"
          ],
          [
            "8",
            "8"
          ],
          [
            "9",
            "9"
          ],
          [
            "M",
            "M"
          ],
          [
            "10",
            "10"
          ],
          [
            "11",
            "11"
          ],
          [
            "12",
            "12"
          ],
          [
            "13",
            "13"
          ],
          [
            "14",
            "14"
          ],
          [
            "15",
            "15"
          ],
          [
            "16",
            "16"
          ],
          [
            "17",
            "17"
          ],
          [
            "18",
            "18"
          ],
          [
            "19",
            "19"
          ],
          [
            "20",
            "20"
          ],
          [
            "21",
            "21"
          ],
          [
            "22",
            "22"
          ],
          [
            "23",
            "23"
          ],
          [
            "24",
            "24"
          ],
          [
            "25",
            "25"
          ]
        ]
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_SESSION"
      },
      {
        "type": "field_label",
        "text": "session"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_SESSION",
        "options": [
          [
            "default",
            "default"
          ],
          [
            "elevator_AB",
            "elevator_AB"
          ],
          [
            "eleavor_CD",
            "eleavor_CD"
          ]
        ]
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_POI"
      },
      {
        "type": "field_label",
        "text": "poi"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_POI",
        "options": [
          [
            "LG sciencepark W02 › Hanging Rack",
            "Rack"
          ],
          [
            "LG sciencepark W02 › Self",
            "Shelf"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "Select area / floor / session / POI",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_get_angle_to_0",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "get_angle_to_0",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "map 좌표 기준 degree angle 0과 현재 좌표 angle과의 차이를 blackboard에 기록",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_get_current_pose",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "get_current_pose",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "현재 좌표 취득하여 blackboard에 기록. euler pose(x, y, z)로 기록.",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_move_in_direction",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "move_in_direction",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_DISTANCE"
      },
      {
        "type": "field_label",
        "text": "distance"
      },
      {
        "type": "field_input",
        "name": "PARAM_DISTANCE",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_VELOCITY"
      },
      {
        "type": "field_label",
        "text": "velocity"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_VELOCITY",
        "options": [
          [
            "0.00",
            "0.00"
          ],
          [
            "0.05",
            "0.05"
          ],
          [
            "0.10",
            "0.10"
          ],
          [
            "0.15",
            "0.15"
          ],
          [
            "0.20",
            "0.20"
          ],
          [
            "0.25",
            "0.25"
          ],
          [
            "0.30",
            "0.30"
          ],
          [
            "0.35",
            "0.35"
          ],
          [
            "0.40",
            "0.40"
          ],
          [
            "0.45",
            "0.45"
          ],
          [
            "0.50",
            "0.50"
          ],
          [
            "0.55",
            "0.55"
          ],
          [
            "0.60",
            "0.60"
          ],
          [
            "0.65",
            "0.65"
          ],
          [
            "0.70",
            "0.70"
          ],
          [
            "0.75",
            "0.75"
          ],
          [
            "0.80",
            "0.80"
          ],
          [
            "0.85",
            "0.85"
          ],
          [
            "0.90",
            "0.90"
          ],
          [
            "0.95",
            "0.95"
          ],
          [
            "1.00",
            "1.00"
          ]
        ]
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_DIRECTION"
      },
      {
        "type": "field_label",
        "text": "direction"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_DIRECTION",
        "options": [
          [
            "forward",
            "forward"
          ],
          [
            "backwards",
            "backwards"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "특정 방향으로 특정 거리를 이동하는 명령.\n이동 거리, 속도, 이동 방식을 지정해야 함",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_move_to_pose",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "move_to_pose",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_POSE_TYPE"
      },
      {
        "type": "field_label",
        "text": "pose_type"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_POSE_TYPE",
        "options": [
          [
            "map",
            "map"
          ],
          [
            "earth",
            "earth"
          ]
        ]
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_POSE_X"
      },
      {
        "type": "field_label",
        "text": "x"
      },
      {
        "type": "field_input",
        "name": "PARAM_POSE_X",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_POSE_Y"
      },
      {
        "type": "field_label",
        "text": "y"
      },
      {
        "type": "field_input",
        "name": "PARAM_POSE_Y",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_POSE_Z"
      },
      {
        "type": "field_label",
        "text": "z"
      },
      {
        "type": "field_input",
        "name": "PARAM_POSE_Z",
        "text": "0.0"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "특정 좌표로 이동 명령.\nx, y, z의 3차원 좌표계 사용.\n이동 방식에 대한 behavior tree를 지정할 수 있으며, 미지정 시 navigation 엔진의 기본값 사용",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_rotate",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "rotate",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ANGLE"
      },
      {
        "type": "field_label",
        "text": "angle"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_ANGLE",
        "options": [
          [
            "-180.00",
            "-180.00"
          ],
          [
            "-162.00",
            "-162.00"
          ],
          [
            "-144.00",
            "-144.00"
          ],
          [
            "-126.00",
            "-126.00"
          ],
          [
            "-108.00",
            "-108.00"
          ],
          [
            "-90.00",
            "-90.00"
          ],
          [
            "-72.00",
            "-72.00"
          ],
          [
            "-54.00",
            "-54.00"
          ],
          [
            "-36.00",
            "-36.00"
          ],
          [
            "-18.00",
            "-18.00"
          ],
          [
            "0.00",
            "0.00"
          ],
          [
            "18.00",
            "18.00"
          ],
          [
            "36.00",
            "36.00"
          ],
          [
            "54.00",
            "54.00"
          ],
          [
            "72.00",
            "72.00"
          ],
          [
            "90.00",
            "90.00"
          ],
          [
            "108.00",
            "108.00"
          ],
          [
            "126.00",
            "126.00"
          ],
          [
            "144.00",
            "144.00"
          ],
          [
            "162.00",
            "162.00"
          ],
          [
            "180.00",
            "180.00"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "제자리 회전 기능.\ndegree 단위로 회전 각도를 지정.",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_stop_move",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "stop_move",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "주행 동작을 강제 종료",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_wait_move_finished",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "wait_move_finished",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "이동 주행의 완료 여부 확인.\n주행이 완료되면 success를 return.\n주행이 실패하면 failure를 return.\n주행 중에는 return 되는 것 없음",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_wait_move_finished_and_sleep",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "wait_move_finished_and_sleep",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "navigation/wait_move_finished가 정상 종료되면 500ms 대기",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__navigation__bric_move_to_pose": "Select area / floor / session / POI",
  "behavior__navigation__navigation_get_angle_to_0": "map 좌표 기준 degree angle 0과 현재 좌표 angle과의 차이를 blackboard에 기록",
  "behavior__navigation__navigation_get_current_pose": "현재 좌표 취득하여 blackboard에 기록. euler pose(x, y, z)로 기록.",
  "behavior__navigation__navigation_move_in_direction": "특정 방향으로 특정 거리를 이동하는 명령.\n이동 거리, 속도, 이동 방식을 지정해야 함",
  "behavior__navigation__navigation_move_to_pose": "특정 좌표로 이동 명령.\nx, y, z의 3차원 좌표계 사용.\n이동 방식에 대한 behavior tree를 지정할 수 있으며, 미지정 시 navigation 엔진의 기본값 사용",
  "behavior__navigation__navigation_rotate": "제자리 회전 기능.\ndegree 단위로 회전 각도를 지정.",
  "behavior__navigation__navigation_stop_move": "주행 동작을 강제 종료",
  "behavior__navigation__navigation_wait_move_finished": "이동 주행의 완료 여부 확인.\n주행이 완료되면 success를 return.\n주행이 실패하면 failure를 return.\n주행 중에는 return 되는 것 없음",
  "behavior__navigation__navigation_wait_move_finished_and_sleep": "navigation/wait_move_finished가 정상 종료되면 500ms 대기"
};
const PARAM_TOOLTIPS = {
  "behavior__navigation__bric_move_to_pose": {
    "PARAM_AREA": "Area",
    "PARAM_FLOOR": "Floor",
    "PARAM_SESSION": "Session",
    "PARAM_POI": "Point of Interest"
  },
  "behavior__navigation__navigation_get_angle_to_0": {},
  "behavior__navigation__navigation_get_current_pose": {},
  "behavior__navigation__navigation_move_in_direction": {
    "PARAM_DISTANCE": "Distance to move from the current position (meter unit)",
    "PARAM_VELOCITY": "Movement velocity (m/s unit)",
    "PARAM_DIRECTION": "Direction to move"
  },
  "behavior__navigation__navigation_move_to_pose": {
    "PARAM_POSE_TYPE": "map (indoor), earth (outdoor)",
    "PARAM_POSE_X": "Euler pose x",
    "PARAM_POSE_Y": "Euler pose y",
    "PARAM_POSE_Z": "Euler pose z (degree unit)"
  },
  "behavior__navigation__navigation_rotate": {
    "PARAM_ANGLE": "Rotation angle (degree unit)"
  },
  "behavior__navigation__navigation_stop_move": {},
  "behavior__navigation__navigation_wait_move_finished": {},
  "behavior__navigation__navigation_wait_move_finished_and_sleep": {}
};
const OPTION_PARAM_MAP = {
  "behavior__navigation__bric_move_to_pose": {},
  "behavior__navigation__navigation_get_angle_to_0": {},
  "behavior__navigation__navigation_get_current_pose": {},
  "behavior__navigation__navigation_move_in_direction": {},
  "behavior__navigation__navigation_move_to_pose": {},
  "behavior__navigation__navigation_rotate": {},
  "behavior__navigation__navigation_stop_move": {},
  "behavior__navigation__navigation_wait_move_finished": {},
  "behavior__navigation__navigation_wait_move_finished_and_sleep": {}
};
const OPTION_TOOLTIPS = {
  "behavior__navigation__bric_move_to_pose": {
    "PARAM_AREA": {
      "LG Digital Park P1": "",
      "LG sciencepark W02": "",
      "LG sciencepark W10": "",
      "LG Seocho R&D": "",
      "LG Seocho R&D Podium": ""
    },
    "PARAM_FLOOR": {
      "1": "",
      "2": "",
      "3": "",
      "B1": "",
      "B2": "",
      "4": "",
      "5": "",
      "6": "",
      "7": "",
      "8": "",
      "9": "",
      "M": "",
      "10": "",
      "11": "",
      "12": "",
      "13": "",
      "14": "",
      "15": "",
      "16": "",
      "17": "",
      "18": "",
      "19": "",
      "20": "",
      "21": "",
      "22": "",
      "23": "",
      "24": "",
      "25": ""
    },
    "PARAM_SESSION": {
      "default": "",
      "elevator_AB": "",
      "eleavor_CD": ""
    },
    "PARAM_POI": {
      "Rack": "LG Sciencepart W10 2F in front of hanging rack",
      "LG sciencepark W02 › Hanging Rack": "LG Sciencepart W02 2F in front of hanging rack",
      "Shelf": "LG Sciencepart W10 2F In front of shelf",
      "LG sciencepark W02 › Self": "LG Sciencepart W02 2F In front of shelf",
      "LG sciencepark W10 › Hanging Rack": "LG Sciencepart W10 2F in front of hanging rack",
      "LG sciencepark W10 › Self": "LG Sciencepart W10 2F In front of shelf"
    }
  },
  "behavior__navigation__navigation_get_angle_to_0": {},
  "behavior__navigation__navigation_get_current_pose": {},
  "behavior__navigation__navigation_move_in_direction": {
    "PARAM_DIRECTION": {
      "forward": "Move forward",
      "backwards": "Move backwards"
    }
  },
  "behavior__navigation__navigation_move_to_pose": {
    "PARAM_POSE_TYPE": {
      "map": "Indoor map frame",
      "earth": "Outdoor earth frame"
    }
  },
  "behavior__navigation__navigation_rotate": {},
  "behavior__navigation__navigation_stop_move": {},
  "behavior__navigation__navigation_wait_move_finished": {},
  "behavior__navigation__navigation_wait_move_finished_and_sleep": {}
};
const BLOCK_PROFILE = {
  "behavior__navigation__navigation_move_in_direction": {
    "robot_type": "cloid",
    "operation_profile": ""
  }
};
const OPTION_PROFILE_META = {};
const HELP_ICON = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>";

function setClickHelp(field, text) {
  if (!field) return;
  if (field.setTooltip) field.setTooltip('');
  if (!text) return;
  const msg = String(text);

  function ensureHelpPopup() {
    window.BRIC = window.BRIC || {};
    let el = window.BRIC.helpPopupEl || document.querySelector('.blocklyTooltipDiv');
    if (!el) {
      el = document.createElement('div');
      el.className = 'blocklyTooltipDiv';
      document.body.appendChild(el);
    }
    window.BRIC.helpPopupEl = el;
    if (!window.BRIC.hideHelpPopup) {
      window.BRIC.hideHelpPopup = () => {
        el.style.display = 'none';
        window.BRIC.helpPopupAnchor = null;
      };
    }
    if (!window.BRIC.helpPopupBound) {
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') window.BRIC.hideHelpPopup();
      });
      document.addEventListener('click', (evt) => {
        const anchor = window.BRIC.helpPopupAnchor;
        if (!anchor) return;
        if (el.contains(evt.target)) return;
        if (anchor.contains && anchor.contains(evt.target)) return;
        window.BRIC.hideHelpPopup();
      }, true);
      window.BRIC.helpPopupBound = true;
    }
    return el;
  }

  function showHelpPopup(anchor, text) {
    if (!text) return;
    const sourceBlock = field.getSourceBlock ? field.getSourceBlock() : null;
    const blockType = sourceBlock && sourceBlock.type ? String(sourceBlock.type) : '';
    const isFunctionBlock = blockType.startsWith('bt_function__') || blockType.startsWith('procedures_');
    let frameColor = (sourceBlock && sourceBlock.getColour && sourceBlock.getColour()) || '#4a67c8';
    if (/^\d+(?:\.\d+)?$/.test(String(frameColor)) && Blockly.utils && Blockly.utils.colour && Blockly.utils.colour.hsvToHex) {
      frameColor = Blockly.utils.colour.hsvToHex(Number(frameColor), 0.45, 0.72);
    }
    const framePx = isFunctionBlock ? 1 : 2;
    const innerBg = '#e7e5b8';
    const popup = ensureHelpPopup();
    const rect = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
    popup.className = 'blocklyTooltipDiv bricHelpPopup';
    popup.style.background = 'transparent';
    popup.style.border = 'none';
    popup.style.padding = '0';
    popup.style.pointerEvents = 'none';

    let body = popup.querySelector('.bricHelpBody');
    let tailOuter = popup.querySelector('.bricHelpTailOuter');
    let tailInner = popup.querySelector('.bricHelpTailInner');
    if (!body) {
      body = document.createElement('div');
      body.className = 'bricHelpBody';
      popup.appendChild(body);
    }
    if (!tailOuter) {
      tailOuter = document.createElement('div');
      tailOuter.className = 'bricHelpTailOuter';
      popup.appendChild(tailOuter);
    }
    if (!tailInner) {
      tailInner = document.createElement('div');
      tailInner.className = 'bricHelpTailInner';
      popup.appendChild(tailInner);
    }

    body.textContent = String(text);
    body.style.background = innerBg;
    body.style.border = `${framePx}px solid ${frameColor}`;
    body.style.borderRadius = '5px';
    body.style.padding = '8px 10px';
    body.style.color = '#1f1f1f';
    body.style.boxShadow = `${framePx}px ${framePx}px 0 0 ${frameColor}`;
    body.style.fontWeight = '500';
    body.style.lineHeight = '1.35';
    body.style.maxWidth = '280px';
    body.style.whiteSpace = 'pre-wrap';

    tailOuter.style.position = 'absolute';
    tailOuter.style.left = '18px';
    tailOuter.style.top = 'calc(100% - 1px)';
    tailOuter.style.width = '0';
    tailOuter.style.height = '0';
    tailOuter.style.borderLeft = '10px solid transparent';
    tailOuter.style.borderRight = '10px solid transparent';
    tailOuter.style.borderTop = `10px solid ${frameColor}`;

    tailInner.style.position = 'absolute';
    tailInner.style.left = '20px';
    tailInner.style.top = 'calc(100% - 2px)';
    tailInner.style.width = '0';
    tailInner.style.height = '0';
    tailInner.style.borderLeft = '8px solid transparent';
    tailInner.style.borderRight = '8px solid transparent';
    tailInner.style.borderTop = `8px solid ${innerBg}`;
    tailInner.style.marginTop = '0';

    popup.style.display = 'block';
    if (rect) {
      const maxLeft = window.innerWidth - popup.offsetWidth - 8;
      let left = Math.min(rect.left - 10, maxLeft);
      if (left < 8) left = 8;
      const aboveTop = rect.top - popup.offsetHeight - 12;
      const belowTop = rect.bottom + 10;
      let top = aboveTop;
      if (top < 8) top = Math.min(belowTop, window.innerHeight - popup.offsetHeight - 8);
      popup.style.left = `${Math.round(left)}px`;
      popup.style.top = `${Math.round(top)}px`;
    } else {
      popup.style.left = '12px';
      popup.style.top = '12px';
    }
    window.BRIC.helpPopupAnchor = anchor || null;
  }

  const onClick = () => {
    const anchor = field.getClickTarget_ ? field.getClickTarget_() : null;
    showHelpPopup(anchor, msg);
  };
  if (field.setOnClickHandler) {
    field.setOnClickHandler(onClick);
    return;
  }
  if (field.getClickTarget_) {
    const target = field.getClickTarget_();
    if (target && target.addEventListener) {
      target.addEventListener('click', onClick);
    }
  }
}

function setHoverOptionHelp(field, optionDescriptions) {
  if (!field) return;
  const byValue = optionDescriptions || {};
  if (!Object.keys(byValue).length) return;
  field.__bricOptionDescriptions = byValue;

  function ensureHelpPopup() {
    window.BRIC = window.BRIC || {};
    let el = window.BRIC.helpPopupEl || document.querySelector('.blocklyTooltipDiv');
    if (!el) {
      el = document.createElement('div');
      el.className = 'blocklyTooltipDiv';
      document.body.appendChild(el);
    }
    window.BRIC.helpPopupEl = el;
    if (!window.BRIC.hideHelpPopup) {
      window.BRIC.hideHelpPopup = () => {
        el.style.display = 'none';
        window.BRIC.helpPopupAnchor = null;
      };
    }
    return el;
  }

  function showHelp(anchor, msg) {
    if (!msg) return;
    const sourceBlock = field.getSourceBlock ? field.getSourceBlock() : null;
    const blockType = sourceBlock && sourceBlock.type ? String(sourceBlock.type) : '';
    const isFunctionBlock = blockType.startsWith('bt_function__') || blockType.startsWith('procedures_');
    let frameColor = (sourceBlock && sourceBlock.getColour && sourceBlock.getColour()) || '#4a67c8';
    if (/^\d+(?:\.\d+)?$/.test(String(frameColor)) && Blockly.utils && Blockly.utils.colour && Blockly.utils.colour.hsvToHex) {
      frameColor = Blockly.utils.colour.hsvToHex(Number(frameColor), 0.45, 0.72);
    }
    const framePx = isFunctionBlock ? 1 : 2;
    const innerBg = '#e7e5b8';
    const popup = ensureHelpPopup();
    const rect = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
    popup.className = 'blocklyTooltipDiv bricHelpPopup';
    popup.style.background = 'transparent';
    popup.style.border = 'none';
    popup.style.padding = '0';
    popup.style.pointerEvents = 'none';

    let body = popup.querySelector('.bricHelpBody');
    let tailOuter = popup.querySelector('.bricHelpTailOuter');
    let tailInner = popup.querySelector('.bricHelpTailInner');
    if (!body) {
      body = document.createElement('div');
      body.className = 'bricHelpBody';
      popup.appendChild(body);
    }
    if (!tailOuter) {
      tailOuter = document.createElement('div');
      tailOuter.className = 'bricHelpTailOuter';
      popup.appendChild(tailOuter);
    }
    if (!tailInner) {
      tailInner = document.createElement('div');
      tailInner.className = 'bricHelpTailInner';
      popup.appendChild(tailInner);
    }

    body.textContent = String(msg);
    body.style.background = innerBg;
    body.style.border = `${framePx}px solid ${frameColor}`;
    body.style.borderRadius = '5px';
    body.style.padding = '8px 10px';
    body.style.color = '#1f1f1f';
    body.style.boxShadow = `${framePx}px ${framePx}px 0 0 ${frameColor}`;
    body.style.fontWeight = '500';
    body.style.lineHeight = '1.35';
    body.style.maxWidth = '280px';
    body.style.whiteSpace = 'pre-wrap';

    tailOuter.style.position = 'absolute';
    tailOuter.style.left = '18px';
    tailOuter.style.top = 'calc(100% - 1px)';
    tailOuter.style.width = '0';
    tailOuter.style.height = '0';
    tailOuter.style.borderLeft = '10px solid transparent';
    tailOuter.style.borderRight = '10px solid transparent';
    tailOuter.style.borderTop = `10px solid ${frameColor}`;

    tailInner.style.position = 'absolute';
    tailInner.style.left = '20px';
    tailInner.style.top = 'calc(100% - 2px)';
    tailInner.style.width = '0';
    tailInner.style.height = '0';
    tailInner.style.borderLeft = '8px solid transparent';
    tailInner.style.borderRight = '8px solid transparent';
    tailInner.style.borderTop = `8px solid ${innerBg}`;
    tailInner.style.marginTop = '0';

    popup.style.display = 'block';
    if (rect) {
      const maxLeft = window.innerWidth - popup.offsetWidth - 8;
      let left = Math.min(rect.left - 10, maxLeft);
      if (left < 8) left = 8;
      const aboveTop = rect.top - popup.offsetHeight - 12;
      const belowTop = rect.bottom + 10;
      let top = aboveTop;
      if (top < 8) top = Math.min(belowTop, window.innerHeight - popup.offsetHeight - 8);
      popup.style.left = `${Math.round(left)}px`;
      popup.style.top = `${Math.round(top)}px`;
    } else {
      popup.style.left = '12px';
      popup.style.top = '12px';
    }
    window.BRIC.helpPopupAnchor = anchor || null;
  }

  const target = field.getClickTarget_ ? field.getClickTarget_() : null;
  const showSelected = () => {
    const currentMap = field.__bricOptionDescriptions || {};
    const value = field.getValue ? String(field.getValue() || '') : '';
    const msg = currentMap[value] || '';
    if (!msg) {
      if (window.BRIC && window.BRIC.helpPopupAnchor === target && window.BRIC.hideHelpPopup) {
        window.BRIC.hideHelpPopup();
      }
      return;
    }
    showHelp(target, msg);
  };
  const hide = () => {
    if (window.BRIC && window.BRIC.helpPopupAnchor === target && window.BRIC.hideHelpPopup) {
      window.BRIC.hideHelpPopup();
    }
  };

  if (target && !target.__bricOptionHelpBound) {
    target.addEventListener('mouseenter', showSelected);
    target.addEventListener('mousemove', showSelected);
    target.addEventListener('mouseleave', hide);
    target.__bricOptionHelpBound = true;
  }

  if (typeof field.showEditor_ === 'function' && !field.__bricShowEditorWrapped) {
    const baseShowEditor = field.showEditor_.bind(field);
    field.showEditor_ = function(...args) {
      const result = baseShowEditor(...args);
      window.BRIC = window.BRIC || {};
      window.BRIC.activeOptionHelpField = field;

      window.setTimeout(() => {
        const dropdownDiv = document.querySelector('.blocklyDropDownDiv');
        if (!dropdownDiv) return;
        if (dropdownDiv.__bricOptionMenuHelpBound) return;

        const findMenuItem = (node) => {
          if (!node || !node.closest) return null;
          return node.closest('.goog-menuitem, .blocklyMenuItem');
        };
        const valueFromMenuItem = (itemEl) => {
          if (!itemEl) return '';
          const dataValue = itemEl.getAttribute('data-value') || (itemEl.dataset && itemEl.dataset.value);
          if (dataValue != null && String(dataValue).trim()) return String(dataValue).trim();
          return String(itemEl.textContent || '').trim();
        };

        dropdownDiv.addEventListener('mousemove', (evt) => {
          const itemEl = findMenuItem(evt.target);
          const activeField = window.BRIC && window.BRIC.activeOptionHelpField;
          const currentMap = (activeField && activeField.__bricOptionDescriptions) || {};
          if (!itemEl) return;
          const value = valueFromMenuItem(itemEl);
          const msg = currentMap[value] || '';
          if (!msg) {
            if (window.BRIC && window.BRIC.helpPopupAnchor === itemEl && window.BRIC.hideHelpPopup) {
              window.BRIC.hideHelpPopup();
            }
            return;
          }
          showHelp(itemEl, msg);
        });

        dropdownDiv.addEventListener('mouseleave', () => {
          if (window.BRIC && window.BRIC.hideHelpPopup) {
            window.BRIC.hideHelpPopup();
          }
        });

        dropdownDiv.addEventListener('click', () => {
          if (window.BRIC && window.BRIC.hideHelpPopup) {
            window.BRIC.hideHelpPopup();
          }
        });

        dropdownDiv.__bricOptionMenuHelpBound = true;
      }, 0);
      return result;
    };
    field.__bricShowEditorWrapped = true;
  }
}

function snapshotFieldValues(block) {
  const out = {};
  (block.inputList || []).forEach((input) => {
    (input.fieldRow || []).forEach((field) => {
      if (!field || !field.name) return;
      try {
        out[field.name] = block.getFieldValue(field.name);
      } catch (err) {
        // Ignore unsupported fields.
      }
    });
  });
  return out;
}

function clearDynamicOptionInputs(block) {
  const names = (block.inputList || [])
    .map((input) => input && input.name)
    .filter((name) => typeof name === 'string' && name.startsWith('OPT_DYN_'));
  names.forEach((name) => block.removeInput(name, true));
}

function appendOptionDefs(block, defs, priorValues, tokenRef, triggerFields) {
  (defs || []).forEach((meta) => {
    tokenRef.v += 1;
    const inputName = 'OPT_DYN_' + tokenRef.v;
    const input = block.appendDummyInput(inputName);
    const helpFieldName = 'HELP_' + meta.field;
    const hasHelp = !!String(meta.description || '').trim();
    if (hasHelp) {
      input.appendField(new Blockly.FieldImage(HELP_ICON, 16, 16, '?'), helpFieldName);
    }
    input.appendField(String(meta.name || 'param'));

    const prior = priorValues[meta.field];
    let filteredOptions = meta.options;
    if (Array.isArray(filteredOptions) && filteredOptions.length) {
      const profile = (window.BRIC && typeof window.BRIC.getActiveProfile === 'function')
        ? window.BRIC.getActiveProfile() : {};
      const activeRt = profile.robot_type || '';
      const activeOp = profile.operation_profile || '';
      if (activeRt && meta.option_robot_types) {
        const rt_map = meta.option_robot_types;
        // Keep options where robot_type is empty/common OR matches activeRt.
        // Always apply filter — empty result means no options for this robot type.
        filteredOptions = filteredOptions.filter(([, val]) => { const rt = rt_map[val] || ''; return !rt || rt === activeRt; });
      }
      if (activeOp && meta.option_operation_profiles) {
        const op_map = meta.option_operation_profiles;
        filteredOptions = filteredOptions.filter(([, val]) => { const op = op_map[val] || ''; return !op || op === activeOp; });
      }
      // Use a placeholder when all options were filtered out so the dropdown stays valid.
      if (!filteredOptions.length) {
        filteredOptions = [['---', '_']];
      }
    }
    if (Array.isArray(filteredOptions) && filteredOptions.length) {
      input.appendField(new Blockly.FieldDropdown(filteredOptions), meta.field);
      const nextValue = prior != null ? String(prior) : (meta.default == null ? '' : String(meta.default));
      if (nextValue) {
        try {
          block.setFieldValue(nextValue, meta.field);
        } catch (err) {
          // Ignore when value is outside dropdown options.
        }
      }
    } else {
      const txt = prior != null ? String(prior) : (meta.default == null ? '' : String(meta.default));
      input.appendField(new Blockly.FieldTextInput(txt), meta.field);
    }

    const field = block.getField(meta.field);
    setHoverOptionHelp(field, meta.option_descriptions || {});
    if (hasHelp) {
      const helpField = block.getField(helpFieldName);
      setClickHelp(helpField, meta.description || '');
    }

    const selected = block.getFieldValue(meta.field) || '';
    const nested = ((meta.option_parameters || {})[selected]) || [];
    if (meta.option_parameters && Object.keys(meta.option_parameters).length) {
      triggerFields.add(meta.field);
    }
    if (nested.length) {
      appendOptionDefs(block, nested, priorValues, tokenRef, triggerFields);
    }
  });
}

function rerenderOptionParams(block, blockType) {
  const byField = OPTION_PARAM_MAP[blockType] || {};
  const rootParents = Object.keys(byField);
  if (!rootParents.length) return;

  const priorValues = snapshotFieldValues(block);
  clearDynamicOptionInputs(block);
  const tokenRef = { v: 0 };
  const triggerFields = new Set(rootParents);
  rootParents.forEach((parentField) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = (byField[parentField] || {})[selected] || [];
    appendOptionDefs(block, defs, priorValues, tokenRef, triggerFields);
  });
  block.__optionTriggerFields = triggerFields;
  if (block.render) block.render();
}

function registerBlocks_ros2blocks_navigation() {
  Blockly.defineBlocksWithJsonArray(BLOCKS);
  Object.entries(BLOCK_TOOLTIPS).forEach(([blockType, tip]) => {
    const def = Blockly.Blocks[blockType];
    if (def) {
      const baseInit = def.init;
      def.init = function wrappedInit() {
        baseInit.call(this);
        this.setTooltip('');
        setClickHelp(this.getField('HELP'), tip || '');
        const perField = PARAM_TOOLTIPS[blockType] || {};
        const perOptionField = OPTION_TOOLTIPS[blockType] || {};
        Object.entries(perField).forEach(([fieldName, fieldTip]) => {
          const field = this.getField(fieldName);
          setHoverOptionHelp(field, perOptionField[fieldName] || {});
          const helpField = this.getField('HELP_' + fieldName.replace('PARAM_', ''));
          setClickHelp(helpField, fieldTip || '');
        });

        const optionParents = Object.keys(OPTION_PARAM_MAP[blockType] || {});
        rerenderOptionParams(this, blockType);
        this.__bricRerenderOptionParams = () => {
          rerenderOptionParams(this, blockType);
        };
        this.setOnChange((event) => {
          if (!event || event.isUiEvent) return;
          if (event.blockId !== this.id) return;
          if (event.type !== Blockly.Events.BLOCK_CHANGE) return;
          if (event.element !== 'field') return;
          const triggerFields = this.__optionTriggerFields || new Set(optionParents);
          if (!triggerFields.has(event.name)) return;
          if (this.__renderingOptionParams) return;
          this.__renderingOptionParams = true;
          try {
            rerenderOptionParams(this, blockType);
          } finally {
            this.__renderingOptionParams = false;
          }
        });
      };
    }
  });
  // Cascading dropdowns for BRIC:move_to_pose block
  (function() {
    const sessTree = {"LG Digital Park P1": {"1": [["default", "default"]], "2": [["default", "default"]], "3": [["default", "default"]], "B1": [["default", "default"]], "B2": [["default", "default"]]}, "LG sciencepark W02": {"1": [["default", "default"]], "2": [["default", "default"]], "3": [["default", "default"]], "4": [["default", "default"]], "5": [["default", "default"]], "6": [["default", "default"]], "7": [["default", "default"]], "8": [["default", "default"]], "9": [["default", "default"]], "M": [["default", "default"]], "B1": [["default", "default"]], "B2": [["default", "default"]]}, "LG sciencepark W10": {"1": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "2": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "3": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "4": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "5": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "6": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "7": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "8": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "9": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "M": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "B1": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]], "B2": [["default", "default"], ["elevator_AB", "elevator_AB"], ["eleavor_CD", "eleavor_CD"]]}, "LG Seocho R&D": {"1": [["default", "default"]], "2": [["default", "default"]], "3": [["default", "default"]], "4": [["default", "default"]], "5": [["default", "default"]], "6": [["default", "default"]], "7": [["default", "default"]], "8": [["default", "default"]], "9": [["default", "default"]], "M": [["default", "default"]], "10": [["default", "default"]], "11": [["default", "default"]], "12": [["default", "default"]], "13": [["default", "default"]], "14": [["default", "default"]], "15": [["default", "default"]], "16": [["default", "default"]], "17": [["default", "default"]], "18": [["default", "default"]], "19": [["default", "default"]], "20": [["default", "default"]], "21": [["default", "default"]], "22": [["default", "default"]], "23": [["default", "default"]], "24": [["default", "default"]], "25": [["default", "default"]], "B1": [["default", "default"]], "B2": [["default", "default"]]}, "LG Seocho R&D Podium": {"1": [["default", "default"]], "2": [["default", "default"]], "3": [["default", "default"]], "4": [["default", "default"]], "5": [["default", "default"]], "B1": [["default", "default"]], "B2": [["default", "default"]]}};
    const poiTree = {"LG sciencepark W02": {"2": [["LG sciencepark W02 › Hanging Rack", "Rack"], ["LG sciencepark W02 › Self", "Shelf"]]}, "LG sciencepark W10": {"2": [["LG sciencepark W10 › Hanging Rack", "Rack"], ["LG sciencepark W10 › Self", "Shelf"]]}};
    const bricMtpType = 'behavior__navigation__bric_move_to_pose';
    const def = Blockly.Blocks[bricMtpType];
    if (!def) return;
    const prevInit = def.init;
    def.init = function() {
      prevInit.call(this);
      const block = this;
      const areaField = block.getField('PARAM_AREA');
      const floorField = block.getField('PARAM_FLOOR');
      const sessionField = block.getField('PARAM_SESSION');
      const poiField = block.getField('PARAM_POI');
      if (!areaField || !floorField || !sessionField || !poiField) return;

      function setDropdownOpts(field, newOpts) {
        if (!field || !newOpts || !newOpts.length) return;
        if (typeof field.setOptions === 'function') {
          field.setOptions(newOpts);
        } else {
          field.menuGenerator_ = newOpts;
          try { field.setValue(newOpts[0][1]); } catch(e) {}
        }
      }
      function floorOpts(area) {
        const floors = Object.keys(sessTree[area] || {}).sort();
        return floors.length ? floors.map(f => [f, f]) : [['—', '_']];
      }
      function sessionOpts(area, floor) {
        const sessions = (sessTree[area] || {})[floor] || [];
        return sessions.length ? sessions : [['—', '_']];
      }
      function poiOpts(area, floor) {
        const pois = (poiTree[area] || {})[floor] || [];
        return pois.length ? pois : [['—', '_']];
      }

      areaField.setValidator(function(newArea) {
        const fOpts = floorOpts(newArea);
        setDropdownOpts(floorField, fOpts);
        const firstFloor = fOpts[0][1];
        setDropdownOpts(sessionField, sessionOpts(newArea, firstFloor));
        setDropdownOpts(poiField, poiOpts(newArea, firstFloor));
        return newArea;
      });
      floorField.setValidator(function(newFloor) {
        const area = block.getFieldValue('PARAM_AREA') || '';
        setDropdownOpts(sessionField, sessionOpts(area, newFloor));
        setDropdownOpts(poiField, poiOpts(area, newFloor));
        return newFloor;
      });

      // Initialise dependent dropdowns for the current (default) area value.
      const initArea = block.getFieldValue('PARAM_AREA') || '';
      const hasData = sessTree[initArea] || poiTree[initArea];
      if (initArea && hasData) {
        const fOpts = floorOpts(initArea);
        floorField.menuGenerator_ = fOpts;
        const initFloor = block.getFieldValue('PARAM_FLOOR') || fOpts[0][1];
        sessionField.menuGenerator_ = sessionOpts(initArea, initFloor);
        poiField.menuGenerator_ = poiOpts(initArea, initFloor);
      }
    };
  })();
}

window.BRIC = window.BRIC || {};
window.BRIC.blockRegistrars = window.BRIC.blockRegistrars || [];
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_navigation);
// Accumulate profile metadata across all block modules.
window.BRIC.blockProfile = Object.assign(window.BRIC.blockProfile || {}, BLOCK_PROFILE);
window.BRIC.optionProfileMeta = Object.assign(window.BRIC.optionProfileMeta || {}, OPTION_PROFILE_META);
})();
