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
    btnJsonConfirm: document.getElementById('btn-json-confirm'),
    toast: document.getElementById('toast'),
    blocklyDiv: document.getElementById('blocklyDiv'),
  };

  let workspace = null;
  let moduleManifest = null;

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
    const payload = await res.json();
    if (!res.ok || payload.ok === false) {
      throw new Error(payload.error || `Request failed: ${path}`);
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
    if (typeof block.moveTo === 'function' && Blockly.utils && Blockly.utils.Coordinate) {
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
    refs.errorList.innerHTML = '';
  }

  function renderErrors(errors) {
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

  async function refreshScenarioList() {
    const data = await api('/api/scenarios');
    refs.scenarioList.innerHTML = '';
    data.items.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.name;
      option.textContent = item.name;
      refs.scenarioList.appendChild(option);
    });
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

    moduleManifest = await fetch('/static/generated/manifest.json').then((r) => r.json());
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
  }

  function injectWorkspace() {
    if (workspace) {
      workspace.dispose();
      workspace = null;
    }

    const theme = Blockly.Theme.defineTheme('bricTheme', window.themeForCustomBasic || {});
    workspace = Blockly.inject(refs.blocklyDiv, {
      toolbox: window.toolboxCustomBasic,
      theme,
      move: { scrollbars: true, drag: true, wheel: true },
      grid: { spacing: 20, length: 3, colour: '#a8b9cc', snap: true },
      zoom: { controls: true, wheel: true, startScale: 0.95 },
      trashcan: true,
    });
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
    const raw = javascript.javascriptGenerator.workspaceToCode(workspace);
    const lines = raw
      .split('\n')
      .map((v) => v.trim())
      .filter(Boolean);
    if (!lines.length) {
      return null;
    }
    const nodes = lines.map((line) => JSON.parse(line));
    return nodes.length === 1 ? nodes[0] : nodes;
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
    const response = await api(`/api/scenarios/${encodeURIComponent(name)}/blockly`);
    refs.scenarioName.value = name;
    workspace.clear();
    Blockly.serialization.workspaces.load(response.workspace, workspace);
    renderErrors(response.errors || []);
  }

  async function createScenario() {
    await initEditor(false);
    refs.scenarioName.value = '';
    if (typeof workspace.scroll === 'function') {
      workspace.scroll(0, 0);
    }
    workspace.clear();
    ensureRootBlock();
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
    const btJson = workspaceToBtJson();
    if (!btJson) {
      toast('No behavior tree to save.');
      return;
    }

    await api('/api/scenarios', {
      method: 'POST',
      body: JSON.stringify({ name, data: btJson }),
    });
    await refreshScenarioList();
    toast(`Saved: ${name}.json`);
  }

  async function deleteScenario() {
    const name = selectedScenarioName();
    if (!name) {
      toast('Select a scenario first.');
      return;
    }
    await api(`/api/scenarios/${encodeURIComponent(name)}`, { method: 'DELETE' });
    await refreshScenarioList();
    toast(`Deleted: ${name}.json`);
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
    const text = btJson ? JSON.stringify(btJson, null, 2) : 'No tree generated.';
    if (refs.jsonOutput) {
      refs.jsonOutput.textContent = text;
    }
    refs.jsonModalText.value = text;
    refs.jsonModal.classList.add('show');
    refs.jsonModalText.focus();
    refs.jsonModalText.select();
  }

  async function bootstrap() {
    await api('/api/blocks/update', { method: 'POST' });
    await loadBlocklyAssets(true);
    await refreshScenarioList();
    showPage('main');
  }

  refs.brandHome.addEventListener('click', () => showPage('main'));

  document.getElementById('btn-update-blocks').addEventListener('click', async () => {
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

  document.getElementById('btn-export').addEventListener('click', exportJson);

  refs.btnJsonConfirm.addEventListener('click', () => {
    refs.jsonModal.classList.remove('show');
  });

  refs.jsonModal.addEventListener('click', (event) => {
    if (event.target === refs.jsonModal) {
      refs.jsonModal.classList.remove('show');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && refs.jsonModal.classList.contains('show')) {
      refs.jsonModal.classList.remove('show');
    }
  });

  bootstrap().catch((err) => {
    refs.updateResult.textContent = String(err.message || err);
    toast('Failed to initialize app.');
  });
})();
