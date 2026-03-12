import Blockly from 'blockly/core';
import blockDefs from './blockJson/ros2_command_ai_HEAD.json';

const createField = (argDef) => {
  const type = String(argDef.type || '');
  if (type === 'field_dropdown') {
    const options = Array.isArray(argDef.options) && argDef.options.length ? argDef.options : [['N/A', 'N/A']];
    return new Blockly.FieldDropdown(options);
  }
  if (type === 'field_number') {
    return new Blockly.FieldNumber(
      Number(argDef.value ?? 0),
      argDef.min ?? undefined,
      argDef.max ?? undefined,
      argDef.precision ?? 1
    );
  }
  return new Blockly.FieldTextInput(String(argDef.text ?? ''));
};

const normalizeDropdownOptions = (rawOptions) => {
  const source = Array.isArray(rawOptions) ? rawOptions : [];
  const out = [];
  const seen = new Set();
  source.forEach((opt) => {
    if (!Array.isArray(opt) || opt.length < 2) return;
    const labelRaw = opt[0] == null ? '' : String(opt[0]);
    const valueRaw = opt[1] == null ? '' : String(opt[1]);
    const label = labelRaw.trim() ? labelRaw : '(empty)';
    const key = `${label}::${valueRaw}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push([label, valueRaw]);
  });
  if (!out.length) out.push(['N/A', 'N/A']);
  return out;
};

const updateConditionalDropdowns = (block, def, rootValue) => {
  const dyn = def.x_dynamic || {};
  const maps = dyn.conditional_dropdowns || {};
  if (!block.__dynamicOptionSignatures) block.__dynamicOptionSignatures = {};
  Object.entries(maps).forEach(([fieldName, meta]) => {
    const input = block.getInput(`${fieldName}_INPUT`);
    if (!input) return;
    const base = Array.isArray(meta.base_options) ? meta.base_options : [];
    const scoped = (meta.options_by_root && meta.options_by_root[rootValue]) || [];
    const mergedRaw = [...base, ...scoped];
    const options = mergedRaw.length
      ? normalizeDropdownOptions(mergedRaw)
      : normalizeDropdownOptions(meta.all_options);

    const prev = String(block.getFieldValue(fieldName) ?? '');
    const existing = block.getField(fieldName);
    const signature = JSON.stringify(options);
    const shouldRebuild = !existing || block.__dynamicOptionSignatures[fieldName] !== signature;
    if (shouldRebuild && existing) {
      input.removeField(fieldName, true);
    }
    if (shouldRebuild) {
      input.appendField(new Blockly.FieldDropdown(options), fieldName);
      block.__dynamicOptionSignatures[fieldName] = signature;
    }
    const values = new Set(options.map((opt) => String(opt[1])));
    const nextValue = values.has(prev) ? prev : String(options[0][1]);
    if (String(block.getFieldValue(fieldName) ?? '') !== nextValue) {
      block.setFieldValue(nextValue, fieldName);
    }
  });
};

const syncDynamicFields = (block, def) => {
  const dyn = def.x_dynamic;
  if (!dyn) return;
  const rootValue = String(block.getFieldValue(dyn.root_field));
  updateConditionalDropdowns(block, def, rootValue);
  const active = new Set((dyn.child_fields_by_value && dyn.child_fields_by_value[rootValue]) || []);
  (dyn.all_child_fields || []).forEach((fieldName) => {
    const input = block.getInput(`${fieldName}_INPUT`);
    if (input) input.setVisible(active.has(fieldName));
  });
  if (block.rendered) block.render();
};

const registerDynamicBlock = (def) => {
  Blockly.Blocks[def.type] = {
    init: function () {
      const args = Array.isArray(def.args0) ? def.args0 : [];
      args.forEach((argDef) => {
        const label = String(argDef.name || '').toLowerCase();
        this.appendDummyInput(`${argDef.name}_INPUT`)
          .appendField(label)
          .appendField(createField(argDef), argDef.name);
      });
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setStyle(def.style || 'execute_blocks');
      this.setTooltip(def.tooltip || '');
      this.setHelpUrl(def.helpUrl || '');
      syncDynamicFields(this, def);
    },
    onchange: function (event) {
      if (!this.workspace || this.isInFlyout) return;
      if (event && event.blockId && event.blockId !== this.id) return;
      syncDynamicFields(this, def);
    },
  };
};

const registerBlock = (def) => {
  if (!def || !def.type) return;
  if (def.x_dynamic) {
    registerDynamicBlock(def);
    return;
  }
  Blockly.Blocks[def.type] = {
    init: function () {
      this.jsonInit(def);
    },
  };
};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerBlock);

export { blockDefs as ros2BlocksHEAD };
