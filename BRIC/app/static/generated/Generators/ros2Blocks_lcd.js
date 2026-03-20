(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }

javascriptGenerator.forBlock['behavior__lcd__lcd_play_animation'] = function(block, generator) {
  const parameter = {};
  parameter['path'] = block.getFieldValue('PARAM_PATH') || '';
  parameter['repeat'] = block.getFieldValue('PARAM_REPEAT') || '';
  parameter['instant_play'] = block.getFieldValue('PARAM_INSTANT_PLAY') || '';
  const node = {
    type: 'Action',
    action: 'lcd/play_animation',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__lcd__lcd_stop_animation'] = function(block, generator) {
  const parameter = {};
  const node = {
    type: 'Action',
    action: 'lcd/stop_animation',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};


function registerGenerators_ros2blocks_lcd() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_ros2blocks_lcd);
})();