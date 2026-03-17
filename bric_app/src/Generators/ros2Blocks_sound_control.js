import { javascriptGenerator } from 'blockly/javascript';
import blockDefs from '../CustomBlocks/blockJson/BTList_sound_control.json';

const castValue = (raw, type) => {
  const normalized = String(type || '').toLowerCase();
  if (normalized === 'integer' || normalized === 'int') {
    const parsed = Number.parseInt(raw, 10);
    return Number.isNaN(parsed) ? raw : parsed;
  }
  if (normalized === 'float' || normalized === 'double' || normalized === 'number') {
    const parsed = Number.parseFloat(raw);
    return Number.isNaN(parsed) ? raw : parsed;
  }
  if (normalized === 'bool' || normalized === 'boolean') {
    if (raw === 'true') return true;
    if (raw === 'false') return false;
  }
  return raw;
};

const buildFieldValues = (block, metas) => {
  const output = {};
  metas.forEach((meta) => {
    output[meta.name] = castValue(block.getFieldValue(meta.field), meta.type);
  });
  return output;
};

const generateNodeId = () => String(Math.floor(Math.random() * 100000000)).padStart(8, '0');

const registerGenerator = (def) => {
  if (!def || !def.type) return;
  javascriptGenerator.forBlock[def.type] = function (block) {
    const payload = {
      type: String(def.x_type || 'Action'),
      id: generateNodeId(),
      parameter: buildFieldValues(block, Array.isArray(def.x_parameters) ? def.x_parameters : []),
    };
    const parameterDefs = Array.isArray(def.x_parameter_defs) ? def.x_parameter_defs : [];
    parameterDefs.forEach((meta) => {
      payload[meta.name] = castValue(block.getFieldValue(meta.field), meta.type);
    });
    if (def.x_action) {
      payload.action = def.x_action;
    }
    return JSON.stringify(payload);
  };
};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerGenerator);

export { blockDefs as btListGeneratorssound_control };
