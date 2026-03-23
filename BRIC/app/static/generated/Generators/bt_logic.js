(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "bt_logic__ifthenelse": {},
  "bt_logic__parallel": {},
  "bt_logic__recovery": {},
  "bt_logic__sequence": {},
  "bt_logic__delay": {},
  "bt_logic__forcesuccess": {},
  "bt_logic__forcefailure": {},
  "bt_logic__loop": {},
  "bt_logic__retryuntilsuccess": {},
  "bt_logic__repeat": {},
  "bt_logic__timeout": {},
  "bt_logic__whiledoelse": {}
};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { out[meta.name] = parseTyped(block.getFieldValue(meta.field), meta.type); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['bt_logic__ifthenelse'] = function(block, generator) {
  const node = {
    type: 'IfThenElse',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__parallel'] = function(block, generator) {
  const node = {
    type: 'Parallel',
    id: randomId(),
  };
  node['threshold'] = Number.parseInt(block.getFieldValue('PARAM_THRESHOLD') || '0', 10);
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__recovery'] = function(block, generator) {
  const node = {
    type: 'Recovery',
    id: randomId(),
  };
  node['attempt'] = Number.parseInt(block.getFieldValue('PARAM_ATTEMPT') || '0', 10);
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__sequence'] = function(block, generator) {
  const node = {
    type: 'Sequence',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__delay'] = function(block, generator) {
  const node = {
    type: 'Delay',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__forcesuccess'] = function(block, generator) {
  const node = {
    type: 'ForceSuccess',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__forcefailure'] = function(block, generator) {
  const node = {
    type: 'ForceFailure',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__loop'] = function(block, generator) {
  const node = {
    type: 'Loop',
    id: randomId(),
  };
  node['repeat'] = Number.parseInt(block.getFieldValue('PARAM_REPEAT') || '0', 10);
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__retryuntilsuccess'] = function(block, generator) {
  const node = {
    type: 'RetryUntilSuccess',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__repeat'] = function(block, generator) {
  const node = {
    type: 'Repeat',
    id: randomId(),
  };
  node['repeat'] = Number.parseInt(block.getFieldValue('PARAM_REPEAT') || '0', 10);
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__timeout'] = function(block, generator) {
  const node = {
    type: 'Timeout',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  node['timeout'] = Number.parseInt(block.getFieldValue('PARAM_TIMEOUT') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_logic__whiledoelse'] = function(block, generator) {
  const node = {
    type: 'WhileDoElse',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  const childrenRaw = generator.statementToCode(block, 'CHILDREN');
  node.children = parseChildNodes(childrenRaw);
  return JSON.stringify(node) + '\n';
};


function registerGenerators_bt_logic() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_bt_logic);
})();