(() => {
const BLOCKS = [
  {
    "type": "bt_function__root",
    "message0": "%1",
    "args0": [
      {
        "type": "field_label",
        "text": "Root",
        "name": "TITLE"
      }
    ],
    "colour": "#8c564b",
    "tooltip": "",
    "helpUrl": "",
    "message1": "child %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "CHILD",
        "check": "BTNode"
      }
    ]
  },
  {
    "type": "bt_function__action",
    "message0": "%1 %2 %3 %4 %5 %6 %7",
    "args0": [
      {
        "type": "field_label",
        "text": "Action",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_ACTION"
      },
      {
        "type": "field_label",
        "text": "action"
      },
      {
        "type": "field_input",
        "name": "PARAM_ACTION",
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
    "colour": "#ff7f0e",
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode"
  },
  {
    "type": "bt_function__actiondummy",
    "message0": "%1",
    "args0": [
      {
        "type": "field_label",
        "text": "ActionDummy",
        "name": "TITLE"
      }
    ],
    "colour": "#ff7f0e",
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode"
  },
  {
    "type": "bt_function__sleep",
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
        "text": "Sleep",
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
    "colour": "#ff7f0e",
    "tooltip": "지정된 시간 만큼 대기.",
    "helpUrl": "",
    "previousStatement": "BTNode",
    "nextStatement": "BTNode"
  }
];
const BLOCK_TOOLTIPS = {
  "bt_function__root": "",
  "bt_function__action": "",
  "bt_function__actiondummy": "",
  "bt_function__sleep": "지정된 시간 만큼 대기."
};
const PARAM_TOOLTIPS = {
  "bt_function__root": {},
  "bt_function__action": {
    "PARAM_ACTION": "",
    "PARAM_TICKRATE": "Tick period in milliseconds."
  },
  "bt_function__actiondummy": {},
  "bt_function__sleep": {
    "PARAM_TICKRATE": "Sleep time in milliseconds."
  }
};
const OPTION_PARAM_MAP = {
  "bt_function__root": {},
  "bt_function__action": {},
  "bt_function__actiondummy": {},
  "bt_function__sleep": {}
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

function registerBlocks_bt_function() {
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
window.BRIC.blockRegistrars.push(registerBlocks_bt_function);
})();
