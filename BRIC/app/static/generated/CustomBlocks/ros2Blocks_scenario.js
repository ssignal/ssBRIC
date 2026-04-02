(() => {
const BLOCKS = [
  {
    "type": "behavior__scenario__bric_scenario_april_demo",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "April_demo",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: April_demo",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_april_demo_0",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "April_demo_0",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: April_demo_0",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_april_demo_funcscenario",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "April_demo_FuncScenario",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: April_demo_FuncScenario",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_april_demo_simple",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "April_demo_simple",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: April_demo_simple",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_motion_sound",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "Motion_Sound",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: Motion_Sound",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_moveanddumpbox",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "MoveAndDumpBox",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: MoveAndDumpBox",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_moveandpickupbox",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "MoveAndPickupBox",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: MoveAndPickupBox",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_refertest",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "ReferTest",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: ReferTest",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_scenariotest_recursive",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "ScenarioTest_recursive",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: ScenarioTest_recursive",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_waitmovefinished",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "WaitMoveFinished",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: WaitMoveFinished",
    "helpUrl": ""
  },
  {
    "type": "behavior__scenario__bric_scenario_func",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "func",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#bcbd22",
    "tooltip": "Run scenario: func",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__scenario__bric_scenario_april_demo": "Run scenario: April_demo",
  "behavior__scenario__bric_scenario_april_demo_0": "Run scenario: April_demo_0",
  "behavior__scenario__bric_scenario_april_demo_funcscenario": "Run scenario: April_demo_FuncScenario",
  "behavior__scenario__bric_scenario_april_demo_simple": "Run scenario: April_demo_simple",
  "behavior__scenario__bric_scenario_motion_sound": "Run scenario: Motion_Sound",
  "behavior__scenario__bric_scenario_moveanddumpbox": "Run scenario: MoveAndDumpBox",
  "behavior__scenario__bric_scenario_moveandpickupbox": "Run scenario: MoveAndPickupBox",
  "behavior__scenario__bric_scenario_refertest": "Run scenario: ReferTest",
  "behavior__scenario__bric_scenario_scenariotest_recursive": "Run scenario: ScenarioTest_recursive",
  "behavior__scenario__bric_scenario_waitmovefinished": "Run scenario: WaitMoveFinished",
  "behavior__scenario__bric_scenario_func": "Run scenario: func"
};
const PARAM_TOOLTIPS = {
  "behavior__scenario__bric_scenario_april_demo": {},
  "behavior__scenario__bric_scenario_april_demo_0": {},
  "behavior__scenario__bric_scenario_april_demo_funcscenario": {},
  "behavior__scenario__bric_scenario_april_demo_simple": {},
  "behavior__scenario__bric_scenario_motion_sound": {},
  "behavior__scenario__bric_scenario_moveanddumpbox": {},
  "behavior__scenario__bric_scenario_moveandpickupbox": {},
  "behavior__scenario__bric_scenario_refertest": {},
  "behavior__scenario__bric_scenario_scenariotest_recursive": {},
  "behavior__scenario__bric_scenario_waitmovefinished": {},
  "behavior__scenario__bric_scenario_func": {}
};
const OPTION_PARAM_MAP = {
  "behavior__scenario__bric_scenario_april_demo": {},
  "behavior__scenario__bric_scenario_april_demo_0": {},
  "behavior__scenario__bric_scenario_april_demo_funcscenario": {},
  "behavior__scenario__bric_scenario_april_demo_simple": {},
  "behavior__scenario__bric_scenario_motion_sound": {},
  "behavior__scenario__bric_scenario_moveanddumpbox": {},
  "behavior__scenario__bric_scenario_moveandpickupbox": {},
  "behavior__scenario__bric_scenario_refertest": {},
  "behavior__scenario__bric_scenario_scenariotest_recursive": {},
  "behavior__scenario__bric_scenario_waitmovefinished": {},
  "behavior__scenario__bric_scenario_func": {}
};
const OPTION_TOOLTIPS = {
  "behavior__scenario__bric_scenario_april_demo": {},
  "behavior__scenario__bric_scenario_april_demo_0": {},
  "behavior__scenario__bric_scenario_april_demo_funcscenario": {},
  "behavior__scenario__bric_scenario_april_demo_simple": {},
  "behavior__scenario__bric_scenario_motion_sound": {},
  "behavior__scenario__bric_scenario_moveanddumpbox": {},
  "behavior__scenario__bric_scenario_moveandpickupbox": {},
  "behavior__scenario__bric_scenario_refertest": {},
  "behavior__scenario__bric_scenario_scenariotest_recursive": {},
  "behavior__scenario__bric_scenario_waitmovefinished": {},
  "behavior__scenario__bric_scenario_func": {}
};
const HELP_ICON = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>";

function setClickHelp(field, text) {
  if (!field) return;
  if (field.setTooltip) field.setTooltip('');
  if (!text) return;
  const msg = String(text);

  function ensureHelpPopup() {
    window.BRIC = window.BRIC || {};
    let el = window.BRIC.helpPopupEl || document.querySelector('.blocklyTooltipDiv');
    if (!el) {
      el = document.createElement('div');
      el.className = 'blocklyTooltipDiv';
      document.body.appendChild(el);
    }
    window.BRIC.helpPopupEl = el;
    if (!window.BRIC.hideHelpPopup) {
      window.BRIC.hideHelpPopup = () => {
        el.style.display = 'none';
        window.BRIC.helpPopupAnchor = null;
      };
    }
    if (!window.BRIC.helpPopupBound) {
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') window.BRIC.hideHelpPopup();
      });
      document.addEventListener('click', (evt) => {
        const anchor = window.BRIC.helpPopupAnchor;
        if (!anchor) return;
        if (el.contains(evt.target)) return;
        if (anchor.contains && anchor.contains(evt.target)) return;
        window.BRIC.hideHelpPopup();
      }, true);
      window.BRIC.helpPopupBound = true;
    }
    return el;
  }

  function showHelpPopup(anchor, text) {
    if (!text) return;
    const sourceBlock = field.getSourceBlock ? field.getSourceBlock() : null;
    const blockType = sourceBlock && sourceBlock.type ? String(sourceBlock.type) : '';
    const isFunctionBlock = blockType.startsWith('bt_function__') || blockType.startsWith('procedures_');
    let frameColor = (sourceBlock && sourceBlock.getColour && sourceBlock.getColour()) || '#4a67c8';
    if (/^\d+(?:\.\d+)?$/.test(String(frameColor)) && Blockly.utils && Blockly.utils.colour && Blockly.utils.colour.hsvToHex) {
      frameColor = Blockly.utils.colour.hsvToHex(Number(frameColor), 0.45, 0.72);
    }
    const framePx = isFunctionBlock ? 1 : 2;
    const innerBg = '#e7e5b8';
    const popup = ensureHelpPopup();
    const rect = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
    popup.className = 'blocklyTooltipDiv bricHelpPopup';
    popup.style.background = 'transparent';
    popup.style.border = 'none';
    popup.style.padding = '0';
    popup.style.pointerEvents = 'none';

    let body = popup.querySelector('.bricHelpBody');
    let tailOuter = popup.querySelector('.bricHelpTailOuter');
    let tailInner = popup.querySelector('.bricHelpTailInner');
    if (!body) {
      body = document.createElement('div');
      body.className = 'bricHelpBody';
      popup.appendChild(body);
    }
    if (!tailOuter) {
      tailOuter = document.createElement('div');
      tailOuter.className = 'bricHelpTailOuter';
      popup.appendChild(tailOuter);
    }
    if (!tailInner) {
      tailInner = document.createElement('div');
      tailInner.className = 'bricHelpTailInner';
      popup.appendChild(tailInner);
    }

    body.textContent = String(text);
    body.style.background = innerBg;
    body.style.border = `${framePx}px solid ${frameColor}`;
    body.style.borderRadius = '5px';
    body.style.padding = '8px 10px';
    body.style.color = '#1f1f1f';
    body.style.boxShadow = `${framePx}px ${framePx}px 0 0 ${frameColor}`;
    body.style.fontWeight = '500';
    body.style.lineHeight = '1.35';
    body.style.maxWidth = '280px';
    body.style.whiteSpace = 'pre-wrap';

    tailOuter.style.position = 'absolute';
    tailOuter.style.left = '18px';
    tailOuter.style.top = 'calc(100% - 1px)';
    tailOuter.style.width = '0';
    tailOuter.style.height = '0';
    tailOuter.style.borderLeft = '10px solid transparent';
    tailOuter.style.borderRight = '10px solid transparent';
    tailOuter.style.borderTop = `10px solid ${frameColor}`;

    tailInner.style.position = 'absolute';
    tailInner.style.left = '20px';
    tailInner.style.top = 'calc(100% - 2px)';
    tailInner.style.width = '0';
    tailInner.style.height = '0';
    tailInner.style.borderLeft = '8px solid transparent';
    tailInner.style.borderRight = '8px solid transparent';
    tailInner.style.borderTop = `8px solid ${innerBg}`;
    tailInner.style.marginTop = '0';

    popup.style.display = 'block';
    if (rect) {
      const maxLeft = window.innerWidth - popup.offsetWidth - 8;
      let left = Math.min(rect.left - 10, maxLeft);
      if (left < 8) left = 8;
      const aboveTop = rect.top - popup.offsetHeight - 12;
      const belowTop = rect.bottom + 10;
      let top = aboveTop;
      if (top < 8) top = Math.min(belowTop, window.innerHeight - popup.offsetHeight - 8);
      popup.style.left = `${Math.round(left)}px`;
      popup.style.top = `${Math.round(top)}px`;
    } else {
      popup.style.left = '12px';
      popup.style.top = '12px';
    }
    window.BRIC.helpPopupAnchor = anchor || null;
  }

  const onClick = () => {
    const anchor = field.getClickTarget_ ? field.getClickTarget_() : null;
    showHelpPopup(anchor, msg);
  };
  if (field.setOnClickHandler) {
    field.setOnClickHandler(onClick);
    return;
  }
  if (field.getClickTarget_) {
    const target = field.getClickTarget_();
    if (target && target.addEventListener) {
      target.addEventListener('click', onClick);
    }
  }
}

function setHoverOptionHelp(field, optionDescriptions) {
  if (!field) return;
  const byValue = optionDescriptions || {};
  if (!Object.keys(byValue).length) return;
  field.__bricOptionDescriptions = byValue;

  function ensureHelpPopup() {
    window.BRIC = window.BRIC || {};
    let el = window.BRIC.helpPopupEl || document.querySelector('.blocklyTooltipDiv');
    if (!el) {
      el = document.createElement('div');
      el.className = 'blocklyTooltipDiv';
      document.body.appendChild(el);
    }
    window.BRIC.helpPopupEl = el;
    if (!window.BRIC.hideHelpPopup) {
      window.BRIC.hideHelpPopup = () => {
        el.style.display = 'none';
        window.BRIC.helpPopupAnchor = null;
      };
    }
    return el;
  }

  function showHelp(anchor, msg) {
    if (!msg) return;
    const sourceBlock = field.getSourceBlock ? field.getSourceBlock() : null;
    const blockType = sourceBlock && sourceBlock.type ? String(sourceBlock.type) : '';
    const isFunctionBlock = blockType.startsWith('bt_function__') || blockType.startsWith('procedures_');
    let frameColor = (sourceBlock && sourceBlock.getColour && sourceBlock.getColour()) || '#4a67c8';
    if (/^\d+(?:\.\d+)?$/.test(String(frameColor)) && Blockly.utils && Blockly.utils.colour && Blockly.utils.colour.hsvToHex) {
      frameColor = Blockly.utils.colour.hsvToHex(Number(frameColor), 0.45, 0.72);
    }
    const framePx = isFunctionBlock ? 1 : 2;
    const innerBg = '#e7e5b8';
    const popup = ensureHelpPopup();
    const rect = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
    popup.className = 'blocklyTooltipDiv bricHelpPopup';
    popup.style.background = 'transparent';
    popup.style.border = 'none';
    popup.style.padding = '0';
    popup.style.pointerEvents = 'none';

    let body = popup.querySelector('.bricHelpBody');
    let tailOuter = popup.querySelector('.bricHelpTailOuter');
    let tailInner = popup.querySelector('.bricHelpTailInner');
    if (!body) {
      body = document.createElement('div');
      body.className = 'bricHelpBody';
      popup.appendChild(body);
    }
    if (!tailOuter) {
      tailOuter = document.createElement('div');
      tailOuter.className = 'bricHelpTailOuter';
      popup.appendChild(tailOuter);
    }
    if (!tailInner) {
      tailInner = document.createElement('div');
      tailInner.className = 'bricHelpTailInner';
      popup.appendChild(tailInner);
    }

    body.textContent = String(msg);
    body.style.background = innerBg;
    body.style.border = `${framePx}px solid ${frameColor}`;
    body.style.borderRadius = '5px';
    body.style.padding = '8px 10px';
    body.style.color = '#1f1f1f';
    body.style.boxShadow = `${framePx}px ${framePx}px 0 0 ${frameColor}`;
    body.style.fontWeight = '500';
    body.style.lineHeight = '1.35';
    body.style.maxWidth = '280px';
    body.style.whiteSpace = 'pre-wrap';

    tailOuter.style.position = 'absolute';
    tailOuter.style.left = '18px';
    tailOuter.style.top = 'calc(100% - 1px)';
    tailOuter.style.width = '0';
    tailOuter.style.height = '0';
    tailOuter.style.borderLeft = '10px solid transparent';
    tailOuter.style.borderRight = '10px solid transparent';
    tailOuter.style.borderTop = `10px solid ${frameColor}`;

    tailInner.style.position = 'absolute';
    tailInner.style.left = '20px';
    tailInner.style.top = 'calc(100% - 2px)';
    tailInner.style.width = '0';
    tailInner.style.height = '0';
    tailInner.style.borderLeft = '8px solid transparent';
    tailInner.style.borderRight = '8px solid transparent';
    tailInner.style.borderTop = `8px solid ${innerBg}`;
    tailInner.style.marginTop = '0';

    popup.style.display = 'block';
    if (rect) {
      const maxLeft = window.innerWidth - popup.offsetWidth - 8;
      let left = Math.min(rect.left - 10, maxLeft);
      if (left < 8) left = 8;
      const aboveTop = rect.top - popup.offsetHeight - 12;
      const belowTop = rect.bottom + 10;
      let top = aboveTop;
      if (top < 8) top = Math.min(belowTop, window.innerHeight - popup.offsetHeight - 8);
      popup.style.left = `${Math.round(left)}px`;
      popup.style.top = `${Math.round(top)}px`;
    } else {
      popup.style.left = '12px';
      popup.style.top = '12px';
    }
    window.BRIC.helpPopupAnchor = anchor || null;
  }

  const target = field.getClickTarget_ ? field.getClickTarget_() : null;
  const showSelected = () => {
    const currentMap = field.__bricOptionDescriptions || {};
    const value = field.getValue ? String(field.getValue() || '') : '';
    const msg = currentMap[value] || '';
    if (!msg) {
      if (window.BRIC && window.BRIC.helpPopupAnchor === target && window.BRIC.hideHelpPopup) {
        window.BRIC.hideHelpPopup();
      }
      return;
    }
    showHelp(target, msg);
  };
  const hide = () => {
    if (window.BRIC && window.BRIC.helpPopupAnchor === target && window.BRIC.hideHelpPopup) {
      window.BRIC.hideHelpPopup();
    }
  };

  if (target && !target.__bricOptionHelpBound) {
    target.addEventListener('mouseenter', showSelected);
    target.addEventListener('mousemove', showSelected);
    target.addEventListener('mouseleave', hide);
    target.__bricOptionHelpBound = true;
  }

  if (typeof field.showEditor_ === 'function' && !field.__bricShowEditorWrapped) {
    const baseShowEditor = field.showEditor_.bind(field);
    field.showEditor_ = function(...args) {
      const result = baseShowEditor(...args);
      window.BRIC = window.BRIC || {};
      window.BRIC.activeOptionHelpField = field;

      window.setTimeout(() => {
        const dropdownDiv = document.querySelector('.blocklyDropDownDiv');
        if (!dropdownDiv) return;
        if (dropdownDiv.__bricOptionMenuHelpBound) return;

        const findMenuItem = (node) => {
          if (!node || !node.closest) return null;
          return node.closest('.goog-menuitem, .blocklyMenuItem');
        };
        const valueFromMenuItem = (itemEl) => {
          if (!itemEl) return '';
          const dataValue = itemEl.getAttribute('data-value') || (itemEl.dataset && itemEl.dataset.value);
          if (dataValue != null && String(dataValue).trim()) return String(dataValue).trim();
          return String(itemEl.textContent || '').trim();
        };

        dropdownDiv.addEventListener('mousemove', (evt) => {
          const itemEl = findMenuItem(evt.target);
          const activeField = window.BRIC && window.BRIC.activeOptionHelpField;
          const currentMap = (activeField && activeField.__bricOptionDescriptions) || {};
          if (!itemEl) return;
          const value = valueFromMenuItem(itemEl);
          const msg = currentMap[value] || '';
          if (!msg) {
            if (window.BRIC && window.BRIC.helpPopupAnchor === itemEl && window.BRIC.hideHelpPopup) {
              window.BRIC.hideHelpPopup();
            }
            return;
          }
          showHelp(itemEl, msg);
        });

        dropdownDiv.addEventListener('mouseleave', () => {
          if (window.BRIC && window.BRIC.hideHelpPopup) {
            window.BRIC.hideHelpPopup();
          }
        });

        dropdownDiv.addEventListener('click', () => {
          if (window.BRIC && window.BRIC.hideHelpPopup) {
            window.BRIC.hideHelpPopup();
          }
        });

        dropdownDiv.__bricOptionMenuHelpBound = true;
      }, 0);
      return result;
    };
    field.__bricShowEditorWrapped = true;
  }
}

function snapshotFieldValues(block) {
  const out = {};
  (block.inputList || []).forEach((input) => {
    (input.fieldRow || []).forEach((field) => {
      if (!field || !field.name) return;
      try {
        out[field.name] = block.getFieldValue(field.name);
      } catch (err) {
        // Ignore unsupported fields.
      }
    });
  });
  return out;
}

function clearDynamicOptionInputs(block) {
  const names = (block.inputList || [])
    .map((input) => input && input.name)
    .filter((name) => typeof name === 'string' && name.startsWith('OPT_DYN_'));
  names.forEach((name) => block.removeInput(name, true));
}

function appendOptionDefs(block, defs, priorValues, tokenRef, triggerFields) {
  (defs || []).forEach((meta) => {
    tokenRef.v += 1;
    const inputName = 'OPT_DYN_' + tokenRef.v;
    const input = block.appendDummyInput(inputName);
    const helpFieldName = 'HELP_' + meta.field;
    const hasHelp = !!String(meta.description || '').trim();
    if (hasHelp) {
      input.appendField(new Blockly.FieldImage(HELP_ICON, 16, 16, '?'), helpFieldName);
    }
    input.appendField(String(meta.name || 'param'));

    const prior = priorValues[meta.field];
    if (Array.isArray(meta.options) && meta.options.length) {
      input.appendField(new Blockly.FieldDropdown(meta.options), meta.field);
      const nextValue = prior != null ? String(prior) : (meta.default == null ? '' : String(meta.default));
      if (nextValue) {
        try {
          block.setFieldValue(nextValue, meta.field);
        } catch (err) {
          // Ignore when value is outside dropdown options.
        }
      }
    } else {
      const txt = prior != null ? String(prior) : (meta.default == null ? '' : String(meta.default));
      input.appendField(new Blockly.FieldTextInput(txt), meta.field);
    }

    const field = block.getField(meta.field);
    setHoverOptionHelp(field, meta.option_descriptions || {});
    if (hasHelp) {
      const helpField = block.getField(helpFieldName);
      setClickHelp(helpField, meta.description || '');
    }

    const selected = block.getFieldValue(meta.field) || '';
    const nested = ((meta.option_parameters || {})[selected]) || [];
    if (meta.option_parameters && Object.keys(meta.option_parameters).length) {
      triggerFields.add(meta.field);
    }
    if (nested.length) {
      appendOptionDefs(block, nested, priorValues, tokenRef, triggerFields);
    }
  });
}

function rerenderOptionParams(block, blockType) {
  const byField = OPTION_PARAM_MAP[blockType] || {};
  const rootParents = Object.keys(byField);
  if (!rootParents.length) return;

  const priorValues = snapshotFieldValues(block);
  clearDynamicOptionInputs(block);
  const tokenRef = { v: 0 };
  const triggerFields = new Set(rootParents);
  rootParents.forEach((parentField) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = (byField[parentField] || {})[selected] || [];
    appendOptionDefs(block, defs, priorValues, tokenRef, triggerFields);
  });
  block.__optionTriggerFields = triggerFields;
  if (block.render) block.render();
}

function registerBlocks_ros2blocks_scenario() {
  Blockly.defineBlocksWithJsonArray(BLOCKS);
  Object.entries(BLOCK_TOOLTIPS).forEach(([blockType, tip]) => {
    const def = Blockly.Blocks[blockType];
    if (def) {
      const baseInit = def.init;
      def.init = function wrappedInit() {
        baseInit.call(this);
        this.setTooltip(tip || '');
        setClickHelp(this.getField('HELP'), tip || '');
        const perField = PARAM_TOOLTIPS[blockType] || {};
        const perOptionField = OPTION_TOOLTIPS[blockType] || {};
        Object.entries(perField).forEach(([fieldName, fieldTip]) => {
          const field = this.getField(fieldName);
          setHoverOptionHelp(field, perOptionField[fieldName] || {});
          const helpField = this.getField('HELP_' + fieldName.replace('PARAM_', ''));
          setClickHelp(helpField, fieldTip || '');
        });

        const optionParents = Object.keys(OPTION_PARAM_MAP[blockType] || {});
        rerenderOptionParams(this, blockType);
        this.__bricRerenderOptionParams = () => {
          rerenderOptionParams(this, blockType);
        };
        this.setOnChange((event) => {
          if (!event || event.isUiEvent) return;
          if (event.blockId !== this.id) return;
          if (event.type !== Blockly.Events.BLOCK_CHANGE) return;
          if (event.element !== 'field') return;
          const triggerFields = this.__optionTriggerFields || new Set(optionParents);
          if (!triggerFields.has(event.name)) return;
          if (this.__renderingOptionParams) return;
          this.__renderingOptionParams = true;
          try {
            rerenderOptionParams(this, blockType);
          } finally {
            this.__renderingOptionParams = false;
          }
        });
      };
    }
  });
}

window.BRIC = window.BRIC || {};
window.BRIC.blockRegistrars = window.BRIC.blockRegistrars || [];
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_scenario);
})();
