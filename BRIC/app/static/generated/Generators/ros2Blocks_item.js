(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }

javascriptGenerator.forBlock['behavior__item__navigation_move_to_pose'] = function(block, generator) {
  const parameter = {};
  parameter['x'] = Number.parseFloat(block.getFieldValue('PARAM_X') || '0');
  parameter['y'] = Number.parseFloat(block.getFieldValue('PARAM_Y') || '0');
  parameter['theta'] = Number.parseFloat(block.getFieldValue('PARAM_THETA') || '0');
  parameter['behavior_tree'] = block.getFieldValue('PARAM_BEHAVIOR_TREE') || '';
  parameter['frame_id'] = block.getFieldValue('PARAM_FRAME_ID') || '';
  const node = {
    type: 'Action',
    action: 'navigation/move_to_pose',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__item__navigation_moving_to_pose'] = function(block, generator) {
  const parameter = {};
  parameter['x'] = Number.parseFloat(block.getFieldValue('PARAM_X') || '0');
  parameter['y'] = Number.parseFloat(block.getFieldValue('PARAM_Y') || '0');
  parameter['theta'] = Number.parseFloat(block.getFieldValue('PARAM_THETA') || '0');
  const node = {
    type: 'Action',
    action: 'navigation/moving_to_pose',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__item__navigation_stop_move'] = function(block, generator) {
  const parameter = {};
  const node = {
    type: 'Action',
    action: 'navigation/stop_move',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__item__navigation_rotate'] = function(block, generator) {
  const parameter = {};
  parameter['yaw'] = Number.parseFloat(block.getFieldValue('PARAM_YAW') || '0');
  parameter['time_allowance_sec'] = Number.parseInt(block.getFieldValue('PARAM_TIME_ALLOWANCE_SEC') || '0', 10);
  const node = {
    type: 'Action',
    action: 'navigation/rotate',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};


function registerGenerators_ros2blocks_item() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_ros2blocks_item);
})();