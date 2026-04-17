(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "behavior__sound__sound_set_volume": {},
  "behavior__sound__sound_start_play": {},
  "behavior__sound__sound_start_play_tts": {},
  "behavior__sound__sound_stop_play": {},
  "behavior__sound__sound_wait_play_completed": {}
};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => { try { return JSON.parse(v); } catch (err) { return null; } }).filter((v) => v && typeof v === 'object'); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function assignParamValue(out, meta, raw) { const child = meta.output_name || meta.name; const parent = meta.parent_key || ''; const value = parseTyped(raw, meta.type); if (parent) { const prev = out[parent]; if (prev && typeof prev === 'object' && !Array.isArray(prev)) { out[parent] = { ...prev, [child]: value }; } else { out[parent] = { [child]: value }; } } else { out[child] = value; } }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { assignParamValue(out, meta, block.getFieldValue(meta.field)); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['behavior__sound__sound_set_volume'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "volume", "output_name": "volume", "parent_key": "", "type": "integer"}, block.getFieldValue('PARAM_VOLUME'));
  const optionMetaByField = OPTION_PARAM_MAP['behavior__sound__sound_set_volume'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'sound/set_volume',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__sound__sound_start_play'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "id", "output_name": "id", "parent_key": "", "type": "integer"}, block.getFieldValue('PARAM_ID'));
  assignParamValue(parameter, {"name": "path", "output_name": "path", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_PATH'));
  assignParamValue(parameter, {"name": "repeat", "output_name": "repeat", "parent_key": "", "type": "bool"}, block.getFieldValue('PARAM_REPEAT'));
  const optionMetaByField = OPTION_PARAM_MAP['behavior__sound__sound_start_play'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'sound/start_play',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__sound__sound_start_play_tts'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "id", "output_name": "id", "parent_key": "", "type": "integer"}, block.getFieldValue('PARAM_ID'));
  assignParamValue(parameter, {"name": "text", "output_name": "text", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_TEXT'));
  const optionMetaByField = OPTION_PARAM_MAP['behavior__sound__sound_start_play_tts'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'sound/start_play_tts',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__sound__sound_stop_play'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "id", "output_name": "id", "parent_key": "", "type": "integer"}, block.getFieldValue('PARAM_ID'));
  const optionMetaByField = OPTION_PARAM_MAP['behavior__sound__sound_stop_play'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'sound/stop_play',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__sound__sound_wait_play_completed'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "id", "output_name": "id", "parent_key": "", "type": "integer"}, block.getFieldValue('PARAM_ID'));
  const optionMetaByField = OPTION_PARAM_MAP['behavior__sound__sound_wait_play_completed'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'sound/wait_play_completed',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};


function registerGenerators_ros2blocks_sound() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_ros2blocks_sound);
})();