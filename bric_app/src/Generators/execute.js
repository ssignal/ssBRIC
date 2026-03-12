import { javascriptGenerator } from "blockly/javascript";
import { Order } from 'blockly/javascript';

javascriptGenerator.forBlock['c_execute_rotateHeadset'] = function(block, generator) {	
	let targetAngle = block.getFieldValue('ANGLE');				
	let code = `rotateHeadset(${targetAngle});\nheadsetMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_rotateHeadsetWithSpeed'] = function(block, generator) {	
	let targetAngle = block.getFieldValue('ANGLE');			
	let seconds = block.getFieldValue('SECOND');
	let code = `rotateHeadset(${targetAngle}, ${seconds});\nheadsetMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveOneHip'] = function(block, generator) {	
	let selectedHip = block.getFieldValue('HIP');
	let targetAngle = block.getFieldValue('ANGLE');	
	let code = `moveOneHip('${selectedHip}', ${targetAngle});\nhipMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveOneHipWithSpeed'] = function(block, generator) {	
	let selectedHip = block.getFieldValue('HIP');
	let targetAngle = block.getFieldValue('ANGLE');	
	let selectedSpeed = block.getFieldValue('SPEED');
	let code = `moveOneHip('${selectedHip}', ${targetAngle}, '${selectedSpeed}');\nhipMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveBothHip'] = function(block, generator) {		
	let targetAngleL = block.getFieldValue('LEFT');			
	let targetAngleR = block.getFieldValue('RIGHT');	
	let code = `moveBothHip(${targetAngleL}, ${targetAngleR});\nhipMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveBothHipWithSpeed'] = function(block, generator) {		
	let targetAngleL = block.getFieldValue('LEFT');			
	let targetAngleR = block.getFieldValue('RIGHT');		
	let selectedSpeed = block.getFieldValue('SPEED');
	let code = `moveBothHip(${targetAngleL}, ${targetAngleR}, '${selectedSpeed}');\nhipMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_tiltBody'] = function(block, generator) {		
	let direction = block.getFieldValue('DIRECTION');
	let targetAngle = block.getFieldValue('ANGLE');	
	let code = `tiltBody('${direction}', ${targetAngle});\nhipMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_tiltBodyWithSpeed'] = function(block, generator) {		
	let direction = block.getFieldValue('DIRECTION');
	let targetAngle = block.getFieldValue('ANGLE');	
	let selectedSpeed = block.getFieldValue('SPEED');
	let code = `tiltBody('${direction}', ${targetAngle}, '${selectedSpeed}');\nhipMotionFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveHeadsetAndHip'] = function(block, generator) {		
	let targetAngleOfHeadset = block.getFieldValue('ANGLE');			
	let targetAngleOfHipL = block.getFieldValue('LEFT');			
	let targetAngleOfHipR = block.getFieldValue('RIGHT');		
	let options = `{targetAngleOfHeadset: ${targetAngleOfHeadset}, targetAngleOfHipL: ${targetAngleOfHipL},	targetAngleOfHipR: ${targetAngleOfHipR}}`	
	let code = 'moveHeadsetAndHip(' + options + ');\nheadsetHipMotionFinishChecker();\n';
	return code;
};

javascriptGenerator.forBlock['c_execute_moveHeadsetAndHipWithSpeed'] = function(block, generator) {		
	let targetAngleOfHeadset = block.getFieldValue('ANGLE');			
	let seconds = block.getFieldValue('SECOND');
	let targetAngleOfHipL = block.getFieldValue('LEFT');			
	let targetAngleOfHipR = block.getFieldValue('RIGHT');		
	let selectedSpeed = block.getFieldValue('SPEED');
	let options = `{targetAngleOfHeadset:${targetAngleOfHeadset}, seconds:${seconds}, targetAngleOfHipL:${targetAngleOfHipL}, targetAngleOfHipR:${targetAngleOfHipR}, selectedSpeed:'${selectedSpeed}'}`	
	let code = 'moveHeadsetAndHip(' + options + ');\nheadsetHipMotionFinishChecker();\n';
	return code;
};

javascriptGenerator.forBlock['c_execute_spinInPlace'] = function(block, generator) {	
	let direction = block.getFieldValue('DIRECTION');
	let speed = Number(block.getFieldValue('SPEED'));
	let code = `spinInPlace('${direction}', ${speed});\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_spinDegrees'] = function(block, generator) {	
	let angle = block.getFieldValue('ANGLE');
	let direction = block.getFieldValue('DIRECTION');
	let code = `spinDegrees('${direction}', ${angle});\nwheelMoveFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_spinDegreesWithSpeed'] = function(block, generator) {	
	let angle = block.getFieldValue('ANGLE');
	let direction = block.getFieldValue('DIRECTION');
	let selectedSpeed = block.getFieldValue('SPEED');
	let code = `spinDegrees('${direction}', ${angle}, '${selectedSpeed}');\nwheelMoveFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveBackOrForth'] = function(block, generator) {	
	let direction = block.getFieldValue('DIRECTION');
	let speed = Number(block.getFieldValue('SPEED'));	
	let code = `moveBackOrForth('${direction}', ${speed});\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveDistance'] = function(block, generator) {	
	let direction = block.getFieldValue('DIRECTION');
	let distance = block.getFieldValue('DISTANCE');	
	let code = `moveDistance('${direction}', ${distance});\nwheelMoveFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveDistanceWithSpeed'] = function(block, generator) {	
	let direction = block.getFieldValue('DIRECTION');
	let distance = block.getFieldValue('DISTANCE');	
	let speed = Number(block.getFieldValue('SPEED'));	
	let code = `moveDistance('${direction}', ${distance}, ${speed});\nwheelMoveFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_spinDegreesAndMove'] = function(block, generator) {	
	let angle = block.getFieldValue('ANGLE');
	let directionLR = block.getFieldValue('DIRECTION1');
	let directionFB = block.getFieldValue('DIRECTION2');
	let distance = block.getFieldValue('DISTANCE');	
	let code = `spinDegrees('${directionLR}', ${angle});\nwheelMoveFinishChecker();\nmoveDistance('${directionFB}', ${distance});\nwheelMoveFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_moveAlongTurningRadius'] = function(block, generator) {	
	let direction = block.getFieldValue('DIRECTION');
	let radius = block.getFieldValue('RADIUS');	
	let code = `moveAlongTurningRadius('${direction}', ${radius});\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_stopHeadset'] = function(block, generator) {	
	let code = `stopHeadset();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_stopHip'] = function(block, generator) {	
	let code = `stopHip();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_stopWheel'] = function(block, generator) {	
	let code = `stopWheel();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_stopAllMovement'] = function(block, generator) {	
	let code = `stopAllMovement();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_facialExpression'] = function(block, generator) {
	let facialExpression = block.getFieldValue('FACE');	
	let code = `startFacialExpression('${facialExpression}');\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_playSoundEmotionSync'] = function(block, generator) {
	let sound = block.getFieldValue('SOUND');	
	let code = `playSound('${sound}');\nsoundFinishChecker();\n`;
	return code;
};

javascriptGenerator.forBlock['c_execute_playSoundEmotionAsync'] = function(block, generator) {
	let sound = block.getFieldValue('SOUND');	
	let code = `playSound('${sound}');\n`;
	return code;
}

javascriptGenerator.forBlock['c_execute_playTTSSync'] = function(block, generator) {
	const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";	
	const code = `playTTS(${text});\nsoundFinishChecker();\n`;
	return code;
}; 

javascriptGenerator.forBlock['c_execute_playTTSAsync'] = function(block, generator) {
	const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";	
	const code = `playTTS(${text});\n`;
	return code;
}; 