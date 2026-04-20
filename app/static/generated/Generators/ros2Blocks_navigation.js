(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "behavior__navigation__bric_move_to_pose": {},
  "behavior__navigation__navigation_get_angle_to_0": {},
  "behavior__navigation__navigation_get_current_pose": {},
  "behavior__navigation__navigation_move_in_direction": {},
  "behavior__navigation__navigation_move_to_pose": {},
  "behavior__navigation__navigation_rotate": {},
  "behavior__navigation__navigation_stop_move": {},
  "behavior__navigation__navigation_wait_move_finished": {},
  "behavior__navigation__navigation_wait_move_finished_and_sleep": {}
};
const POI_COORDS = {
  "LG sciencepark W02::2::Rack": {
    "x": 2.0,
    "y": 2.0,
    "z": 2.0
  },
  "LG sciencepark W02::2::Shelf": {
    "x": 1.0,
    "y": 1.0,
    "z": 1.0
  },
  "LG sciencepark W10::2::Rack": {
    "x": 2.0,
    "y": 2.0,
    "z": 2.0
  },
  "LG sciencepark W10::2::Shelf": {
    "x": 1.0,
    "y": 1.0,
    "z": 1.0
  }
};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => { try { return JSON.parse(v); } catch (err) { return null; } }).filter((v) => v && typeof v === 'object'); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function assignParamValue(out, meta, raw) { const child = meta.output_name || meta.name; const parent = meta.parent_key || ''; const value = parseTyped(raw, meta.type); if (parent) { const prev = out[parent]; if (prev && typeof prev === 'object' && !Array.isArray(prev)) { out[parent] = { ...prev, [child]: value }; } else { out[parent] = { [child]: value }; } } else { out[child] = value; } }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { assignParamValue(out, meta, block.getFieldValue(meta.field)); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['behavior__navigation__bric_move_to_pose'] = function(block, generator) {
  const area = block.getFieldValue('PARAM_AREA') || '';
  const floor = block.getFieldValue('PARAM_FLOOR') || '';
  const poi = block.getFieldValue('PARAM_POI') || '';
  const coordKey = area + '::' + floor + '::' + poi;
  const coords = POI_COORDS[coordKey] || {};
  const node = {
    type: 'Action',
    action: 'navigation/move_to_pose',
    parameter: {
      pose_type: 'map',
      pose: {
        x: coords.x !== undefined ? coords.x : 0,
        y: coords.y !== undefined ? coords.y : 0,
        z: coords.z !== undefined ? coords.z : 0,
      },
    },
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__navigation__navigation_get_angle_to_0'] = function(block, generator) {
  const parameter = {};
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_get_angle_to_0'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/get_angle_to_0',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__navigation__navigation_get_current_pose'] = function(block, generator) {
  const parameter = {};
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_get_current_pose'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/get_current_pose',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__navigation__navigation_move_in_direction'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "distance", "output_name": "distance", "parent_key": "", "type": "float"}, block.getFieldValue('PARAM_DISTANCE'));
  assignParamValue(parameter, {"name": "velocity", "output_name": "velocity", "parent_key": "", "type": "float"}, block.getFieldValue('PARAM_VELOCITY'));
  assignParamValue(parameter, {"name": "direction", "output_name": "direction", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_DIRECTION'));
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

javascriptGenerator.forBlock['behavior__navigation__navigation_move_to_pose'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "pose_type", "output_name": "pose_type", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_POSE_TYPE'));
  assignParamValue(parameter, {"name": "pose/x", "output_name": "x", "parent_key": "pose", "type": "float"}, block.getFieldValue('PARAM_POSE_X'));
  assignParamValue(parameter, {"name": "pose/y", "output_name": "y", "parent_key": "pose", "type": "float"}, block.getFieldValue('PARAM_POSE_Y'));
  assignParamValue(parameter, {"name": "pose/z", "output_name": "z", "parent_key": "pose", "type": "float"}, block.getFieldValue('PARAM_POSE_Z'));
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

javascriptGenerator.forBlock['behavior__navigation__navigation_rotate'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "angle", "output_name": "angle", "parent_key": "", "type": "float"}, block.getFieldValue('PARAM_ANGLE'));
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

javascriptGenerator.forBlock['behavior__navigation__navigation_wait_move_finished_and_sleep'] = function(block, generator) {
  const parameter = {};
  const optionMetaByField = OPTION_PARAM_MAP['behavior__navigation__navigation_wait_move_finished_and_sleep'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'navigation/wait_move_finished_and_sleep',
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