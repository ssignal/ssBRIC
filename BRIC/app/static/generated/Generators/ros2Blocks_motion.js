(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "behavior__motion__motion_start_motion": {
    "PARAM_TASK_TYPE": {
      "Expressive": [
        {
          "name": "name",
          "field": "OPT_TASK_TYPE_NAME",
          "type": "string",
          "description": "Motion name",
          "options": [
            [
              "wave_two_hand",
              "wave_two_hand"
            ],
            [
              "pose_hand_heart",
              "pose_hand_heart"
            ],
            [
              "present_double",
              "present_double"
            ],
            [
              "wave_two_hand_sway",
              "wave_two_hand_sway"
            ],
            [
              "head_left_down",
              "head_left_down"
            ],
            [
              "head_right_down",
              "head_right_down"
            ],
            [
              "head_left_up",
              "head_left_up"
            ],
            [
              "head_left_down",
              "head_left_down"
            ],
            [
              "double_nod",
              "double_nod"
            ],
            [
              "highfive_ready",
              "highfive_ready"
            ],
            [
              "highfive_strike",
              "highfive_strike"
            ],
            [
              "fistbump_ready",
              "fistbump_ready"
            ],
            [
              "fistbump_strike",
              "fistbump_strike"
            ]
          ],
          "default": "wave_two_hand",
          "option_parameters": {},
          "option_descriptions": {
            "wave_two_hand": "양손 가슴높이 손인사",
            "pose_hand_heart": "양손 손하트 만들기-- 하트 상태로 남아있을 듯... 복귀 확인 필요!!",
            "present_double": "양손 1초 시간 차이로 손바닥이 위로 하게 드는 모션",
            "wave_two_hand_sway": "양팔 손인사 (좌우로 허리 움직이며) 후 손 내리기  // 정중앙 기준 +- 30도 내외 // 부드럽게 바꿈",
            "head_left_down": "머리 오른쪽 위 이동 후 복귀",
            "head_right_down": "머리 오른쪽 아래 이동 후 복귀",
            "head_left_up": "머리 왼쪽 위 이동 후 복귀",
            "double_nod": "머리 두번 끄덕끄덕",
            "highfive_ready": "하이파이브1 : 하이파이브를 하기 위해 오른손을 펴서 얼굴 높이까지 올림",
            "highfive_strike": "하이파이브2 (하이파이브1 이후에 가능) : 오른손을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
            "fistbump_ready": "주먹인사1 : 주먹인사를 하기 위해 오른손을 주먹져서 얼굴 높이까지 올림",
            "fistbump_strike": "주먹인사2 (주먹인사1 이후에 가능) : 오른 주먹을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)"
          }
        }
      ],
      "Pose": [
        {
          "name": "name",
          "field": "OPT_TASK_TYPE_NAME",
          "type": "string",
          "description": "Motion name",
          "options": [
            [
              "work_ready",
              "work_ready"
            ],
            [
              "move",
              "move"
            ]
          ],
          "default": "work_ready",
          "option_parameters": {},
          "option_descriptions": {
            "work_ready": "팔꿈치 90도 앞으로 양팔 앞으로 나란히",
            "move": "1차 주행 모션 (살짝 팔을 뒤로 보내며 팔꿈치 접은 상태)"
          }
        }
      ],
      "Manipulation": [
        {
          "name": "name",
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
          "name": "objects",
          "field": "OPT_TASK_TYPE_OBJECTS",
          "type": "string",
          "description": "objects (string)",
          "options": [
            [
              "box",
              "box"
            ]
          ],
          "default": "box",
          "option_parameters": {},
          "option_descriptions": {
            "box": ""
          }
        }
      ]
    }
  },
  "behavior__motion__motion_stop_motion": {},
  "behavior__motion__motion_wait_motion_finished": {}
};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => JSON.parse(v)); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { out[meta.name] = parseTyped(block.getFieldValue(meta.field), meta.type); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['behavior__motion__motion_start_motion'] = function(block, generator) {
  const parameter = {};
  parameter['task_type'] = block.getFieldValue('PARAM_TASK_TYPE') || '';
  parameter['repeat'] = block.getFieldValue('PARAM_REPEAT') || '';
  parameter['action'] = block.getFieldValue('PARAM_ACTION') || '';
  const optionMetaByField = OPTION_PARAM_MAP['behavior__motion__motion_start_motion'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'motion/start_motion',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__motion__motion_stop_motion'] = function(block, generator) {
  const parameter = {};
  parameter['mode'] = block.getFieldValue('PARAM_MODE') || '';
  const optionMetaByField = OPTION_PARAM_MAP['behavior__motion__motion_stop_motion'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'motion/stop_motion',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__motion__motion_wait_motion_finished'] = function(block, generator) {
  const parameter = {};
  const optionMetaByField = OPTION_PARAM_MAP['behavior__motion__motion_wait_motion_finished'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'motion/wait_motion_finished',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};


function registerGenerators_ros2blocks_motion() { return true; }
window.BRIC = window.BRIC || {};
window.BRIC.generatorRegistrars = window.BRIC.generatorRegistrars || [];
window.BRIC.generatorRegistrars.push(registerGenerators_ros2blocks_motion);
})();