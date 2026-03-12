import Blockly from 'blockly/core';
import '@blockly/field-angle';
import '@blockly/field-slider';

// block type naming rule : {toolbox_name}_{block_description}

const volumeControlJson = {
	"message0": "set volume to %1",
	"args0": [
		{
			"type": "field_slider",
			"name": "VOLUME",
			"min": 1,
			"max": 10,
			"value": 6,
			"precision": 1
		},
	],
	"previousStatement": null,
	"nextStatement": null,
	"style": "developer_blocks",
}

Blockly.Blocks['c_developer_volumeControl'] = {
	init: function() {
		this.jsonInit(volumeControlJson);
	}
}

const initPoseJson = {
	"message0": "set robot in neutral pose",
	"inputsInline": false,
	"previousStatement": null,
	"nextStatement": null,
	"style": "developer_blocks",
}

Blockly.Blocks['c_developer_initPose'] = {
	init: function() {
		this.jsonInit(initPoseJson);
	}
}

const batteryLevelJson = {
	"message0": "battery level",
	"output": "Number",
	"style": "developer_blocks"
}

Blockly.Blocks['c_developer_batteryLevel'] = {
	init: function() {
		this.jsonInit(batteryLevelJson);
	}
}

const sendMotorInputJson = {
	"message0": "wheel speed linear: %1 angular: %2 %3",
	"args0": [
		{
			"type": "field_slider",
			"name": "WHEEL_LINEAR",
			"min": -0.3,
			"max": 1.2,
			"value": 0,
			"precision": 0.1
		},
		{
			"type": "field_slider",
			"name": "WHEEL_ANGULAR",
			"min": -0.34,
			"max": 0.34,
			"value": 0,
			"precision": 0.01
		},
		{
      "type": "input_end_row"
    }
	],
	"message1": "hip angle left: %1 right: %2 speed: %3 %4",
	"args1": [
		{
			"type": "field_angle",
			"name": "HIP_L",
			"min": 0,
			"max": 22,
			"value": 10,
			"precision": 0.1,
			"clockwise": true,
			"offset": 90,
			"displayMin": 0,
			"displayMax": 28,
			"minorTick": 1,
			"majorTick": 7
		},
		{
			"type": "field_angle",
			"name": "HIP_R",
			"min": 0,
			"max": 22,
			"value": 10,
			"precision": 0.1,
			"clockwise": true,
			"offset": 90,
			"displayMin": 0,
			"displayMax": 28,
			"minorTick": 1,
			"majorTick": 7
		},
		{
			"type": "field_slider",
			"name": "HIP_SPEED",
			"min": 0,
			"max": 8,
			"value": 6,
			"precision": 1,			
		},
		{
      "type": "input_end_row"
    }
	],
	"message2": "headset angle: %1 speed: %2",
	"args2": [		
		{
			"type": "field_angle",
			"name": "HEADSET",
			"min": 0,
			"max": 240,
			"value": 160,
			"precision": 0.1,
			"clockwise": true,
			"offset": 90,
			"displayMin": 0,
			"displayMax": 280,
			"minorTick": 10,
			"majorTick": 70
		},
		{
			"type": "field_slider",
			"name": "HEADSET_SPEED",
			"min": 0,
			"max": 48,
			"value": 20,
			"precision": 1,			
		},
	],
	"previousStatement": null,
	"nextStatement": null,
	"style": "developer_blocks",
}

Blockly.Blocks['c_developer_sendMotorInput'] = {
	init: function() {
		this.jsonInit(sendMotorInputJson);
	}
}

const printJson = {
	"implicitAlign0": "CENTRE",
	"message0": 'print %1',
	"args0": [
		{
			"type": "input_value",
			"name": "TEXT",
		}
	],
	"previousStatement": null,
	"nextStatement": null,
	"style": "developer_blocks",
}

Blockly.Blocks['c_developer_print'] = {
	init: function() {
		this.jsonInit(printJson);
	}
}

const rootCheckerJson = {
	"message0": "rootChecker",
	"inputsInline": false,
	"previousStatement": null,
	"nextStatement": null,
	"style": "developer_blocks",
}

Blockly.Blocks['c_developer_rootChecker'] = {
	init: function() {
		this.jsonInit(rootCheckerJson);
	},

	checkRootBlock: function() {
		let root = this.getRootBlock();
		return root.type;
	},

	onchange: function(e) {		
		if (this.workspace.isDragging()) return;
		if (e.type !== Blockly.Events.BLOCK_MOVE) return;
		
		if (this.checkRootBlock() !== 'c_program_start') {			
			this.setEnabled(false);
			this.setWarningText('Need to be attached to the start block tree.');
		} else {
			this.setEnabled(true);
			this.setWarningText('');
		}		
	}
}

// Extensions and Mutators