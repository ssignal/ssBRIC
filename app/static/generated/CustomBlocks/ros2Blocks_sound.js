(() => {
const BLOCKS = [
  {
    "type": "behavior__sound__sound_start_play",
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
        "text": "start_play",
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
        "text": "2000"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_PATH"
      },
      {
        "type": "field_label",
        "text": "path"
      },
      {
        "type": "field_input",
        "name": "PARAM_PATH",
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
        "text": ""
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#9467bd",
    "tooltip": "일반 sound play 명령",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound__sound_start_play_tts",
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
        "text": "start_play_tts",
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
        "text": "2000"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TEXT"
      },
      {
        "type": "field_label",
        "text": "text"
      },
      {
        "type": "field_input",
        "name": "PARAM_TEXT",
        "text": ""
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#9467bd",
    "tooltip": "TTS play 명령",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound__sound_wait_play_completed",
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
        "text": "wait_play_completed",
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
        "text": "2000"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#9467bd",
    "tooltip": "Sound/TTS play 완료 여부 확인",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound__sound_stop_play",
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
        "text": "stop_play",
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
        "text": "2000"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#9467bd",
    "tooltip": "Sound/TTS play 강제 종료",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound__sound_set_volume",
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
        "text": "set_volume",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_VOLUME"
      },
      {
        "type": "field_label",
        "text": "volume"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_VOLUME",
        "options": [
          [
            "0",
            "0"
          ],
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
            "10",
            "10"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#9467bd",
    "tooltip": "Sound volume 조절 명령",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__sound__sound_start_play": "일반 sound play 명령",
  "behavior__sound__sound_start_play_tts": "TTS play 명령",
  "behavior__sound__sound_wait_play_completed": "Sound/TTS play 완료 여부 확인",
  "behavior__sound__sound_stop_play": "Sound/TTS play 강제 종료",
  "behavior__sound__sound_set_volume": "Sound volume 조절 명령"
};
const PARAM_TOOLTIPS = {
  "behavior__sound__sound_start_play": {
    "PARAM_ID": "Handle ID to play sound (default: 2000)",
    "PARAM_PATH": "Sound file path to play",
    "PARAM_REPEAT": "Sound playback repetition type"
  },
  "behavior__sound__sound_start_play_tts": {
    "PARAM_ID": "Handle ID to play sound (default: 2000)",
    "PARAM_TEXT": "Text to play TTS"
  },
  "behavior__sound__sound_wait_play_completed": {
    "PARAM_ID": "Handle ID given for playing sound"
  },
  "behavior__sound__sound_stop_play": {
    "PARAM_ID": "Handle ID given for playing sound"
  },
  "behavior__sound__sound_set_volume": {
    "PARAM_VOLUME": "Volume value (0 ~ 10)"
  }
};
const OPTION_PARAM_MAP = {
  "behavior__sound__sound_start_play": {},
  "behavior__sound__sound_start_play_tts": {},
  "behavior__sound__sound_wait_play_completed": {},
  "behavior__sound__sound_stop_play": {},
  "behavior__sound__sound_set_volume": {}
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

function registerBlocks_ros2blocks_sound() {
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
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_sound);
})();
