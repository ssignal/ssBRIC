(() => {
const BLOCKS = [
  {
    "type": "behavior__navigation__navigation_move_to_pose",
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
        "text": "move_to_pose",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
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
        "name": "HELP_Z"
      },
      {
        "type": "field_label",
        "text": "z"
      },
      {
        "type": "field_input",
        "name": "PARAM_Z",
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
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "특정 좌표로 주행 명령. euler pose(x, y, z)로 좌표 입력 받음. 내부적으로 quaternion pose(x, y, z, w)로 변환하여 사용됨.",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_move_in_direction",
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
        "text": "move_in_direction",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
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
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
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
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
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
    "tooltip": "특정 거리로 이동 명령. 역방향은 distance를 음수로, direction을 \"backwards\"로 지정. velocity는 0~1 사이의 값으로만 허용.",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_rotate",
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
        "text": "rotate",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
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
    "tooltip": "제자리 회전 명령",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_wait_move_finished",
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
        "text": "wait_move_finished",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "주행/회전 완료 여부 확인",
    "helpUrl": ""
  },
  {
    "type": "behavior__navigation__navigation_stop_move",
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
        "text": "stop_move",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#d62728",
    "tooltip": "주행/회전 강제 종료",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__navigation__navigation_move_to_pose": "특정 좌표로 주행 명령. euler pose(x, y, z)로 좌표 입력 받음. 내부적으로 quaternion pose(x, y, z, w)로 변환하여 사용됨.",
  "behavior__navigation__navigation_move_in_direction": "특정 거리로 이동 명령. 역방향은 distance를 음수로, direction을 \"backwards\"로 지정. velocity는 0~1 사이의 값으로만 허용.",
  "behavior__navigation__navigation_rotate": "제자리 회전 명령",
  "behavior__navigation__navigation_wait_move_finished": "주행/회전 완료 여부 확인",
  "behavior__navigation__navigation_stop_move": "주행/회전 강제 종료"
};
const PARAM_TOOLTIPS = {
  "behavior__navigation__navigation_move_to_pose": {
    "PARAM_POSE_TYPE": "map (indoor), earth (outdoor)",
    "PARAM_X": "Euler pose x",
    "PARAM_Y": "Euler pose y",
    "PARAM_Z": "Euler pose z (degree unit)",
    "PARAM_BEHAVIOR_TREE": "It can be omitted as default"
  },
  "behavior__navigation__navigation_move_in_direction": {
    "PARAM_DISTANCE": "Distance to move from the current position (meter unit)",
    "PARAM_VELOCITY": "Movement velocity (m/s unit)",
    "PARAM_DIRECTION": "Direction to move"
  },
  "behavior__navigation__navigation_rotate": {
    "PARAM_ANGLE": "Rotation angle (degree unit)"
  },
  "behavior__navigation__navigation_wait_move_finished": {},
  "behavior__navigation__navigation_stop_move": {}
};
const OPTION_PARAM_MAP = {
  "behavior__navigation__navigation_move_to_pose": {},
  "behavior__navigation__navigation_move_in_direction": {},
  "behavior__navigation__navigation_rotate": {},
  "behavior__navigation__navigation_wait_move_finished": {},
  "behavior__navigation__navigation_stop_move": {}
};
const HELP_ICON = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>";

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
    input.appendField(new Blockly.FieldImage(HELP_ICON, 16, 16, '?'), helpFieldName);
    input.appendField(String(meta.name || 'param'));

    const prior = priorValues[meta.field];
    if (Array.isArray(meta.options) && meta.options.length) {
      input.appendField(new Blockly.FieldDropdown(meta.options), meta.field);
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
    if (field && field.setTooltip) field.setTooltip(meta.description || '');
    const helpField = block.getField(helpFieldName);
    if (helpField && helpField.setTooltip) helpField.setTooltip(meta.description || '');

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

        const optionParents = Object.keys(OPTION_PARAM_MAP[blockType] || {});
        rerenderOptionParams(this, blockType);
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
}

window.BRIC = window.BRIC || {};
window.BRIC.blockRegistrars = window.BRIC.blockRegistrars || [];
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_navigation);
})();
