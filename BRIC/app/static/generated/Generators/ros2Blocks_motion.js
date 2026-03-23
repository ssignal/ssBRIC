(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "behavior__motion__motion_start_motion": {
    "PARAM_STATE": {
      "autonomous": [
        {
          "name": "A1",
          "field": "OPT_STATE_A1",
          "type": "string",
          "description": "String A1",
          "options": [
            [
              "AA1",
              "AA1"
            ],
            [
              "AA2",
              "AA2"
            ]
          ],
          "default": "AA1",
          "option_parameters": {}
        },
        {
          "name": "A2",
          "field": "OPT_STATE_A2",
          "type": "integer",
          "description": "Int A2",
          "options": [
            [
              "10",
              "10"
            ],
            [
              "20",
              "20"
            ]
          ],
          "default": "10",
          "option_parameters": {}
        }
      ],
      "exp_motion": [
        {
          "name": "B1",
          "field": "OPT_STATE_B1",
          "type": "string",
          "description": "String B1",
          "options": [],
          "default": "",
          "option_parameters": {}
        },
        {
          "name": "B2",
          "field": "OPT_STATE_B2",
          "type": "integer",
          "description": "Int B2",
          "options": [],
          "default": "0",
          "option_parameters": {}
        }
      ]
    }
  },
  "behavior__motion__motion_stop_motion": {},
  "behavior__motion__motion_wait_motion_finished": {}
};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { out[meta.name] = parseTyped(block.getFieldValue(meta.field), meta.type); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['behavior__motion__motion_start_motion'] = function(block, generator) {
  const parameter = {};
  parameter['name'] = block.getFieldValue('PARAM_NAME') || '';
  parameter['state'] = block.getFieldValue('PARAM_STATE') || '';
  parameter['repeat'] = block.getFieldValue('PARAM_REPEAT') || '';
  parameter['action'] = block.getFieldValue('PARAM_ACTION') || '';
  const optionMetaByField = OPTION_PARAM_MAP['behavior__motion__motion_start_motion'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
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
  const optionMetaByField = OPTION_PARAM_MAP['behavior__motion__motion_stop_motion'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
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
  const optionMetaByField = OPTION_PARAM_MAP['behavior__motion__motion_wait_motion_finished'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
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