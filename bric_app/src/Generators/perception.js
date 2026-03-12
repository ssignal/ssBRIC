import { javascriptGenerator, Order } from "blockly/javascript";

javascriptGenerator.forBlock['c_perception_headsetAngle'] = function(block, generator) {
	const timeout = 10;
	const elementId = 'angleOfHeadset';	
	const code = `getAngleOfHeadset(startGetHeadsetAngle(), updateValueConditional(${timeout}, '${elementId}'))`;
  return [code, Order.NONE];
};

export function initInterpreterGetAngleOfHeadset(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('getAngleOfHeadset');

	const wrapper = interpreter.createNativeFunction(
		function () {
			let value = document.getElementById('angleOfHeadset').value;
			console.log(`current headset angle : ${value}`);
			document.getElementById('angleOfHeadset').value = 'standby';
			return Number(value)/10;
		},
	);
	interpreter.setProperty(globalObject, 'getAngleOfHeadset', wrapper);
}

javascriptGenerator.forBlock['c_perception_hipAngle'] = function(block, generator) {
	const timeout = 10;
	const elementId = 'angleOfLeftHip';	
	const direction = block.getFieldValue('DIRECTION');
	const code = `getAngleOfHip('${direction}', startGetHipAngle(), updateValueConditional(${timeout}, '${elementId}'))`;
  return [code, Order.NONE];
};

export function initInterpreterGetAngleOfHip(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('getAngleOfHip');

	const wrapper = interpreter.createNativeFunction(
		function (direction) {	
			let value;
			direction === 'left' ? value = document.getElementById('angleOfLeftHip').value : value = document.getElementById('angleOfRightHip').value;			
			console.log(`current ${direction} hip angle : ${value}`);
			document.getElementById('angleOfLeftHip').value = 'standby';
			document.getElementById('angleOfRightHip').value = 'standby';
			return Number(value)/10;
		},
	);
	interpreter.setProperty(globalObject, 'getAngleOfHip', wrapper);
}

javascriptGenerator.forBlock['c_perception_wheelSpeed'] = function(block, generator) {
	const timeout = 10;
	const elementId = 'speedOfLeftWheel';	
	const direction = block.getFieldValue('DIRECTION');
	const code = `getSpeedOfWheel('${direction}', updateValueConditional(${timeout}, '${elementId}'))`;
  return [code, Order.NONE];
};

export function initInterpreterGetSpeedOfWheel(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('getSpeedOfWheel');

	const wrapper = interpreter.createNativeFunction(
		function (direction) {	
			let value;
			direction === 'left' ? value = document.getElementById('speedOfLeftWheel').value : value = document.getElementById('speedOfRightWheel').value;			
			console.log(`current ${direction} wheel speed: ${value}]`);
			document.getElementById('speedOfLeftWheel').value = 'standby';
			document.getElementById('speedOfRightWheel').value = 'standby';
			return Number(value);
		},
	);
	interpreter.setProperty(globalObject, 'getSpeedOfWheel', wrapper);
}

javascriptGenerator.forBlock['c_perception_fallDownDetection'] = function(block, generator) {
	const timeout = 1000;
	const elementId = 'isFalldown';	
	const code = `getFalldownStatus(startFallDownDetection(), updateValueConditional(${timeout}, '${elementId}'))`;
  return [code, Order.NONE];
};

export function initInterpreterGetFalldownStatus(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('getFalldownStatus');

	const wrapperGetFalldownStatus = interpreter.createNativeFunction(
		function () {
			let isFalldown = document.getElementById('isFalldown').value;
			console.log('isFalldown:', isFalldown);
			document.getElementById('isFalldown').value = 'standby';
			if(isFalldown === 'false') return false;
			else return true;
	});
	interpreter.setProperty(globalObject, 'getFalldownStatus', wrapperGetFalldownStatus);
}

javascriptGenerator.forBlock['c_perception_pickUpDetection'] = function(block, generator) {
	const timeout = 1000;
	const elementId = 'isPickUp';	
	const code = `getPickupStatus(startPickupDetection(), updateValueConditional(${timeout}, '${elementId}'))`;
  return [code, Order.NONE];
};

export function initInterpreterGetPickupStatus(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('getPickupStatus');

	const wrapperGetPickupStatus = interpreter.createNativeFunction(
		function () {
			let isPickUp = document.getElementById('isPickUp').value;
			console.log('isPickUp:', isPickUp);
			document.getElementById('isPickUp').value = 'standby';
			if(isPickUp === 'false') return false;
			else return true;
	});
	interpreter.setProperty(globalObject, 'getPickupStatus', wrapperGetPickupStatus);
}

javascriptGenerator.forBlock['c_perception_startWakewordDetection'] = function(block, generator) {	
	let code = `startWakewordDetection();\n`;
	return code;
};

javascriptGenerator.forBlock['c_perception_stopWakewordDetection'] = function(block, generator) {	
	let code = `stopWakewordDetection();\n`;
	return code;
};

javascriptGenerator.forBlock['c_perception_wakeWordDetection'] = function(block, generator) {
	const timeout = 1;
	const code = `getWakeWordDetectionStatus(updateRecentValue(${timeout}))`;
  return [code, Order.NONE];
};

export function initInterpreterGetWakeWordDetectionStatus(interpreter, globalObject){
	javascriptGenerator.addReservedWords('getWakeWordDetectionStatus');

	const wrapperGetWakeWordDetectionStatus = interpreter.createNativeFunction(
		function () {      
			let isWakeWordDetected = document.getElementById('isWakeWordDetected').value;
			console.log('isWakeWordDetected:', isWakeWordDetected);
			document.getElementById('isWakeWordDetected').value = 'false';
			if(isWakeWordDetected === 'false') return false;
			else return true;						
	});
	interpreter.setProperty(globalObject, 'getWakeWordDetectionStatus', wrapperGetWakeWordDetectionStatus);
}

javascriptGenerator.forBlock['c_perception_startCamera'] = function(block, generator) {	
	let code = `startCamera();\n`;
	return code;
};

javascriptGenerator.forBlock['c_perception_stopCamera'] = function(block, generator) {	
	let code = `stopCamera();\n`;
	return code;
};

javascriptGenerator.forBlock['c_perception_personDetection'] = function(block, generator) {
	const timeout = 1000;	
	const elementId = 'isPersonDetected';	
	const code = `getPersonDetectionStatus(startPersonDetection(), updateValueConditional(${timeout}, '${elementId}'))`;
  return [code, Order.NONE];
};

export function initInterpreterGetPersonDetectionStatus(interpreter, globalObject){
	javascriptGenerator.addReservedWords('getPersonDetectionStatus');
	
	const wrapperGetPersonDetectionStatus = interpreter.createNativeFunction(
		function () {          
			const isPersonDetected = document.getElementById('isPersonDetected').value;
			console.log('isPersonDetected:', isPersonDetected);
			document.getElementById('isPersonDetected').value = 'standby';
			if(isPersonDetected === 'false') return false;
			else return true;            
	});
	interpreter.setProperty(globalObject, 'getPersonDetectionStatus', wrapperGetPersonDetectionStatus);
}

  