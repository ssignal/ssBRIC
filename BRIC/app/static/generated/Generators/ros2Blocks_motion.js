(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }

javascriptGenerator.forBlock['behavior__motion__motion_start_motion'] = function(block, generator) {
  const parameter = {};
  parameter['name'] = block.getFieldValue('PARAM_NAME') || '';
  parameter['state'] = block.getFieldValue('PARAM_STATE') || '';
  parameter['repeat'] = block.getFieldValue('PARAM_REPEAT') || '';
  parameter['action'] = block.getFieldValue('PARAM_ACTION') || '';
  const node = {
    type: 'Action',
    action: 'motion/start_motion',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__motion__motion_stop_motion'] = function(block, generator) {
  const parameter = {};
  parameter['mode'] = block.getFieldValue('PARAM_MODE') || '';
  const node = {
    type: 'Action',
    action: 'motion/stop_motion',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__motion__motion_wait_motion_finished'] = function(block, generator) {
  const parameter = {};
  const node = {
    type: 'Action',
    action: 'motion/wait_motion_finished',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};


function registerGenerators_ros2blocks_motion() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_ros2blocks_motion);
})();