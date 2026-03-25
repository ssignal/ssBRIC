(() => {
  const refs = {
    pageMain: document.getElementById('page-main'),
    pageEdit: document.getElementById('page-edit'),
    brandHome: document.getElementById('brand-home'),
    scenarioList: document.getElementById('scenario-list'),
    scenarioName: document.getElementById('scenario-name'),
    updateResult: document.getElementById('update-result'),
    errorList: document.getElementById('error-list'),
    jsonOutput: document.getElementById('json-output'),
    jsonModal: document.getElementById('json-modal'),
    jsonModalText: document.getElementById('json-modal-text'),
    btnJsonTree: document.getElementById('btn-json-tree'),
    btnJsonConfirm: document.getElementById('btn-json-confirm'),
    treeModal: document.getElementById('tree-modal'),
    treeCanvasWrap: document.getElementById('tree-canvas-wrap'),
    treeCanvas: document.getElementById('tree-canvas'),
    btnTreeZoomIn: document.getElementById('btn-tree-zoom-in'),
    btnTreeZoomOut: document.getElementById('btn-tree-zoom-out'),
    btnTreeJson: document.getElementById('btn-tree-json'),
    btnTreeConfirm: document.getElementById('btn-tree-confirm'),
    toast: document.getElementById('toast'),
    blocklyDiv: document.getElementById('blocklyDiv'),
  };

  let workspace = null;
  let moduleManifest = null;
  let editingOriginalScenarioName = '';
  let renameSourceName = '';
  let renameInlineEditor = null;
  let inlineEditMode = '';
  let inlineCommitInProgress = false;
  let tempCopyOptionValue = '';
  let copyScenarioData = null;
  let startPlayIdDefault = 2000;
  let startPlayNextId = 2000;
  let startPlayBlockTypes = new Set();
  let startPlayAssignedIds = new Map();
  let treeScene = null;
  const treeView = {
    scale: 1,
    tx: 0,
    ty: 0,
    panning: false,
    lastX: 0,
    lastY: 0,
  };

  const legacyViewTree = document.getElementById('btn-view-tree');
  if (legacyViewTree) {
    legacyViewTree.remove();
  }

  function toast(message) {
    refs.toast.textContent = message;
    refs.toast.classList.add('show');
    setTimeout(() => refs.toast.classList.remove('show'), 2400);
  }

  async function api(path, options = {}) {
    const res = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    let payload = {};
    if (contentType.includes('application/json')) {
      payload = await res.json();
    } else {
      const text = await res.text();
      payload = { ok: false, error: text || `Request failed: ${path}` };
    }
    if (!res.ok || payload.ok === false) {
      const message = payload.error || `Request failed: ${path}`;
      console.error('[API ERROR]', {
        path,
        status: res.status,
        statusText: res.statusText,
        message,
        payload,
      });
      throw new Error(message);
    }
    return payload;
  }

  function showPage(page) {
    const onMain = page === 'main';
    refs.pageMain.classList.toggle('active', onMain);
    refs.pageEdit.classList.toggle('active', !onMain);
    if (!onMain && workspace) {
      Blockly.svgResize(workspace);
    }
  }

  function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve(true)));
  }

  function placeBlockNearTopLeft(block) {
    if (!workspace || !block || block.isDisposed()) {
      return;
    }
    const targetX = 40;
    const targetY = 40;
    if (
      typeof block.moveTo === 'function' &&
      Blockly.utils &&
      Blockly.utils.Coordinate
    ) {
      block.moveTo(new Blockly.utils.Coordinate(targetX, targetY));
      return;
    }
    const current = block.getRelativeToSurfaceXY();
    block.moveBy(targetX - current.x, targetY - current.y);
  }

  function rootBlockColor() {
    return '#8c564b';
  }

  function clearErrors() {
    if (!refs.errorList) {
      return;
    }
    refs.errorList.innerHTML = '';
  }

  function renderErrors(errors) {
    if (!refs.errorList) {
      return;
    }
    clearErrors();
    (errors || []).forEach((err) => {
      const li = document.createElement('li');
      li.textContent = err;
      refs.errorList.appendChild(li);
    });
  }

  function selectedScenarioName() {
    const option = refs.scenarioList.options[refs.scenarioList.selectedIndex];
    return option ? option.value : '';
  }

  function clearInlineRenameEditor(focusList = false) {
    if (renameInlineEditor) {
      const node = renameInlineEditor;
      renameInlineEditor = null;
      if (node.parentNode) {
        try {
          node.parentNode.removeChild(node);
        } catch (err) {
          // Ignore race condition when blur/enter handlers try to remove twice.
        }
      }
    }
    if (focusList && refs.scenarioList) {
      refs.scenarioList.focus();
    }
  }

  function removeTempCopyOption() {
    if (!tempCopyOptionValue || !refs.scenarioList) {
      return;
    }
    const options = Array.from(refs.scenarioList.options);
    const target = options.find((opt) => opt.value === tempCopyOptionValue);
    if (target) {
      target.remove();
    }
    tempCopyOptionValue = '';
  }

  function resetInlineEditState() {
    renameSourceName = '';
    inlineEditMode = '';
    inlineCommitInProgress = false;
    copyScenarioData = null;
  }

  function positionInlineRenameEditor() {
    if (!renameInlineEditor || !refs.scenarioList) {
      return;
    }
    const idx = refs.scenarioList.selectedIndex;
    if (idx < 0) {
      clearInlineRenameEditor(true);
      return;
    }
    const rect = refs.scenarioList.getBoundingClientRect();
    const size =
      Number.parseInt(refs.scenarioList.getAttribute('size') || '1', 10) || 1;
    const rowH = refs.scenarioList.clientHeight / size;
    const top = rect.top + idx * rowH - refs.scenarioList.scrollTop + 4;
    const editorH = Math.max(26, Math.round(rowH + 6));
    renameInlineEditor.style.left = `${Math.round(rect.left + 2)}px`;
    renameInlineEditor.style.top = `${Math.round(top + 1)}px`;
    // Keep right-side space so the list scrollbar remains visible/usable.
    renameInlineEditor.style.width = `${Math.max(40, Math.round(rect.width - 18))}px`;
    renameInlineEditor.style.height = `${editorH}px`;
    renameInlineEditor.style.lineHeight = `${editorH}px`;
    renameInlineEditor.style.fontSize = window.getComputedStyle(
      refs.scenarioList,
    ).fontSize;
  }

  function beginRenameEdit(
    mode = 'rename',
    sourceNameOverride = '',
    displayValue = '',
  ) {
    const name = selectedScenarioName();
    if (!name) {
      toast('Select a scenario first.');
      return;
    }
    renameSourceName = sourceNameOverride || name;
    inlineEditMode = mode;
    clearInlineRenameEditor(false);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'scenario-rename-inline';
    input.value = displayValue || name;
    input.addEventListener('keydown', async (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        clearInlineRenameEditor(true);
        if (inlineEditMode === 'copy') {
          removeTempCopyOption();
        }
        resetInlineEditState();
        return;
      }
      if (event.key !== 'Enter') {
        return;
      }
      event.preventDefault();
      inlineCommitInProgress = true;
      try {
        if (inlineEditMode === 'copy') {
          await copyScenario(input.value);
        } else {
          await renameScenario(input.value);
        }
      } catch (err) {
        toast(
          err.message ||
            (inlineEditMode === 'copy' ? 'Copy failed' : 'Rename failed'),
        );
      } finally {
        inlineCommitInProgress = false;
      }
    });
    input.addEventListener('blur', () => {
      if (inlineCommitInProgress) {
        return;
      }
      if (renameInlineEditor !== input) {
        return;
      }
      clearInlineRenameEditor(false);
      if (inlineEditMode === 'copy') {
        removeTempCopyOption();
      }
      resetInlineEditState();
    });

    renameInlineEditor = input;
    document.body.appendChild(renameInlineEditor);
    positionInlineRenameEditor();
    renameInlineEditor.focus();
    renameInlineEditor.select();
  }

  function keepInlineRenamePosition() {
    if (!renameInlineEditor) {
      return;
    }
    positionInlineRenameEditor();
  }

  async function refreshScenarioList(preferredName = '') {
    const prev = preferredName || selectedScenarioName();
    const data = await api('/api/scenarios');
    refs.scenarioList.innerHTML = '';
    data.items.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.name;
      option.textContent = item.name;
      refs.scenarioList.appendChild(option);
    });
    if (prev) {
      refs.scenarioList.value = prev;
    }
    if (
      refs.scenarioList.selectedIndex < 0 &&
      refs.scenarioList.options.length > 0
    ) {
      refs.scenarioList.selectedIndex = 0;
    }
    if (renameInlineEditor) {
      clearInlineRenameEditor(false);
      resetInlineEditState();
    }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }

  async function loadBlocklyAssets(forceReload) {
    if (!forceReload && moduleManifest) {
      return;
    }

    moduleManifest = await fetch('/static/generated/manifest.json').then((r) =>
      r.json(),
    );
    const cache = `?v=${Date.now()}`;

    window.BRIC = { blockRegistrars: [], generatorRegistrars: [] };
    await loadScript(`/static/generated/Toolbox/toolboxCustomBasic.js${cache}`);
    await loadScript(`/static/generated/Theme/themeForCustomBasic.js${cache}`);

    for (const file of moduleManifest.custom_modules || []) {
      await loadScript(`/static/generated/CustomBlocks/${file}${cache}`);
    }
    for (const file of moduleManifest.generator_modules || []) {
      await loadScript(`/static/generated/Generators/${file}${cache}`);
    }

    (window.BRIC.blockRegistrars || []).forEach((fn) => fn());
    (window.BRIC.generatorRegistrars || []).forEach((fn) => fn());
    rebuildStartPlayBlockConfig();
  }

  function rebuildStartPlayBlockConfig() {
    startPlayBlockTypes = new Set();
    startPlayIdDefault = 2000;
    startPlayNextId = startPlayIdDefault;
    startPlayAssignedIds = new Map();

    const behavior = (moduleManifest && moduleManifest.behavior) || [];
    behavior.forEach((item) => {
      const action = String(item.action || '');
      const category = String(item.category || '');
      if (!action.includes('start_play')) {
        return;
      }
      if (category !== 'Sound') {
        return;
      }
      const blockType = String(item.block_type || '');
      if (!blockType) {
        return;
      }
      startPlayBlockTypes.add(blockType);
      const args0 = ((item || {}).json || {}).args0 || [];
      const idArg = args0.find((arg) => arg && arg.name === 'PARAM_ID');
      const parsed = Number.parseInt(idArg && idArg.text, 10);
      if (Number.isFinite(parsed)) {
        startPlayIdDefault = parsed;
      }
    });
    startPlayNextId = startPlayIdDefault;
  }

  function isStartPlayBlock(block) {
    return !!(block && startPlayBlockTypes.has(block.type));
  }

  function refreshStartPlayIdState() {
    if (!workspace || !startPlayBlockTypes.size) {
      return;
    }
    const blocks = workspace
      .getAllBlocks(false)
      .filter((b) => isStartPlayBlock(b));
    if (!blocks.length) {
      startPlayAssignedIds.clear();
      startPlayNextId = startPlayIdDefault;
      return;
    }

    const alive = new Set(blocks.map((b) => b.id));
    const nextMap = new Map();
    let maxAssigned = startPlayIdDefault - 1;

    startPlayAssignedIds.forEach((val, id) => {
      if (!alive.has(id)) {
        return;
      }
      nextMap.set(id, val);
      maxAssigned = Math.max(maxAssigned, val);
    });

    blocks.forEach((block) => {
      if (nextMap.has(block.id)) {
        return;
      }
      const current = Number.parseInt(block.getFieldValue('PARAM_ID'), 10);
      if (Number.isFinite(current)) {
        nextMap.set(block.id, current);
        maxAssigned = Math.max(maxAssigned, current);
      }
    });

    startPlayAssignedIds = nextMap;
    startPlayNextId = Math.max(startPlayIdDefault, maxAssigned + 1);
  }

  function assignStartPlayId(block) {
    if (!isStartPlayBlock(block)) {
      return;
    }
    const field = block.getField('PARAM_ID');
    if (!field) {
      return;
    }

    let assigned = startPlayAssignedIds.get(block.id);
    if (!Number.isFinite(assigned)) {
      const current = Number.parseInt(block.getFieldValue('PARAM_ID'), 10);
      if (Number.isFinite(current) && current !== startPlayIdDefault) {
        assigned = current;
      } else {
        assigned = startPlayNextId;
      }
      startPlayAssignedIds.set(block.id, assigned);
      startPlayNextId = Math.max(startPlayNextId, assigned + 1);
    }

    const currentText = String(block.getFieldValue('PARAM_ID') || '');
    const nextText = String(assigned);
    if (currentText !== nextText) {
      block.setFieldValue(nextText, 'PARAM_ID');
    }
  }

  function handleStartPlayIdChange(event) {
    if (!workspace || !startPlayBlockTypes.size || !event) {
      return;
    }
    if (event.isUiEvent) {
      return;
    }

    const created =
      event.type === Blockly.Events.BLOCK_CREATE || event.type === 'create';
    const deleted =
      event.type === Blockly.Events.BLOCK_DELETE || event.type === 'delete';

    if (deleted && Array.isArray(event.ids)) {
      event.ids.forEach((id) => startPlayAssignedIds.delete(id));
      if (!startPlayAssignedIds.size) {
        startPlayNextId = startPlayIdDefault;
      }
      refreshStartPlayIdState();
      return;
    }

    if (created && Array.isArray(event.ids)) {
      event.ids.forEach((id) => {
        const block = workspace.getBlockById(id);
        if (!block || block.isDisposed()) {
          return;
        }
        assignStartPlayId(block);
      });
      refreshStartPlayIdState();
    }
  }

  function injectWorkspace() {
    if (workspace) {
      workspace.dispose();
      workspace = null;
    }

    const theme = Blockly.Theme.defineTheme(
      'bricTheme',
      window.themeForCustomBasic || {},
    );
    workspace = Blockly.inject(refs.blocklyDiv, {
      toolbox: window.toolboxCustomBasic,
      theme,
      move: { scrollbars: true, drag: true, wheel: true },
      grid: { spacing: 20, length: 3, colour: '#a8b9cc', snap: true },
      zoom: { controls: true, wheel: true, startScale: 0.95 },
      trashcan: true,
    });
    workspace.addChangeListener(handleStartPlayIdChange);
    refreshStartPlayIdState();
  }

  function patchProcedureCallBlockChecks() {
    if (!Blockly || !Blockly.Blocks) {
      return;
    }
    ['procedures_callnoreturn', 'procedures_callreturn'].forEach((type) => {
      const def = Blockly.Blocks[type];
      if (!def || def.__bricBtNodePatched) {
        return;
      }
      const baseInit = def.init;
      def.init = function patchedInit(...args) {
        baseInit.apply(this, args);
        if (typeof this.setPreviousStatement === 'function') {
          this.setPreviousStatement(true, 'BTNode');
        }
        if (typeof this.setNextStatement === 'function') {
          this.setNextStatement(true, 'BTNode');
        }
      };
      def.__bricBtNodePatched = true;
    });
  }

  function reorderWorkspaceTopBlocks(workspaceState) {
    if (
      !workspaceState ||
      typeof workspaceState !== 'object' ||
      !workspaceState.blocks ||
      !Array.isArray(workspaceState.blocks.blocks)
    ) {
      return workspaceState;
    }
    const out = {
      ...workspaceState,
      blocks: {
        ...workspaceState.blocks,
        blocks: [...workspaceState.blocks.blocks],
      },
    };
    const orderOf = (b) => {
      const t = String((b && b.type) || '');
      if (t === 'procedures_defnoreturn' || t === 'procedures_defreturn') {
        return 0;
      }
      return 1;
    };
    out.blocks.blocks.sort((a, b) => {
      const oa = orderOf(a);
      const ob = orderOf(b);
      if (oa !== ob) {
        return oa - ob;
      }
      return String((a && a.id) || '').localeCompare(String((b && b.id) || ''));
    });
    return out;
  }

  function ensureRootBlock() {
    if (!workspace) {
      return;
    }
    const tops = workspace.getTopBlocks(true);
    if (tops.length > 0) {
      return;
    }
    const rootType = 'bt_function__root';
    if (Blockly.Blocks[rootType]) {
      const b = workspace.newBlock(rootType);
      b.initSvg();
      b.render();
      b.setMovable(true);
      if (typeof b.setColour === 'function') {
        b.setColour(rootBlockColor());
      }
      placeBlockNearTopLeft(b);
    }
  }

  function refreshViewport() {
    if (!workspace) {
      return;
    }
    Blockly.svgResize(workspace);
  }

  function workspaceToBtJson() {
    if (!workspace) {
      return null;
    }
    if (!moduleManifest) {
      return null;
    }
    const ws = Blockly.serialization.workspaces.save(workspace);
    const topBlocks =
      (ws &&
        ws.blocks &&
        Array.isArray(ws.blocks.blocks) &&
        ws.blocks.blocks) ||
      [];
    if (!topBlocks.length) {
      return null;
    }

    const byType = {};
    [
      ...(moduleManifest.behavior || []),
      ...(moduleManifest.bt_logic || []),
      ...(moduleManifest.bt_function || []),
    ].forEach((m) => {
      if (m && m.block_type) {
        byType[m.block_type] = m;
      }
    });

    const randomId = () =>
      Math.floor(10000000 + Math.random() * 90000000).toString();
    const cast = (raw, typeName) => {
      const t = String(typeName || '').toLowerCase();
      if (t === 'int' || t === 'integer') {
        const v = Number.parseInt(String(raw ?? '0'), 10);
        return Number.isFinite(v) ? v : 0;
      }
      if (t === 'float' || t === 'double' || t === 'number') {
        const v = Number.parseFloat(String(raw ?? '0'));
        return Number.isFinite(v) ? v : 0.0;
      }
      return String(raw ?? '');
    };

    const collectOptionParams = (fields, defs, out) => {
      (defs || []).forEach((meta) => {
        const fieldName = meta && meta.field;
        if (!fieldName) return;
        const rawValue = fields[fieldName];
        out[meta.name] = cast(rawValue, meta.type);
        const selected = String(rawValue ?? '');
        const nested =
          ((meta.option_parameters || {})[selected] || []).filter(Boolean);
        if (nested.length) {
          collectOptionParams(fields, nested, out);
        }
      });
    };

    const firstInputBlock = (blockState, inputName) =>
      blockState &&
      blockState.inputs &&
      blockState.inputs[inputName] &&
      blockState.inputs[inputName].block
        ? blockState.inputs[inputName].block
        : null;

    const convertBlock = (blockState) => {
      if (!blockState || typeof blockState !== 'object') {
        return null;
      }
      const type = String(blockState.type || '');
      const fields = (blockState.fields && { ...blockState.fields }) || {};

      if (type === 'procedures_callnoreturn' || type === 'procedures_callreturn') {
        const name = String(
          (blockState.extraState && blockState.extraState.name) ||
            fields.NAME ||
            '',
        ).trim();
        if (!name) {
          return null;
        }
        return { type: 'Subtree', id: name };
      }

      const meta = byType[type];
      if (!meta) {
        return null;
      }

      if (meta.kind === 'behavior') {
        const parameter = {};
        (meta.parameters || []).forEach((p) => {
          parameter[p.name] = cast(fields[p.field], p.type);
          const selected = String(fields[p.field] ?? '');
          const defs =
            ((p.option_parameters || {})[selected] || []).filter(Boolean);
          if (defs.length) {
            collectOptionParams(fields, defs, parameter);
          }
        });
        return {
          type: 'Action',
          action: meta.action,
          parameter,
          id: randomId(),
        };
      }

      const node = {
        type: meta.node_type || 'Node',
        id: randomId(),
      };
      (meta.parameters || []).forEach((p) => {
        node[p.name] = cast(fields[p.field], p.type);
      });

      if (meta.has_children) {
        const children = convertStack(firstInputBlock(blockState, 'CHILDREN'));
        node.children = children;
      } else if (meta.has_child) {
        const children = convertStack(firstInputBlock(blockState, 'CHILD'));
        if (children.length > 1) {
          node.child = {
            type: 'Sequence',
            id: randomId(),
            children,
          };
        } else {
          node.child = children[0] || null;
        }
      }
      return node;
    };

    const convertStack = (startBlock) => {
      const out = [];
      let cur = startBlock;
      while (cur) {
        const node = convertBlock(cur);
        if (node && typeof node === 'object') {
          out.push(node);
        }
        cur = cur.next && cur.next.block ? cur.next.block : null;
      }
      return out;
    };

    const rootTop = topBlocks.find((b) => String((b && b.type) || '') === 'bt_function__root');
    const rootNode = rootTop ? convertBlock(rootTop) : null;
    if (!rootNode) {
      return null;
    }

    const result = { Root: rootNode };
    topBlocks
      .filter((b) => String((b && b.type) || '') === 'procedures_defnoreturn')
      .forEach((defBlock) => {
        const name = String(
          (defBlock.fields && defBlock.fields.NAME) ||
            (defBlock.extraState && defBlock.extraState.name) ||
            '',
        ).trim();
        if (!name) {
          return;
        }
        const bodyNodes = convertStack(firstInputBlock(defBlock, 'STACK'));
        const singleSequence =
          bodyNodes.length === 1 &&
          bodyNodes[0] &&
          typeof bodyNodes[0] === 'object' &&
          String(bodyNodes[0].type || '') === 'Sequence'
            ? bodyNodes[0]
            : null;
        result[name] = {
          child:
            singleSequence ||
            {
              type: 'Sequence',
              id: randomId(),
              children: bodyNodes,
            },
        };
      });

    return result;
  }

  async function initEditor(forceReload = false) {
    if (workspace && !forceReload) {
      if (!refs.pageEdit.classList.contains('active')) {
        showPage('edit');
        await nextFrame();
      }
      return;
    }

    await loadBlocklyAssets(forceReload);
    patchProcedureCallBlockChecks();
    if (!refs.pageEdit.classList.contains('active')) {
      showPage('edit');
      await nextFrame();
    }
    injectWorkspace();
    await nextFrame();
  }

  async function openScenarioInEditor(name) {
    if (!name) {
      toast('Select a scenario first.');
      return;
    }
    await initEditor(false);
    const response = await api(
      `/api/scenarios/${encodeURIComponent(name)}/blockly`,
    );
    editingOriginalScenarioName = name;
    refs.scenarioName.value = name;
    workspace.clear();
    const orderedWorkspace = reorderWorkspaceTopBlocks(response.workspace);
    Blockly.serialization.workspaces.load(orderedWorkspace, workspace);
    workspace.getAllBlocks(false).forEach((block) => {
      if (typeof block.setCollapsed === 'function') {
        block.setCollapsed(false);
      }
      if (typeof block.render === 'function') {
        block.render();
      }
    });
    Blockly.svgResize(workspace);
    refreshStartPlayIdState();
    renderErrors(response.errors || []);
  }

  async function createScenario() {
    await initEditor(false);
    editingOriginalScenarioName = '';
    refs.scenarioName.value = '';
    if (typeof workspace.scroll === 'function') {
      workspace.scroll(0, 0);
    }
    workspace.clear();
    ensureRootBlock();
    refreshStartPlayIdState();
    if (refs.jsonOutput) {
      refs.jsonOutput.textContent = '';
    }
    clearErrors();
  }

  async function saveScenario() {
    const name = refs.scenarioName.value.trim();
    if (!name) {
      toast('Scenario name is required.');
      refs.scenarioName.focus();
      return;
    }
    if (!workspace) {
      toast('Workspace is not ready.');
      return;
    }
    const workspaceJson = Blockly.serialization.workspaces.save(workspace);
    const blocks =
      (workspaceJson &&
        workspaceJson.blocks &&
        Array.isArray(workspaceJson.blocks.blocks) &&
        workspaceJson.blocks.blocks) ||
      [];
    if (!blocks.length) {
      toast('No blocks to save.');
      return;
    }

    await api('/api/scenarios', {
      method: 'POST',
      body: JSON.stringify({
        name,
        original_name: editingOriginalScenarioName,
        data: workspaceJson,
      }),
    });
    editingOriginalScenarioName = name;
    await refreshScenarioList(name);
    toast(`Saved: ${name}`);
  }

  async function deleteScenario() {
    const name = selectedScenarioName();
    if (!name) {
      toast('Select a scenario first.');
      return;
    }
    await api(`/api/scenarios/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    });
    await refreshScenarioList();
    toast(`Deleted: ${name}`);
  }

  async function renameScenario(nextNameRaw) {
    const oldName = renameSourceName || selectedScenarioName();
    if (!oldName) {
      toast('Select a scenario first.');
      return;
    }
    const newName = String(nextNameRaw || '').trim();
    if (!newName) {
      toast('New scenario name is required.');
      if (renameInlineEditor) {
        renameInlineEditor.focus();
      }
      return;
    }
    if (newName === oldName) {
      toast('Scenario name is unchanged.');
      clearInlineRenameEditor(true);
      resetInlineEditState();
      return;
    }

    const response = await api('/api/scenarios/rename', {
      method: 'POST',
      body: JSON.stringify({ old_name: oldName, new_name: newName }),
    });
    await refreshScenarioList((response && response.name) || newName);
    clearInlineRenameEditor(true);
    resetInlineEditState();
    toast(`Renamed: ${oldName} -> ${newName}`);
  }

  async function beginCopyEdit() {
    const sourceName = selectedScenarioName();
    if (!sourceName) {
      toast('Select a scenario first.');
      return;
    }
    const sourceResp = await api(
      `/api/scenarios/${encodeURIComponent(sourceName)}`,
    );
    copyScenarioData = sourceResp.data;
    renameSourceName = sourceName;
    inlineEditMode = 'copy';
    clearInlineRenameEditor(false);
    removeTempCopyOption();

    const idx = refs.scenarioList.selectedIndex;
    const temp = document.createElement('option');
    tempCopyOptionValue = `__copy__${Date.now()}`;
    temp.value = tempCopyOptionValue;
    temp.textContent = sourceName;
    refs.scenarioList.add(temp, idx + 1);
    refs.scenarioList.selectedIndex = idx + 1;
    beginRenameEdit('copy', sourceName, sourceName);
  }

  async function copyScenario(nextNameRaw) {
    const sourceName = renameSourceName;
    if (!sourceName || !copyScenarioData) {
      throw new Error('Copy source is missing');
    }
    const newName = String(nextNameRaw || '').trim();
    if (!newName) {
      toast('New scenario name is required.');
      if (renameInlineEditor) {
        renameInlineEditor.focus();
      }
      return;
    }
    if (newName === sourceName) {
      removeTempCopyOption();
      clearInlineRenameEditor(true);
      resetInlineEditState();
      return;
    }

    await api('/api/scenarios', {
      method: 'POST',
      body: JSON.stringify({ name: newName, data: copyScenarioData }),
    });
    await refreshScenarioList(newName);
    clearInlineRenameEditor(true);
    removeTempCopyOption();
    resetInlineEditState();
    toast(`Copied: ${sourceName} -> ${newName}`);
  }

  async function updateBlocks() {
    refs.updateResult.textContent = 'Updating block registry...';
    const response = await api('/api/blocks/update', { method: 'POST' });
    refs.updateResult.textContent = JSON.stringify(response.summary, null, 2);
    moduleManifest = null;
    const onEditPage = refs.pageEdit.classList.contains('active');
    await loadBlocklyAssets(true);
    if (onEditPage) {
      await initEditor(true);
    }
    toast('Blocks updated from ./btInfo.');
  }

  function exportJson() {
    const btJson = workspaceToBtJson();
    const text = btJson
      ? JSON.stringify(btJson, null, 2)
      : 'No tree generated.';
    if (refs.jsonOutput) {
      refs.jsonOutput.textContent = text;
    }
    refs.jsonModalText.value = text;
    refs.treeModal.classList.remove('show');
    refs.jsonModal.classList.add('show');
    refs.jsonModalText.focus();
    refs.jsonModalText.select();
  }

  function openGraphicalTree() {
    const btJson = workspaceToBtJson();
    if (!btJson) {
      toast('No tree generated.');
      return;
    }
    const text = JSON.stringify(btJson, null, 2);
    if (refs.jsonOutput) {
      refs.jsonOutput.textContent = text;
    }
    refs.jsonModalText.value = text;
    const ok = renderTreeFromJsonText(text);
    if (!ok) {
      return;
    }
    refs.jsonModal.classList.remove('show');
    refs.treeModal.classList.add('show');
  }

  function nodeLabel(node) {
    const t = String((node && node.type) || 'Node');
    if (t === 'Subtree') {
      const sid = node && node.id ? `\n${String(node.id)}` : '';
      return `${t}${sid}`;
    }
    const action = node && node.action ? `\n${node.action}` : '';
    return `${t}${action}`;
  }

  function nodeColor(node) {
    if (!moduleManifest || !node || typeof node !== 'object') {
      return '#eef3f9';
    }
    if (node.action) {
      const match = (moduleManifest.behavior || []).find(
        (b) => b.action === node.action,
      );
      if (match && match.json && match.json.colour) {
        return String(match.json.colour);
      }
    }
    if (node.type) {
      const match = [
        ...(moduleManifest.bt_logic || []),
        ...(moduleManifest.bt_function || []),
      ].find((b) => b.node_type === node.type);
      if (match && match.json && match.json.colour) {
        return String(match.json.colour);
      }
    }
    return '#eef3f9';
  }

  function textColorForBackground(hexColor) {
    if (!/^#([0-9a-fA-F]{6})$/.test(hexColor || '')) {
      return '#0f172a';
    }
    const r = Number.parseInt(hexColor.slice(1, 3), 16);
    const g = Number.parseInt(hexColor.slice(3, 5), 16);
    const b = Number.parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.62 ? '#0f172a' : '#f8fbff';
  }

  function extractChildren(node) {
    const out = [];
    if (!node || typeof node !== 'object') {
      return out;
    }
    if (Array.isArray(node.children)) {
      node.children.forEach((c) => {
        if (c && typeof c === 'object') out.push(c);
      });
    }
    if (node.child && typeof node.child === 'object') {
      out.push(node.child);
    }
    return out;
  }

  function normalizeTree(jsonValue) {
    if (Array.isArray(jsonValue)) {
      if (
        jsonValue.length === 1 &&
        jsonValue[0] &&
        typeof jsonValue[0] === 'object'
      ) {
        return jsonValue[0];
      }
      return {
        type: 'Tree',
        children: jsonValue.filter((n) => n && typeof n === 'object'),
      };
    }
    if (jsonValue && typeof jsonValue === 'object') {
      if (
        !jsonValue.type &&
        jsonValue.Root &&
        typeof jsonValue.Root === 'object'
      ) {
        return jsonValue.Root;
      }
      return jsonValue;
    }
    return null;
  }

  function normalizeForest(jsonValue) {
    if (jsonValue && typeof jsonValue === 'object' && !Array.isArray(jsonValue)) {
      if (jsonValue.Root && typeof jsonValue.Root === 'object') {
        const sections = [{ name: 'Root', root: jsonValue.Root }];
        Object.keys(jsonValue)
          .filter((k) => k !== 'Root')
          .forEach((key) => {
            const val = jsonValue[key];
            if (!val || typeof val !== 'object') {
              return;
            }
            const root = val.child && typeof val.child === 'object' ? val.child : val;
            if (root && typeof root === 'object') {
              sections.push({ name: key, root });
            }
          });
        return sections;
      }
    }
    const single = normalizeTree(jsonValue);
    return single ? [{ name: 'Root', root: single }] : [];
  }

  function buildLayout(root) {
    let nextX = 0;
    let maxDepth = 0;
    const nodes = [];
    const edges = [];

    function walk(node, depth, parent) {
      maxDepth = Math.max(maxDepth, depth);
      const children = extractChildren(node);
      const entry = { node, depth, x: 0, children: [] };
      nodes.push(entry);
      if (!children.length) {
        entry.x = nextX++;
      } else {
        children.forEach((child) => {
          const childEntry = walk(child, depth + 1, entry);
          entry.children.push(childEntry);
        });
        const first = entry.children[0].x;
        const last = entry.children[entry.children.length - 1].x;
        entry.x = (first + last) / 2;
      }
      if (parent) {
        edges.push([parent, entry]);
      }
      return entry;
    }

    const rootEntry = walk(root, 0, null);
    return {
      root: rootEntry,
      nodes,
      edges,
      maxDepth,
      maxX: Math.max(nextX - 1, 0),
    };
  }

  function svgEl(name, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    return el;
  }

  function applyTreeTransform() {
    if (!treeScene) {
      return;
    }
    treeScene.setAttribute(
      'transform',
      `translate(${treeView.tx} ${treeView.ty}) scale(${treeView.scale})`,
    );
  }

  function resetTreeView() {
    treeView.scale = 1;
    treeView.tx = 0;
    treeView.ty = 0;
    applyTreeTransform();
  }

  function zoomTree(factor, clientX = null, clientY = null) {
    if (!refs.treeCanvasWrap || !treeScene) {
      return;
    }
    const nextScale = Math.min(3, Math.max(0.4, treeView.scale * factor));
    if (nextScale === treeView.scale) {
      return;
    }
    const rect = refs.treeCanvasWrap.getBoundingClientRect();
    const px = clientX == null ? rect.width / 2 : clientX - rect.left;
    const py = clientY == null ? rect.height / 2 : clientY - rect.top;
    const worldX = (px - treeView.tx) / treeView.scale;
    const worldY = (py - treeView.ty) / treeView.scale;
    treeView.scale = nextScale;
    treeView.tx = px - worldX * treeView.scale;
    treeView.ty = py - worldY * treeView.scale;
    applyTreeTransform();
  }

  function renderTreeFromJsonText(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      toast('Invalid JSON for tree view.');
      return false;
    }
    const forest = normalizeForest(parsed);
    if (!forest.length) {
      toast('No tree data.');
      return false;
    }

    const nodeW = 180;
    const nodeH = 52;
    const colGap = 56;
    const rowGap = 96;
    const margin = 28;
    const titleH = 28;
    const sectionGap = 42;

    const sections = forest.map((section) => {
      const layout = buildLayout(section.root);
      const sectionW =
        margin * 2 + (layout.maxX + 1) * nodeW + layout.maxX * colGap;
      const treeH =
        margin * 2 + (layout.maxDepth + 1) * nodeH + layout.maxDepth * rowGap;
      const sectionH = titleH + treeH;
      return { ...section, layout, sectionW, sectionH };
    });

    const width = Math.max(...sections.map((s) => s.sectionW), 640);
    const height =
      sections.reduce((sum, s) => sum + s.sectionH, 0) +
      sectionGap * Math.max(0, sections.length - 1);

    refs.treeCanvas.setAttribute('viewBox', `0 0 ${width} ${height}`);
    refs.treeCanvas.setAttribute('width', width);
    refs.treeCanvas.setAttribute('height', height);
    refs.treeCanvas.innerHTML = '';
    treeScene = svgEl('g');
    refs.treeCanvas.appendChild(treeScene);
    resetTreeView();

    let yOffset = 0;
    sections.forEach((section, index) => {
      const originY = yOffset;
      const layout = section.layout;

      treeScene.appendChild(
        svgEl('text', {
          x: margin,
          y: originY + 20,
          fill: '#13324d',
          'font-size': 15,
          'font-family': 'Segoe UI, Noto Sans, sans-serif',
          'font-weight': 700,
        }),
      ).textContent = section.name;

      function pxX(xIndex) {
        return margin + xIndex * (nodeW + colGap);
      }

      function pxY(depth) {
        return originY + titleH + margin + depth * (nodeH + rowGap);
      }

      layout.edges.forEach(([from, to]) => {
        const x1 = pxX(from.x) + nodeW / 2;
        const y1 = pxY(from.depth) + nodeH;
        const x2 = pxX(to.x) + nodeW / 2;
        const y2 = pxY(to.depth);
        const midY = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dyTop = Math.max(midY - y1, 0);
        const dyBottom = Math.max(y2 - midY, 0);
        const baseR = 12;
        const r = Math.max(
          0,
          Math.min(baseR, Math.abs(dx) / 2, dyTop, dyBottom),
        );
        const dir = dx >= 0 ? 1 : -1;

        let d = `M ${x1} ${y1}`;
        if (r > 0) {
          d += ` V ${midY - r}`;
          d += ` Q ${x1} ${midY} ${x1 + dir * r} ${midY}`;
          d += ` H ${x2 - dir * r}`;
          d += ` Q ${x2} ${midY} ${x2} ${midY + r}`;
          d += ` V ${y2}`;
        } else {
          d += ` V ${midY} H ${x2} V ${y2}`;
        }

        treeScene.appendChild(
          svgEl('path', {
            d,
            fill: 'none',
            stroke: '#35506f',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
        );
      });

      layout.nodes.forEach((entry) => {
        const x = pxX(entry.x);
        const y = pxY(entry.depth);
        const fillColor = nodeColor(entry.node);
        const labelColor = textColorForBackground(fillColor);
        const group = svgEl('g');
        group.appendChild(
          svgEl('rect', {
            x,
            y,
            width: nodeW,
            height: nodeH,
            rx: 10,
            ry: 10,
            fill: fillColor,
            stroke: '#2d3e52',
            'stroke-width': 1.5,
          }),
        );

        const label = nodeLabel(entry.node).split('\n');
        group.appendChild(
          svgEl('text', {
            x: x + 10,
            y: y + 21,
            fill: labelColor,
            'font-size': 13,
            'font-family': 'Segoe UI, Noto Sans, sans-serif',
            'font-weight': 600,
          }),
        ).textContent = label[0];

        if (label[1]) {
          group.appendChild(
            svgEl('text', {
              x: x + 10,
              y: y + 39,
              fill: labelColor,
              'font-size': 11,
              'font-family': 'Segoe UI, Noto Sans, sans-serif',
            }),
          ).textContent = label[1];
        }
        treeScene.appendChild(group);
      });

      yOffset += section.sectionH;
      if (index < sections.length - 1) {
        yOffset += sectionGap;
      }
    });

    return true;
  }

  async function bootstrap() {
    await api('/api/blocks/update', { method: 'POST' });
    await loadBlocklyAssets(true);
    await refreshScenarioList();
    showPage('main');
  }

  refs.brandHome.addEventListener('click', () => showPage('main'));
  refs.scenarioList.addEventListener('change', () => {
    clearInlineRenameEditor(false);
    removeTempCopyOption();
    resetInlineEditState();
  });
  refs.scenarioList.addEventListener('scroll', keepInlineRenamePosition);
  window.addEventListener('resize', keepInlineRenamePosition);

  document
    .getElementById('btn-update-blocks')
    .addEventListener('click', async () => {
      try {
        await updateBlocks();
      } catch (err) {
        refs.updateResult.textContent = String(err.message || err);
        toast('Failed to update blocks.');
      }
    });

  document.getElementById('btn-create').addEventListener('click', async () => {
    try {
      await createScenario();
    } catch (err) {
      toast(err.message || 'Create failed');
    }
  });

  document.getElementById('btn-edit').addEventListener('click', async () => {
    try {
      await openScenarioInEditor(selectedScenarioName());
    } catch (err) {
      toast(err.message || 'Edit failed');
    }
  });

  document.getElementById('btn-delete').addEventListener('click', async () => {
    try {
      await deleteScenario();
    } catch (err) {
      toast(err.message || 'Delete failed');
    }
  });

  const btnCopy = document.getElementById('btn-copy');
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      try {
        await beginCopyEdit();
      } catch (err) {
        toast(err.message || 'Copy failed');
      }
    });
  }

  const btnRename = document.getElementById('btn-rename');
  if (btnRename) {
    btnRename.addEventListener('click', beginRenameEdit);
  }

  document.getElementById('btn-save').addEventListener('click', async () => {
    try {
      await saveScenario();
    } catch (err) {
      toast(err.message || 'Save failed');
    }
  });

  refs.scenarioName.addEventListener('keydown', async (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
    try {
      await saveScenario();
    } catch (err) {
      toast(err.message || 'Save failed');
    }
  });

  document
    .getElementById('btn-export')
    .addEventListener('click', openGraphicalTree);

  refs.btnJsonConfirm.addEventListener('click', () => {
    refs.jsonModal.classList.remove('show');
  });

  refs.btnJsonTree.addEventListener('click', () => {
    refs.jsonModal.classList.remove('show');
    requestAnimationFrame(() => {
      const ok = renderTreeFromJsonText(refs.jsonModalText.value || '');
      if (!ok) {
        return;
      }
      refs.treeModal.classList.add('show');
    });
  });

  refs.btnTreeJson.addEventListener('click', () => {
    refs.treeModal.classList.remove('show');
    requestAnimationFrame(() => {
      refs.jsonModal.classList.add('show');
      refs.jsonModalText.focus();
      refs.jsonModalText.select();
    });
  });

  refs.btnTreeConfirm.addEventListener('click', () => {
    refs.treeModal.classList.remove('show');
  });

  refs.btnTreeZoomIn.addEventListener('click', () => zoomTree(1.15));
  refs.btnTreeZoomOut.addEventListener('click', () => zoomTree(1 / 1.15));

  refs.treeCanvasWrap.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      zoomTree(event.deltaY < 0 ? 1.1 : 1 / 1.1, event.clientX, event.clientY);
    },
    { passive: false },
  );

  refs.treeCanvasWrap.addEventListener('mousedown', (event) => {
    treeView.panning = true;
    treeView.lastX = event.clientX;
    treeView.lastY = event.clientY;
    refs.treeCanvasWrap.classList.add('dragging');
  });

  window.addEventListener('mousemove', (event) => {
    if (!treeView.panning) {
      return;
    }
    const dx = event.clientX - treeView.lastX;
    const dy = event.clientY - treeView.lastY;
    treeView.lastX = event.clientX;
    treeView.lastY = event.clientY;
    treeView.tx += dx;
    treeView.ty += dy;
    applyTreeTransform();
  });

  window.addEventListener('mouseup', () => {
    treeView.panning = false;
    refs.treeCanvasWrap.classList.remove('dragging');
  });

  refs.jsonModal.addEventListener('click', (event) => {
    if (event.target === refs.jsonModal) {
      refs.jsonModal.classList.remove('show');
    }
  });

  refs.treeModal.addEventListener('click', (event) => {
    if (event.target === refs.treeModal) {
      refs.treeModal.classList.remove('show');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && refs.treeModal.classList.contains('show')) {
      refs.treeModal.classList.remove('show');
      return;
    }
    if (event.key === 'Escape' && refs.jsonModal.classList.contains('show')) {
      refs.jsonModal.classList.remove('show');
    }
  });

  bootstrap().catch((err) => {
    refs.updateResult.textContent = String(err.message || err);
    toast('Failed to initialize app.');
  });
})();
