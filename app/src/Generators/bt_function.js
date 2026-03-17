const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }

javascriptGenerator.forBlock['bt_function__root'] = function(block, generator) {
  const node = {
    type: 'Root',
    id: randomId(),
  };
  node['LinkParameter'] = block.getFieldValue('PARAM_LINKPARAMETER') || '';
  const childRaw = generator.statementToCode(block, 'CHILD');
  const childNodes = parseChildNodes(childRaw);
  node.child = childNodes.length ? childNodes[0] : null;
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__subtree'] = function(block, generator) {
  const node = {
    type: 'Subtree',
    id: randomId(),
  };
  node['id'] = block.getFieldValue('PARAM_ID') || '';
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__action'] = function(block, generator) {
  const node = {
    type: 'Action',
    id: randomId(),
  };
  node['action'] = block.getFieldValue('PARAM_ACTION') || '';
  node['id'] = block.getFieldValue('PARAM_ID') || '';
  node['parameter'] = block.getFieldValue('PARAM_PARAMETER') || '';
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__actiondummy'] = function(block, generator) {
  const node = {
    type: 'ActionDummy',
    id: randomId(),
  };
  node['id'] = block.getFieldValue('PARAM_ID') || '';
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__condition'] = function(block, generator) {
  const node = {
    type: 'Condition',
    id: randomId(),
  };
  node['condition'] = block.getFieldValue('PARAM_CONDITION') || '';
  node['id'] = block.getFieldValue('PARAM_ID') || '';
  node['parameter'] = block.getFieldValue('PARAM_PARAMETER') || '';
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['bt_function__sleep'] = function(block, generator) {
  const node = {
    type: 'Sleep',
    id: randomId(),
  };
  node['id'] = block.getFieldValue('PARAM_ID') || '';
  node['tickrate'] = Number.parseInt(block.getFieldValue('PARAM_TICKRATE') || '0', 10);
  return JSON.stringify(node) + '\n';
};


function registerGenerators_bt_function() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_bt_function);