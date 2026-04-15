(() => {
const BLOCKS = [
  {
    "type": "behavior__motion__bric_start_motion_motion_start_motion",
    "message0": "%1 %2 %3 %4 %5",
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
        "text": "start_motion",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_NAME"
      },
      {
        "type": "field_label",
        "text": "name"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_NAME",
        "options": [
          [
            "manipulation.prepare",
            "manipulation.prepare"
          ],
          [
            "manipulation.pick_up",
            "manipulation.pick_up"
          ],
          [
            "manipulation.dump",
            "manipulation.dump"
          ],
          [
            "manipulation.put_down",
            "manipulation.put_down"
          ],
          [
            "expressive_motion.nod twice",
            "expressive_motion.double_nod"
          ],
          [
            "expressive_motion.Ready to fistbump",
            "expressive_motion.fistbump_ready"
          ],
          [
            "expressive_motion.Go for a fistbump",
            "expressive_motion.fistbump_strike"
          ],
          [
            "expressive_motion.Look to the left",
            "expressive_motion.head_left"
          ],
          [
            "expressive_motion.Look down and to the left",
            "expressive_motion.head_left_down"
          ],
          [
            "expressive_motion.Look up and to the left",
            "expressive_motion.head_left_up"
          ],
          [
            "expressive_motion.Look to the right",
            "expressive_motion.head_right"
          ],
          [
            "expressive_motion.Look down and to the right",
            "expressive_motion.head_right_down"
          ],
          [
            "expressive_motion.Look up and to the right",
            "expressive_motion.head_right_up"
          ],
          [
            "expressive_motion.Ready to highfive",
            "expressive_motion.highfive_ready"
          ],
          [
            "expressive_motion.Go for a hightfive",
            "expressive_motion.highfive_strike"
          ],
          [
            "expressive_motion.Heart hands",
            "expressive_motion.pose_hand_heart"
          ],
          [
            "expressive_motion.Gesture with open palms",
            "expressive_motion.present_double"
          ],
          [
            "expressive_motion.Wave with both hands",
            "expressive_motion.wave_two_hand"
          ],
          [
            "expressive_motion.Enthusiastic wave with both hands",
            "expressive_motion.wave_two_hand_sway"
          ],
          [
            "pose_motion.Moving",
            "pose_motion.move"
          ],
          [
            "pose_motion.Neutral",
            "pose_motion.neutral"
          ],
          [
            "pose_motion.Neutralize last joint",
            "pose_motion.recent_joint_neutral"
          ],
          [
            "pose_motion.Getting ready to work",
            "pose_motion.work_ready"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "Motion 시작 명령",
    "helpUrl": ""
  },
  {
    "type": "behavior__motion__motion_start_motion",
    "message0": "%1 %2 %3 %4 %5 %6 %7 %8",
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
        "text": "start_motion",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TASK_TYPE"
      },
      {
        "type": "field_label",
        "text": "task_type"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_TASK_TYPE",
        "options": [
          [
            "expressive_motion",
            "expressive_motion"
          ],
          [
            "pose_motion",
            "pose_motion"
          ],
          [
            "manipulation",
            "manipulation"
          ]
        ]
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_REPEAT"
      },
      {
        "type": "field_label",
        "text": "repeat"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_REPEAT",
        "options": [
          [
            "once",
            "once"
          ],
          [
            "loop",
            "loop"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "Motion 시작 명령",
    "helpUrl": ""
  },
  {
    "type": "behavior__motion__motion_stop_motion",
    "message0": "%1 %2 %3 %4 %5",
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
        "text": "stop_motion",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='none' stroke='white' stroke-width='1'/><circle cx='8' cy='8' r='6' fill='%233f51b5'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='white' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_MODE"
      },
      {
        "type": "field_label",
        "text": "mode"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_MODE",
        "options": [
          [
            "normal",
            "normal"
          ],
          [
            "immediately",
            "immediately"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "Motion 강제 종료 명령",
    "helpUrl": ""
  },
  {
    "type": "behavior__motion__motion_wait_motion_finished",
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
        "text": "wait_motion_finished",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": "#2ca02c",
    "tooltip": "Motion 완료 여부 확인",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__motion__bric_start_motion_motion_start_motion": "Motion 시작 명령",
  "behavior__motion__motion_start_motion": "Motion 시작 명령",
  "behavior__motion__motion_stop_motion": "Motion 강제 종료 명령",
  "behavior__motion__motion_wait_motion_finished": "Motion 완료 여부 확인"
};
const PARAM_TOOLTIPS = {
  "behavior__motion__bric_start_motion_motion_start_motion": {
    "PARAM_NAME": "Motion name"
  },
  "behavior__motion__motion_start_motion": {
    "PARAM_TASK_TYPE": "Motion task type",
    "PARAM_REPEAT": "Motion repetition type"
  },
  "behavior__motion__motion_stop_motion": {
    "PARAM_MODE": "Motion stop type"
  },
  "behavior__motion__motion_wait_motion_finished": {}
};
const OPTION_PARAM_MAP = {
  "behavior__motion__bric_start_motion_motion_start_motion": {
    "PARAM_NAME": {
      "manipulation.prepare": [
        {
          "name": "object",
          "output_name": "object",
          "parent_key": "",
          "field": "OPT_NAME_OBJECT",
          "type": "string",
          "description": "object (string)",
          "options": [
            [
              "box",
              "box"
            ]
          ],
          "default": "box",
          "option_parameters": {},
          "option_descriptions": {
            "box": "box"
          }
        }
      ],
      "manipulation.pick_up": [
        {
          "name": "object",
          "output_name": "object",
          "parent_key": "",
          "field": "OPT_NAME_OBJECT",
          "type": "string",
          "description": "object (string)",
          "options": [
            [
              "box",
              "box"
            ]
          ],
          "default": "box",
          "option_parameters": {},
          "option_descriptions": {
            "box": "box"
          }
        }
      ],
      "manipulation.dump": [
        {
          "name": "object",
          "output_name": "object",
          "parent_key": "",
          "field": "OPT_NAME_OBJECT",
          "type": "string",
          "description": "object (string)",
          "options": [
            [
              "box",
              "box"
            ]
          ],
          "default": "box",
          "option_parameters": {},
          "option_descriptions": {
            "box": "box"
          }
        }
      ],
      "manipulation.put_down": [
        {
          "name": "object",
          "output_name": "object",
          "parent_key": "",
          "field": "OPT_NAME_OBJECT",
          "type": "string",
          "description": "object (string)",
          "options": [
            [
              "box",
              "box"
            ]
          ],
          "default": "box",
          "option_parameters": {},
          "option_descriptions": {
            "box": "box"
          }
        }
      ]
    }
  },
  "behavior__motion__motion_start_motion": {
    "PARAM_TASK_TYPE": {
      "expressive_motion": [
        {
          "name": "name",
          "output_name": "name",
          "parent_key": "",
          "field": "OPT_TASK_TYPE_NAME",
          "type": "string",
          "description": "Motion name",
          "options": [
            [
              "nod twice",
              "double_nod"
            ],
            [
              "Ready to fistbump",
              "fistbump_ready"
            ],
            [
              "Go for a fistbump",
              "fistbump_strike"
            ],
            [
              "Look to the left",
              "head_left"
            ],
            [
              "Look down and to the left",
              "head_left_down"
            ],
            [
              "Look up and to the left",
              "head_left_up"
            ],
            [
              "Look to the right",
              "head_right"
            ],
            [
              "Look down and to the right",
              "head_right_down"
            ],
            [
              "Look up and to the right",
              "head_right_up"
            ],
            [
              "Ready to highfive",
              "highfive_ready"
            ],
            [
              "Go for a hightfive",
              "highfive_strike"
            ],
            [
              "Heart hands",
              "pose_hand_heart"
            ],
            [
              "Gesture with open palms",
              "present_double"
            ],
            [
              "Wave with both hands",
              "wave_two_hand"
            ],
            [
              "Enthusiastic wave with both hands",
              "wave_two_hand_sway"
            ]
          ],
          "default": "double_nod",
          "option_parameters": {},
          "option_descriptions": {
            "double_nod": "머리 두번 끄덕끄덕",
            "fistbump_ready": "주먹인사1 : 주먹인사를 하기 위해 오른손을 주먹져서 얼굴 높이까지 올림",
            "fistbump_strike": "주먹인사2 (주먹인사1 이후에 가능) : 오른 주먹을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
            "head_left": "머리 왼쪽 이동 후 복귀",
            "head_left_down": "머리 왼쪽 아래 이동 후 복귀 (?? 확인 필요!)",
            "head_left_up": "머리 왼쪽 위 이동 후 복귀",
            "head_right": "머리 오른쪽 이동 후 복귀",
            "head_right_down": "머리 오른쪽 아래 이동 후 복귀",
            "head_right_up": "머리 오른쪽 위 이동 후 복귀",
            "highfive_ready": "하이파이브1 : 하이파이브를 하기 위해 오른손을 펴서 얼굴 높이까지 올림",
            "highfive_strike": "하이파이브2 (하이파이브1 이후에 가능) : 오른손을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
            "pose_hand_heart": "양손 손하트 만들기-- 하트 상태로 남아있을 듯... 복귀 확인 필요!!",
            "present_double": "양손 1초 시간 차이로 손바닥이 위로 하게 드는 모션",
            "wave_two_hand": "양손 가슴높이 손인사",
            "wave_two_hand_sway": "양팔 손인사 (좌우로 허리 움직이며) 후 손 내리기  // 정중앙 기준 +- 30도 내외 // 부드럽게 바꿈"
          }
        }
      ],
      "pose_motion": [
        {
          "name": "name",
          "output_name": "name",
          "parent_key": "",
          "field": "OPT_TASK_TYPE_NAME",
          "type": "string",
          "description": "Motion name",
          "options": [
            [
              "Moving",
              "move"
            ],
            [
              "Neutral",
              "neutral"
            ],
            [
              "Neutralize last joint",
              "recent_joint_neutral"
            ],
            [
              "Getting ready to work",
              "work_ready"
            ]
          ],
          "default": "move",
          "option_parameters": {},
          "option_descriptions": {
            "move": "1차 주행 모션 (살짝 팔을 뒤로 보내며 팔꿈치 접은 상태)",
            "neutral": "촬영 기준 기본 모션 (양팔을 내리고 손을 살짝 가운데로 모은 자세, motion19와 비슷)",
            "recent_joint_neutral": "촬영 기준 기본 모션 (바로 직전에 움직인 관절만 )",
            "work_ready": "팔꿈치 90도 앞으로 양팔 앞으로 나란히"
          }
        }
      ],
      "manipulation": [
        {
          "name": "name",
          "output_name": "name",
          "parent_key": "",
          "field": "OPT_TASK_TYPE_NAME",
          "type": "string",
          "description": "Motion name",
          "options": [
            [
              "prepare",
              "prepare"
            ],
            [
              "pick_up",
              "pick_up"
            ],
            [
              "dump",
              "dump"
            ],
            [
              "put_down",
              "put_down"
            ]
          ],
          "default": "prepare",
          "option_parameters": {},
          "option_descriptions": {
            "prepare": "demo2604_pick_box_ready",
            "pick_up": "demo2604_pick_box",
            "dump": "demo2604_dump_box",
            "put_down": "demo2604_place_box"
          }
        },
        {
          "name": "object",
          "output_name": "object",
          "parent_key": "",
          "field": "OPT_TASK_TYPE_OBJECT",
          "type": "string",
          "description": "object (string)",
          "options": [
            [
              "box",
              "box"
            ]
          ],
          "default": "box",
          "option_parameters": {},
          "option_descriptions": {
            "box": "box"
          }
        }
      ]
    }
  },
  "behavior__motion__motion_stop_motion": {},
  "behavior__motion__motion_wait_motion_finished": {}
};
const OPTION_TOOLTIPS = {
  "behavior__motion__bric_start_motion_motion_start_motion": {
    "PARAM_NAME": {
      "manipulation.prepare": "demo2604_pick_box_ready",
      "manipulation.pick_up": "demo2604_pick_box",
      "manipulation.dump": "demo2604_dump_box",
      "manipulation.put_down": "demo2604_place_box",
      "expressive_motion.double_nod": "머리 두번 끄덕끄덕",
      "expressive_motion.fistbump_ready": "주먹인사1 : 주먹인사를 하기 위해 오른손을 주먹져서 얼굴 높이까지 올림",
      "expressive_motion.fistbump_strike": "주먹인사2 (주먹인사1 이후에 가능) : 오른 주먹을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
      "expressive_motion.head_left": "머리 왼쪽 이동 후 복귀",
      "expressive_motion.head_left_down": "머리 왼쪽 아래 이동 후 복귀 (?? 확인 필요!)",
      "expressive_motion.head_left_up": "머리 왼쪽 위 이동 후 복귀",
      "expressive_motion.head_right": "머리 오른쪽 이동 후 복귀",
      "expressive_motion.head_right_down": "머리 오른쪽 아래 이동 후 복귀",
      "expressive_motion.head_right_up": "머리 오른쪽 위 이동 후 복귀",
      "expressive_motion.highfive_ready": "하이파이브1 : 하이파이브를 하기 위해 오른손을 펴서 얼굴 높이까지 올림",
      "expressive_motion.highfive_strike": "하이파이브2 (하이파이브1 이후에 가능) : 오른손을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
      "expressive_motion.pose_hand_heart": "양손 손하트 만들기-- 하트 상태로 남아있을 듯... 복귀 확인 필요!!",
      "expressive_motion.present_double": "양손 1초 시간 차이로 손바닥이 위로 하게 드는 모션",
      "expressive_motion.wave_two_hand": "양손 가슴높이 손인사",
      "expressive_motion.wave_two_hand_sway": "양팔 손인사 (좌우로 허리 움직이며) 후 손 내리기  // 정중앙 기준 +- 30도 내외 // 부드럽게 바꿈",
      "pose_motion.move": "1차 주행 모션 (살짝 팔을 뒤로 보내며 팔꿈치 접은 상태)",
      "pose_motion.neutral": "촬영 기준 기본 모션 (양팔을 내리고 손을 살짝 가운데로 모은 자세, motion19와 비슷)",
      "pose_motion.recent_joint_neutral": "촬영 기준 기본 모션 (바로 직전에 움직인 관절만 )",
      "pose_motion.work_ready": "팔꿈치 90도 앞으로 양팔 앞으로 나란히"
    }
  },
  "behavior__motion__motion_start_motion": {
    "PARAM_TASK_TYPE": {
      "expressive_motion": "expressive_motion motion",
      "pose_motion": "pose motion",
      "manipulation": "manipulation motion"
    },
    "PARAM_REPEAT": {
      "once": "Run once",
      "loop": "Repeat continuously"
    }
  },
  "behavior__motion__motion_stop_motion": {
    "PARAM_MODE": {
      "normal": "Normal stop",
      "immediately": "Immediate stop"
    }
  },
  "behavior__motion__motion_wait_motion_finished": {}
};
const BLOCK_PROFILE = {};
const OPTION_PROFILE_META = {};
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

function registerBlocks_ros2blocks_motion() {
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
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_motion);
// Accumulate profile metadata across all block modules.
window.BRIC.blockProfile = Object.assign(window.BRIC.blockProfile || {}, BLOCK_PROFILE);
window.BRIC.optionProfileMeta = Object.assign(window.BRIC.optionProfileMeta || {}, OPTION_PROFILE_META);
})();
