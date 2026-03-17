import * as Blockly from 'blockly';

function enforceSingleRootChild(block) {
  const rootBlock = block.getInputTargetBlock('ROOT');
  if (!rootBlock) {
    block.setWarningText('');
    return;
  }

  const extraRoot = rootBlock.getNextBlock();
  if (!extraRoot) {
    block.setWarningText('');
    return;
  }

  if (rootBlock.nextConnection && rootBlock.nextConnection.isConnected()) {
    rootBlock.nextConnection.disconnect();
  }

  block.setWarningText('bt_root accepts only one root block.');
}

const EXTRA_BT_LOGIC_DEFS = [
  { blockType: 'bt_fallback', nodeType: 'Fallback', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_ifthenelse', nodeType: 'IfThenElse', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_parallel', nodeType: 'Parallel', params: [{ name: 'threshold', field: 'THRESHOLD', defaultValue: '0' }, { name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_pipelinesequence', nodeType: 'PipelineSequence', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_pipelineselect', nodeType: 'PipelineSelect', params: [{ name: 'index', field: 'INDEX', defaultValue: '1' }, { name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_reactivefallback', nodeType: 'ReactiveFallback', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_reactivesequence', nodeType: 'ReactiveSequence', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_recovery', nodeType: 'Recovery', params: [{ name: 'attempt', field: 'ATTEMPT', defaultValue: '0' }, { name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_sequencestar', nodeType: 'SequenceStar', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_delay', nodeType: 'Delay', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_forcesuccess', nodeType: 'ForceSuccess', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_forcefailure', nodeType: 'ForceFailure', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_inverse', nodeType: 'Inverse', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_loop', nodeType: 'Loop', params: [{ name: 'repeat', field: 'REPEAT', defaultValue: '0' }, { name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_retry', nodeType: 'Retry', params: [{ name: 'attempt', field: 'ATTEMPT', defaultValue: '0' }, { name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_retryuntilsuccess', nodeType: 'RetryUntilSuccess', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_repeat', nodeType: 'Repeat', params: [{ name: 'repeat', field: 'REPEAT', defaultValue: '0' }, { name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
  { blockType: 'bt_timeout', nodeType: 'Timeout', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }, { name: 'timeout', field: 'TIMEOUT', defaultValue: '1' }] },
  { blockType: 'bt_whiledoelse', nodeType: 'WhileDoElse', params: [{ name: 'tickrate', field: 'TICKRATE', defaultValue: '0' }] },
];

function registerExtraBtLogicBlock(def) {
  Blockly.Blocks[def.blockType] = {
    init: function () {
      this.appendDummyInput().appendField(def.nodeType);
      def.params.forEach((param) => {
        this.appendDummyInput()
          .appendField(param.name)
          .appendField(new Blockly.FieldTextInput(param.defaultValue), param.field);
      });
      this.appendStatementInput('CHILDREN')
        .setCheck('BT_NODE')
        .appendField('children');
      this.setPreviousStatement(true, 'BT_NODE');
      this.setNextStatement(true, 'BT_NODE');
      this.setColour(160);
      this.setTooltip(`${def.nodeType} BT node`);
    },
  };
}

Blockly.Blocks['bt_program_start'] = {
  init: function () {
    this.appendDummyInput().appendField('BT Program');

    this.appendStatementInput('ROOT').setCheck('BT_NODE').appendField('root');

    this.setColour(20);
    this.setTooltip('Behavior Tree root');
    this.setDeletable(false);
    this.setMovable(false);
  },

  onchange: function (event) {
    if (!this.workspace || this.workspace.isDragging()) return;
    if (
      event &&
      ![
        Blockly.Events.BLOCK_MOVE,
        Blockly.Events.BLOCK_CREATE,
        Blockly.Events.BLOCK_CHANGE,
      ].includes(event.type)
    ) {
      return;
    }
    enforceSingleRootChild(this);
  },
};

Blockly.Blocks['bt_sequence'] = {
  init: function () {
    this.appendDummyInput().appendField('Sequence');

    this.appendStatementInput('CHILDREN')
      .setCheck('BT_NODE')
      .appendField('children');

    this.setPreviousStatement(true, 'BT_NODE');
    this.setNextStatement(true, 'BT_NODE');
    this.setColour(160);
    this.setTooltip('Run children in order until one fails or runs');
  },
};

Blockly.Blocks['bt_selector'] = {
  init: function () {
    this.appendDummyInput().appendField('Selector');

    this.appendStatementInput('CHILDREN')
      .setCheck('BT_NODE')
      .appendField('children');

    this.setPreviousStatement(true, 'BT_NODE');
    this.setNextStatement(true, 'BT_NODE');
    this.setColour(210);
    this.setTooltip('Try children in order until one succeeds or runs');
  },
};

Blockly.Blocks['bt_condition'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Condition')
      .appendField(new Blockly.FieldTextInput('isBatteryLow'), 'NAME');

    this.setPreviousStatement(true, 'BT_NODE');
    this.setNextStatement(true, 'BT_NODE');
    this.setColour(65);
    this.setTooltip('Condition leaf node');
  },
};

Blockly.Blocks['bt_action'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Action')
      .appendField(new Blockly.FieldTextInput('moveToTarget'), 'NAME');

    this.setPreviousStatement(true, 'BT_NODE');
    this.setNextStatement(true, 'BT_NODE');
    this.setColour(290);
    this.setTooltip('Action leaf node');
  },
};

Blockly.Blocks['bt_inverter'] = {
  init: function () {
    this.appendDummyInput().appendField('Inverter');

    this.appendStatementInput('CHILD').setCheck('BT_NODE').appendField('child');

    this.setPreviousStatement(true, 'BT_NODE');
    this.setNextStatement(true, 'BT_NODE');
    this.setColour(120);
    this.setTooltip('Decorator that inverts success/failure');
  },
};

EXTRA_BT_LOGIC_DEFS.forEach(registerExtraBtLogicBlock);
