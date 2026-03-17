import Blockly from 'blockly/core';
import blockDefs from './blockJson/BTList_navigation.json';

const registerBlock = (def) => {
  if (!def || !def.type) return;
  Blockly.Blocks[def.type] = {
    init: function () {
      this.jsonInit(def);
      this.setTooltip('');
      const helpField = this.getField('HELP_ICON');
      const description = String(def.x_description || '').trim() || String(def.args0?.[0]?.x_tooltip || '').trim();
      if (helpField && description) {
        helpField.setTooltip(description);
      }
      const params = Array.isArray(def.x_parameters) ? def.x_parameters : [];
      params.forEach((param) => {
        const field = this.getField(param.help_field);
        const arg = Array.isArray(def.args0) ? def.args0.find((candidate) => candidate?.name === param.help_field) : null;
        const paramDescription = String(param.description || arg?.x_tooltip || '').trim();
        if (field && paramDescription) {
          field.setTooltip(paramDescription);
        }
      });
      const parameterDefs = Array.isArray(def.x_parameter_defs) ? def.x_parameter_defs : [];
      parameterDefs.forEach((param) => {
        const field = this.getField(param.help_field);
        const arg = Array.isArray(def.args0) ? def.args0.find((candidate) => candidate?.name === param.help_field) : null;
        const paramDescription = String(param.description || arg?.x_tooltip || '').trim();
        if (field && paramDescription) {
          field.setTooltip(paramDescription);
        }
      });
    },
  };
};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerBlock);

export { blockDefs as btListBlocksnavigation };
