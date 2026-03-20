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
      const args0 = (((item || {}).json || {}).args0) || [];
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
    const blocks = workspace.getAllBlocks(false).filter((b) => isStartPlayBlock(b));
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

    const created = event.type === Blockly.Events.BLOCK_CREATE || event.type === 'create';
    const deleted = event.type === Blockly.Events.BLOCK_DELETE || event.type === 'delete';

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

    const theme = Blockly.Theme.defineTheme('bricTheme', window.themeForCustomBasic || {});
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
    refreshStartPlayIdState();
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
    const action = node && node.action ? `\n${node.action}` : '';
    return `${t}${action}`;
  }

  function nodeColor(node) {
    if (!moduleManifest || !node || typeof node !== 'object') {
      return '#eef3f9';
    }
    if (node.action) {
      const match = (moduleManifest.behavior || []).find((b) => b.action === node.action);
      if (match && match.json && match.json.colour) {
        return String(match.json.colour);
      }
    }
    if (node.type) {
      const match = [...(moduleManifest.bt_logic || []), ...(moduleManifest.bt_function || [])]
        .find((b) => b.node_type === node.type);
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
      if (jsonValue.length === 1 && jsonValue[0] && typeof jsonValue[0] === 'object') {
        return jsonValue[0];
      }
      return { type: 'Tree', children: jsonValue.filter((n) => n && typeof n === 'object') };
    }
    if (jsonValue && typeof jsonValue === 'object') {
      return jsonValue;
    }
    return null;
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
    return { root: rootEntry, nodes, edges, maxDepth, maxX: Math.max(nextX - 1, 0) };
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
    const root = normalizeTree(parsed);
    if (!root) {
      toast('No tree data.');
      return false;
    }

    const layout = buildLayout(root);
    const nodeW = 180;
    const nodeH = 52;
    const colGap = 56;
    const rowGap = 96;
    const margin = 28;
    const width = margin * 2 + (layout.maxX + 1) * nodeW + layout.maxX * colGap;
    const height = margin * 2 + (layout.maxDepth + 1) * nodeH + layout.maxDepth * rowGap;

    refs.treeCanvas.setAttribute('viewBox', `0 0 ${width} ${height}`);
    refs.treeCanvas.setAttribute('width', width);
    refs.treeCanvas.setAttribute('height', height);
    refs.treeCanvas.innerHTML = '';
    treeScene = svgEl('g');
    refs.treeCanvas.appendChild(treeScene);
    resetTreeView();

    function pxX(xIndex) {
      return margin + xIndex * (nodeW + colGap);
    }

    function pxY(depth) {
      return margin + depth * (nodeH + rowGap);
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
      const r = Math.max(0, Math.min(baseR, Math.abs(dx) / 2, dyTop, dyBottom));
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

      treeScene.appendChild(svgEl('path', {
        d,
        fill: 'none',
        stroke: '#35506f',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }));
    });

    layout.nodes.forEach((entry) => {
      const x = pxX(entry.x);
      const y = pxY(entry.depth);
      const fillColor = nodeColor(entry.node);
      const labelColor = textColorForBackground(fillColor);
      const group = svgEl('g');
      group.appendChild(svgEl('rect', {
        x,
        y,
        width: nodeW,
        height: nodeH,
        rx: 10,
        ry: 10,
        fill: fillColor,
        stroke: '#2d3e52',
        'stroke-width': 1.5,
      }));

      const label = nodeLabel(entry.node).split('\n');
      group.appendChild(svgEl('text', {
        x: x + 10,
        y: y + 21,
        fill: labelColor,
        'font-size': 13,
        'font-family': 'Segoe UI, Noto Sans, sans-serif',
        'font-weight': 600,
      })).textContent = label[0];

      if (label[1]) {
        group.appendChild(svgEl('text', {
          x: x + 10,
          y: y + 39,
          fill: labelColor,
          'font-size': 11,
          'font-family': 'Segoe UI, Noto Sans, sans-serif',
        })).textContent = label[1];
      }
      treeScene.appendChild(group);
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

  document.getElementById('btn-export').addEventListener('click', openGraphicalTree);

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

  refs.treeCanvasWrap.addEventListener('wheel', (event) => {
    event.preventDefault();
    zoomTree(event.deltaY < 0 ? 1.1 : 1 / 1.1, event.clientX, event.clientY);
  }, { passive: false });

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
