import { javascriptGenerator } from 'blockly/javascript';

const EXTRA_BT_LOGIC_DEFS = [
  { blockType: 'bt_fallback', nodeType: 'Fallback', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_ifthenelse', nodeType: 'IfThenElse', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_parallel', nodeType: 'Parallel', params: [{ name: 'threshold', field: 'THRESHOLD', valueType: 'integer' }, { name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_pipelinesequence', nodeType: 'PipelineSequence', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_pipelineselect', nodeType: 'PipelineSelect', params: [{ name: 'index', field: 'INDEX', valueType: 'integer' }, { name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_reactivefallback', nodeType: 'ReactiveFallback', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_reactivesequence', nodeType: 'ReactiveSequence', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_recovery', nodeType: 'Recovery', params: [{ name: 'attempt', field: 'ATTEMPT', valueType: 'integer' }, { name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_sequencestar', nodeType: 'SequenceStar', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_delay', nodeType: 'Delay', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_forcesuccess', nodeType: 'ForceSuccess', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_forcefailure', nodeType: 'ForceFailure', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_inverse', nodeType: 'Inverse', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_loop', nodeType: 'Loop', params: [{ name: 'repeat', field: 'REPEAT', valueType: 'integer' }, { name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_retry', nodeType: 'Retry', params: [{ name: 'attempt', field: 'ATTEMPT', valueType: 'integer' }, { name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_retryuntilsuccess', nodeType: 'RetryUntilSuccess', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_repeat', nodeType: 'Repeat', params: [{ name: 'repeat', field: 'REPEAT', valueType: 'integer' }, { name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
  { blockType: 'bt_timeout', nodeType: 'Timeout', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }, { name: 'timeout', field: 'TIMEOUT', valueType: 'integer' }] },
  { blockType: 'bt_whiledoelse', nodeType: 'WhileDoElse', params: [{ name: 'tickrate', field: 'TICKRATE', valueType: 'integer' }] },
];

function blockCodeToString(code) {
  if (Array.isArray(code)) {
    return String(code[0] ?? '').trim();
  }
  return String(code ?? '').trim();
}

function generateSingleBlockCode(block, generator) {
  const generatorFn = generator.forBlock[block.type];
  if (typeof generatorFn !== 'function') {
    return generator.blockToCode(block);
  }
  return generatorFn(block, generator);
}

function collectChildren(block, inputName, generator) {
  const results = [];
  let child = block.getInputTargetBlock(inputName);

  while (child) {
    const code = generateSingleBlockCode(child, generator);
    const text = blockCodeToString(code);

    if (text) {
      results.push(JSON.parse(text));
    }

    child = child.getNextBlock();
  }

  return results;
}

function castValue(raw, type) {
  const normalized = String(type || '').toLowerCase();
  if (normalized === 'integer' || normalized === 'int') {
    const parsed = Number.parseInt(raw, 10);
    return Number.isNaN(parsed) ? raw : parsed;
  }
  if (normalized === 'float' || normalized === 'double' || normalized === 'number') {
    const parsed = Number.parseFloat(raw);
    return Number.isNaN(parsed) ? raw : parsed;
  }
  if (normalized === 'bool' || normalized === 'boolean') {
    if (raw === 'true') return true;
    if (raw === 'false') return false;
  }
  return raw;
}

const generateNodeId = () => String(Math.floor(Math.random() * 100000000)).padStart(8, '0');

javascriptGenerator.forBlock['bt_program_start'] = function (block, generator) {
  const roots = collectChildren(block, 'ROOT', generator);

  const tree = {
    version: '1.0',
    root: roots[0] ?? null,
  };

  return JSON.stringify(tree, null, 2);
};

javascriptGenerator.forBlock['bt_sequence'] = function (block, generator) {
  const children = collectChildren(block, 'CHILDREN', generator);

  return JSON.stringify({
    type: 'Sequence',
    children,
  });
};

javascriptGenerator.forBlock['bt_selector'] = function (block, generator) {
  const children = collectChildren(block, 'CHILDREN', generator);

  return JSON.stringify({
    type: 'Selector',
    children,
  });
};

javascriptGenerator.forBlock['bt_condition'] = function (block) {
  const name = block.getFieldValue('NAME') || 'condition';

  return JSON.stringify({
    type: 'Condition',
    name,
  });
};

javascriptGenerator.forBlock['bt_action'] = function (block) {
  const name = block.getFieldValue('NAME') || 'action';

  return JSON.stringify({
    type: 'Action',
    name,
  });
};

javascriptGenerator.forBlock['bt_inverter'] = function (block, generator) {
  const children = collectChildren(block, 'CHILD', generator);

  return JSON.stringify({
    type: 'Inverter',
    child: children[0] ?? null,
  });
};

EXTRA_BT_LOGIC_DEFS.forEach((def) => {
  javascriptGenerator.forBlock[def.blockType] = function (block, generator) {
    const payload = {
      type: def.nodeType,
      id: generateNodeId(),
      children: collectChildren(block, 'CHILDREN', generator),
    };

    def.params.forEach((param) => {
      payload[param.name] = castValue(block.getFieldValue(param.field), param.valueType);
    });

    return JSON.stringify(payload);
  };
});
