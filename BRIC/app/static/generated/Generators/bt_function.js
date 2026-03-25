(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "bt_function__root": {},
  "bt_function__action": {},
  "bt_function__actiondummy": {},
  "bt_function__sleep": {}
};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => { try { return JSON.parse(v); } catch (err) { return null; } }).filter((v) => v && typeof v === 'object'); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { out[meta.name] = parseTyped(block.getFieldValue(meta.field), meta.type); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['bt_function__root'] = function(block, generator) {
  const node = {
    type: 'Root',
    id: randomId(),
  };
  const childRaw = generator.statementToCode(block, 'CHILD');
  const childNodes = parseChildNodes(childRaw);
  node.child = childNodes.length ? childNodes[0] : null;
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__action'] = function(block, generator) {
  const node = {
    type: 'Action',
    id: randomId(),
  };
  node['action'] = block.getFieldValue('PARAM_ACTION') || '';
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__actiondummy'] = function(block, generator) {
  const node = {
    type: 'ActionDummy',
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__sleep'] = function(block, generator) {
  const node = {
    type: 'Sleep',
    id: randomId(),
  };
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  return JSON.stringify(node) + '\n';
};


function registerGenerators_bt_function() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_bt_function);
})();