const BLOCKS = [
  {
    "type": "behavior__motion__motion_start_motion",
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
        "text": "motion/start_motion",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_MOTION_ID"
      },
      {
        "type": "field_label",
        "text": "motion_id"
      },
      {
        "type": "field_input",
        "name": "PARAM_MOTION_ID",
        "text": ""
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_BLOCKING_TYPE"
      },
      {
        "type": "field_label",
        "text": "blocking_type"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_BLOCKING_TYPE",
        "options": [
          [
            "NONE",
            "NONE"
          ],
          [
            "SOFT",
            "SOFT"
          ],
          [
            "HARD",
            "HARD"
          ],
          [
            "LOOP",
            "LOOP"
          ],
          [
            "WAIT",
            "WAIT"
          ]
        ]
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_DURATION_MS"
      },
      {
        "type": "field_label",
        "text": "duration_ms"
      },
      {
        "type": "field_input",
        "name": "PARAM_DURATION_MS",
        "text": "0"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "Q9 motion ID를 지정해 motion을 시작한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__motion__motion_stop_motion",
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
        "text": "motion/stop_motion",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "현재 실행 중인 motion을 강제로 종료한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__motion__motion_wait_motion_finished",
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
        "text": "motion/wait_motion_finished",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "현재 실행 중인 motion의 완료를 기다린다.",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__motion__motion_start_motion": "Q9 motion ID를 지정해 motion을 시작한다.",
  "behavior__motion__motion_stop_motion": "현재 실행 중인 motion을 강제로 종료한다.",
  "behavior__motion__motion_wait_motion_finished": "현재 실행 중인 motion의 완료를 기다린다."
};
const PARAM_TOOLTIPS = {
  "behavior__motion__motion_start_motion": {
    "PARAM_MOTION_ID": "ID from /api/action/motion/list. The app resolves task_type and motion/legacy/preset target from this ID.",
    "PARAM_BLOCKING_TYPE": "Scheduler blocking mode while the motion is running.",
    "PARAM_DURATION_MS": "Optional extra timeout. If set, stop_motion is triggered after this many milliseconds."
  },
  "behavior__motion__motion_stop_motion": {},
  "behavior__motion__motion_wait_motion_finished": {}
};

function registerBlocks_ros2blocks_motion() {
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
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_motion);
