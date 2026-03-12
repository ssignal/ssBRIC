import { javascriptGenerator } from "blockly/javascript";
import { Order } from 'blockly/javascript';

javascriptGenerator.forBlock['c_loop_repeat_infinitely'] = function(block, generator) {
	let addLoopTrap = 'setLoopTrapCounter();\n';
	let branch = generator.statementToCode(block, 'DO');
	branch += generator.INDENT + 'checkLoopTrapCounter();\n';
	branch += generator.INDENT + 'printLoopTrapCounter();\n';
	// branch += generator.INDENT + `highlightBlock('${block.id}');\n`;
	// branch = generator.addLoopTrap(branch, block);
	
// 	const repeatInfinitely = generator.provideFunction_(
// 		'repeatInfinitely',				
// 		`function ${generator.FUNCTION_NAME_PLACEHOLDER_}() {
//   setLoopTrapCounter();
//   while(1){
//     checkLoopTrapCounter();
//     printLoopTrapCounter();\n
//   ${branch}
//   }
// }`		
// 	);
// 	const code = `${repeatInfinitely}();\n`;
// 	return code;
	const code = addLoopTrap + 'while(1){\n' + branch + '}\n';
	return code;
};

javascriptGenerator.forBlock['c_loop_repeat_until'] = function(block, generator) {
	let argument0 = generator.valueToCode(block, 'UNTIL', Order.LOGICAL_NOT);
	argument0 = '!' + argument0;

	let addLoopTrap = 'setLoopTrapCounter();\n';
	let branch = generator.statementToCode(block, 'DO');
	branch += generator.INDENT + 'checkLoopTrapCounter();\n';
	branch += generator.INDENT + 'printLoopTrapCounter();\n';
	// branch += generator.INDENT + `highlightBlock('${block.id}');\n`;
  // branch = generator.addLoopTrap(branch, block);

  return addLoopTrap + 'while (' + argument0 + ') {\n' + branch + '}\n';
};

javascriptGenerator.forBlock['c_loop_repeat_while'] = function(block, generator) {
	let argument0 = generator.valueToCode(block, 'WHILE', Order.NONE);
	
	let addLoopTrap = 'setLoopTrapCounter();\n';
	let branch = generator.statementToCode(block, 'DO');
	branch += generator.INDENT + 'checkLoopTrapCounter();\n';
	branch += generator.INDENT + 'printLoopTrapCounter();\n';
	// branch += generator.INDENT + `highlightBlock('${block.id}');\n`;
  // branch = generator.addLoopTrap(branch, block);
  return addLoopTrap + 'while (' + argument0 + ') {\n' + branch + '}\n';
};

javascriptGenerator.forBlock['c_loop_continue'] = function(block, generator) {
	let code = 'continue;\n';
	return code;
};

javascriptGenerator.forBlock['c_loop_break'] = function(block, generator) {
	let code = 'break;\n';
	return code;
};

export function initInterpreterSetLoopTrapCounter(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('setLoopTrapCounter');

	const wrapper = interpreter.createNativeFunction(
		function () {
			window.LoopTrap = 1000;
		},
	);
	interpreter.setProperty(globalObject, 'setLoopTrapCounter', wrapper);
}

export function initInterpreterCheckLoopTrapCounter(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('checkLoopTrapCounter');

	const wrapper = interpreter.createNativeFunction(
		function () {						
			if(--window.LoopTrap === 0) {
				alert("Infinite loop.");
				throw new Error("Infinite loop.");				
			}			
		},
	);
	interpreter.setProperty(globalObject, 'checkLoopTrapCounter', wrapper);
}

export function initInterpreterPrintLoopTrapCounter(interpreter, globalObject) {
	// Ensure function name does not conflict with variable names.
	javascriptGenerator.addReservedWords('printLoopTrapCounter');

	const wrapper = interpreter.createNativeFunction(
		function () {
			console.log('loop trap counter:',window.LoopTrap);
		},
	);
	interpreter.setProperty(globalObject, 'printLoopTrapCounter', wrapper);
}
