(() => {
const BLOCKS = [
  {
    "type": "behavior__item__navigation_move_to_pose",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17",
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
        "text": "navigation/move_to_pose",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_X"
      },
      {
        "type": "field_label",
        "text": "x"
      },
      {
        "type": "field_input",
        "name": "PARAM_X",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_Y"
      },
      {
        "type": "field_label",
        "text": "y"
      },
      {
        "type": "field_input",
        "name": "PARAM_Y",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_THETA"
      },
      {
        "type": "field_label",
        "text": "theta"
      },
      {
        "type": "field_input",
        "name": "PARAM_THETA",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_BEHAVIOR_TREE"
      },
      {
        "type": "field_label",
        "text": "behavior_tree"
      },
      {
        "type": "field_input",
        "name": "PARAM_BEHAVIOR_TREE",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_FRAME_ID"
      },
      {
        "type": "field_label",
        "text": "frame_id"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_FRAME_ID",
        "options": [
          [
            "map",
            "map"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "지정한 좌표와 자세로 이동을 요청한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__item__navigation_moving_to_pose",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11",
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
        "text": "navigation/moving_to_pose",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_X"
      },
      {
        "type": "field_label",
        "text": "x"
      },
      {
        "type": "field_input",
        "name": "PARAM_X",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_Y"
      },
      {
        "type": "field_label",
        "text": "y"
      },
      {
        "type": "field_input",
        "name": "PARAM_Y",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_THETA"
      },
      {
        "type": "field_label",
        "text": "theta"
      },
      {
        "type": "field_input",
        "name": "PARAM_THETA",
        "text": "0.0"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "지정한 좌표에 도착했는지 확인한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__item__navigation_stop_move",
    "message0": "%1 %2",
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
        "text": "navigation/stop_move",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "현재 진행 중인 navigation goal을 취소한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__item__navigation_rotate",
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
        "text": "navigation/rotate",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_YAW"
      },
      {
        "type": "field_label",
        "text": "yaw"
      },
      {
        "type": "field_input",
        "name": "PARAM_YAW",
        "text": "0.0"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TIME_ALLOWANCE_SEC"
      },
      {
        "type": "field_label",
        "text": "time_allowance_sec"
      },
      {
        "type": "field_input",
        "name": "PARAM_TIME_ALLOWANCE_SEC",
        "text": "0"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "제자리에서 목표 각도만큼 회전한다.",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__item__navigation_move_to_pose": "지정한 좌표와 자세로 이동을 요청한다.",
  "behavior__item__navigation_moving_to_pose": "지정한 좌표에 도착했는지 확인한다.",
  "behavior__item__navigation_stop_move": "현재 진행 중인 navigation goal을 취소한다.",
  "behavior__item__navigation_rotate": "제자리에서 목표 각도만큼 회전한다."
};
const PARAM_TOOLTIPS = {
  "behavior__item__navigation_move_to_pose": {
    "PARAM_X": "Target pose x position in the map frame.",
    "PARAM_Y": "Target pose y position in the map frame.",
    "PARAM_THETA": "Target heading in radians.",
    "PARAM_BEHAVIOR_TREE": "Optional behavior tree filename. When omitted, the default navigation tree is used.",
    "PARAM_FRAME_ID": "ROS frame for the target pose."
  },
  "behavior__item__navigation_moving_to_pose": {
    "PARAM_X": "Reference target x position in the map frame.",
    "PARAM_Y": "Reference target y position in the map frame.",
    "PARAM_THETA": "Reference target heading in radians."
  },
  "behavior__item__navigation_stop_move": {},
  "behavior__item__navigation_rotate": {
    "PARAM_YAW": "Target yaw in radians.",
    "PARAM_TIME_ALLOWANCE_SEC": "Optional time allowance for the spin action."
  }
};

function registerBlocks_ros2blocks_item() {
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
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_item);
})();
