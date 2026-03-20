(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }

javascriptGenerator.forBlock['behavior__sound__sound_start_play'] = function(block, generator) {
  const parameter = {};
  parameter['id'] = Number.parseInt(block.getFieldValue('PARAM_ID') || '0', 10);
  parameter['path'] = block.getFieldValue('PARAM_PATH') || '';
  parameter['repeat'] = block.getFieldValue('PARAM_REPEAT') || '';
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
  parameter['id'] = Number.parseInt(block.getFieldValue('PARAM_ID') || '0', 10);
  parameter['text'] = block.getFieldValue('PARAM_TEXT') || '';
  const node = {
    type: 'Action',
    action: 'sound/start_play_tts',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__sound__sound_wait_play_completed'] = function(block, generator) {
  const parameter = {};
  parameter['id'] = Number.parseInt(block.getFieldValue('PARAM_ID') || '0', 10);
  const node = {
    type: 'Action',
    action: 'sound/wait_play_completed',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__sound__sound_stop_play'] = function(block, generator) {
  const parameter = {};
  parameter['id'] = Number.parseInt(block.getFieldValue('PARAM_ID') || '0', 10);
  const node = {
    type: 'Action',
    action: 'sound/stop_play',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__sound__sound_set_volume'] = function(block, generator) {
  const parameter = {};
  parameter['volume'] = Number.parseInt(block.getFieldValue('PARAM_VOLUME') || '0', 10);
  const node = {
    type: 'Action',
    action: 'sound/set_volume',
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