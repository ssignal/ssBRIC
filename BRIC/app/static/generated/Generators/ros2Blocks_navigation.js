(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "behavior__navigation__navigation_move_to_pose": {},
  "behavior__navigation__navigation_move_in_direction": {},
  "behavior__navigation__navigation_rotate": {},
  "behavior__navigation__navigation_wait_move_finished": {},
  "behavior__navigation__navigation_stop_move": {}
};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { out[meta.name] = parseTyped(block.getFieldValue(meta.field), meta.type); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['behavior__navigation__navigation_move_to_pose'] = function(block, generator) {
  const parameter = {};
  parameter['pose_type'] = block.getFieldValue('PARAM_POSE_TYPE') || '';
  parameter['x'] = Number.parseFloat(block.getFieldValue('PARAM_X') || '0');
  parameter['y'] = Number.parseFloat(block.getFieldValue('PARAM_Y') || '0');
  parameter['z'] = Number.parseFloat(block.getFieldValue('PARAM_Z') || '0');
  parameter['behavior_tree'] = block.getFieldValue('PARAM_BEHAVIOR_TREE') || '';
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_move_to_pose'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/move_to_pose',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__navigation__navigation_move_in_direction'] = function(block, generator) {
  const parameter = {};
  parameter['distance'] = Number.parseFloat(block.getFieldValue('PARAM_DISTANCE') || '0');
  parameter['velocity'] = Number.parseFloat(block.getFieldValue('PARAM_VELOCITY') || '0');
  parameter['direction'] = block.getFieldValue('PARAM_DIRECTION') || '';
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_move_in_direction'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/move_in_direction',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__navigation__navigation_rotate'] = function(block, generator) {
  const parameter = {};
  parameter['angle'] = Number.parseFloat(block.getFieldValue('PARAM_ANGLE') || '0');
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_rotate'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/rotate',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__navigation__navigation_wait_move_finished'] = function(block, generator) {
  const parameter = {};
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_wait_move_finished'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/wait_move_finished',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__navigation__navigation_stop_move'] = function(block, generator) {
  const parameter = {};
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_stop_move'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/stop_move',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};


function registerGenerators_ros2blocks_navigation() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_ros2blocks_navigation);
})();