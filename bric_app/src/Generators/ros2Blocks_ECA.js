import { javascriptGenerator } from 'blockly/javascript';
import blockDefs from '../CustomBlocks/blockJson/ros2_command_ai_ECA.json';

const getFieldNames = (def) => {
  const args = Array.isArray(def.args0) ? def.args0 : [];
  return args
    .filter((arg) => arg && typeof arg.name === 'string' && String(arg.type || '').startsWith('field_'))
    .map((arg) => arg.name);
};

const buildParams = (block, def) => {
  const dyn = def.x_dynamic;
  const fieldNames = getFieldNames(def);
  if (!dyn) {
    const params = {};
    fieldNames.forEach((name) => {
      params[name] = block.getFieldValue(name);
    });
    return params;
  }

  const params = {};
  const root = dyn.root_field;
  const rootValue = String(block.getFieldValue(root));
  params[root] = rootValue;

  const activeChildren = new Set((dyn.child_fields_by_value && dyn.child_fields_by_value[rootValue]) || []);
  const allChildren = new Set(dyn.all_child_fields || []);

  fieldNames.forEach((name) => {
    if (name === root) return;
    if (allChildren.has(name)) {
      if (activeChildren.has(name)) {
        params[name] = block.getFieldValue(name);
      }
      return;
    }
    params[name] = block.getFieldValue(name);
  });
  return params;
};

const registerGenerator = (def) => {
  if (!def || !def.type) return;
  javascriptGenerator.forBlock[def.type] = function (block) {
    const message = {
      blockType: def.type,
      parameters: buildParams(block, def),
    };
    return `console.log(${JSON.stringify(JSON.stringify(message))});\n`;
  };
};

(Array.isArray(blockDefs) ? blockDefs : []).forEach(registerGenerator);

export { blockDefs as ros2BlocksECA };
