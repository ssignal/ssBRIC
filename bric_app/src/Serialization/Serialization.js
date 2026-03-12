import * as Blockly from 'blockly/core';

/**
 * Saves the state of the workspace to browser's local storage.
 * @param {Blockly.Workspace} workspace Blockly workspace to save.
 */
export const saveWorkspace = function(workspace, workspaceName) {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(workspaceName, JSON.stringify(data));
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 */
export const loadWorkspace = function(workspace, workspaceName) {
  const data = window.localStorage?.getItem(workspaceName);
  if (!data) return;

  // Don't emit events during loading.
  Blockly.Events.disable();
  Blockly.serialization.workspaces.load(JSON.parse(data), workspace, false);
  Blockly.Events.enable();
};
