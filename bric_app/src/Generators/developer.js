import { javascriptGenerator } from "blockly/javascript";
import { Order } from 'blockly/javascript';

javascriptGenerator.forBlock['c_developer_volumeControl'] = function(block, generator) {	
	let volume = block.getFieldValue('VOLUME');	
	let code = `volumeControl(${volume});\n`;
	return code;
};

javascriptGenerator.forBlock['c_developer_initPose'] = function(block, generator) {	
	let code = `initPose();\n`;
	return code;
};

javascriptGenerator.forBlock['c_developer_batteryLevel'] = function(block, generator) {
	const timeout = 1000;
	const elementId = 'batteryLevel';		
	const code = `getBatteryLevel(startGetBatteryInfo(),updateValueConditional(${timeout}, '${elementId}'))`;
  return [code, Order.NONE];
};

export function initInterpreterGetBatteryLevel(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('getBatteryLevel');

	const wrapper = interpreter.createNativeFunction(
		function () {
			let value = document.getElementById('batteryLevel').value;
			console.log('batteryLevel:', value);
			document.getElementById('batteryLevel').value = 'standby';
			return Number(value);
		},
	);
	interpreter.setProperty(globalObject, 'getBatteryLevel', wrapper);
}

javascriptGenerator.forBlock['c_developer_print'] = function(block, generator) {
	const msg = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";	
	const code = 'alert(' + msg + ');\n';
  return code;
}; 

export function initInterpreterAlert(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('alert');

	const wrapper = interpreter.createNativeFunction(
		function alert(text) {
			// return window.alert(text);
			return console.log(text);
		}
	);
	interpreter.setProperty(globalObject, 'alert', wrapper);
}

javascriptGenerator.forBlock['c_developer_rootChecker'] = function(block, generator) {
	let code = 'function(){};\n';
	return code;
};

javascriptGenerator.forBlock['c_developer_sendMotorInput'] = function(block, generator) {
	let wheelLinearSpeed = block.getFieldValue('WHEEL_LINEAR');	
	let wheelAngularSpeed = block.getFieldValue('WHEEL_ANGULAR');	
	let hipLeft = block.getFieldValue('HIP_L');	
	let hipRight = block.getFieldValue('HIP_R');	
	let hipSpeed = Number(block.getFieldValue('HIP_SPEED'));
	let headset = block.getFieldValue('HEADSET');	
	let headsetSpeed = Number(block.getFieldValue('HEADSET_SPEED'));
	
	// console.log('selected face expression:', number);
	let code = `sendMotorInput(${wheelLinearSpeed}, ${wheelAngularSpeed}, ${hipLeft}, ${hipRight}, ${hipSpeed}, ${headset}, ${headsetSpeed});\n`;
	return code;
};

javascriptGenerator.forBlock['c_developer_text_length'] = javascriptGenerator.forBlock['text_length'];
