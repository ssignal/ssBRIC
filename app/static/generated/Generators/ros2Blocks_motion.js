(() => {
const javascriptGenerator = (window.javascript && window.javascript.javascriptGenerator) || window.javascriptGenerator;
const OPTION_PARAM_MAP = {
  "behavior__motion__bric_start_motion_motion_start_motion": {},
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
            "nod twice": "머리 두번 끄덕끄덕",
            "fistbump_ready": "주먹인사1 : 주먹인사를 하기 위해 오른손을 주먹져서 얼굴 높이까지 올림",
            "Ready to fistbump": "주먹인사1 : 주먹인사를 하기 위해 오른손을 주먹져서 얼굴 높이까지 올림",
            "fistbump_strike": "주먹인사2 (주먹인사1 이후에 가능) : 오른 주먹을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
            "Go for a fistbump": "주먹인사2 (주먹인사1 이후에 가능) : 오른 주먹을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
            "head_left": "머리 왼쪽 이동 후 복귀",
            "Look to the left": "머리 왼쪽 이동 후 복귀",
            "head_left_down": "머리 왼쪽 아래 이동 후 복귀 (?? 확인 필요!)",
            "Look down and to the left": "머리 왼쪽 아래 이동 후 복귀 (?? 확인 필요!)",
            "head_left_up": "머리 왼쪽 위 이동 후 복귀",
            "Look up and to the left": "머리 왼쪽 위 이동 후 복귀",
            "head_right": "머리 오른쪽 이동 후 복귀",
            "Look to the right": "머리 오른쪽 이동 후 복귀",
            "head_right_down": "머리 오른쪽 아래 이동 후 복귀",
            "Look down and to the right": "머리 오른쪽 아래 이동 후 복귀",
            "head_right_up": "머리 오른쪽 위 이동 후 복귀",
            "Look up and to the right": "머리 오른쪽 위 이동 후 복귀",
            "highfive_ready": "하이파이브1 : 하이파이브를 하기 위해 오른손을 펴서 얼굴 높이까지 올림",
            "Ready to highfive": "하이파이브1 : 하이파이브를 하기 위해 오른손을 펴서 얼굴 높이까지 올림",
            "highfive_strike": "하이파이브2 (하이파이브1 이후에 가능) : 오른손을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
            "Go for a hightfive": "하이파이브2 (하이파이브1 이후에 가능) : 오른손을 마주치는 동작 (끝나고 손을 내리는지 확인 필요!!)",
            "pose_hand_heart": "양손 손하트 만들기-- 하트 상태로 남아있을 듯... 복귀 확인 필요!!",
            "Heart hands": "양손 손하트 만들기-- 하트 상태로 남아있을 듯... 복귀 확인 필요!!",
            "present_double": "양손 1초 시간 차이로 손바닥이 위로 하게 드는 모션",
            "Gesture with open palms": "양손 1초 시간 차이로 손바닥이 위로 하게 드는 모션",
            "wave_two_hand": "양손 가슴높이 손인사",
            "Wave with both hands": "양손 가슴높이 손인사",
            "wave_two_hand_sway": "양팔 손인사 (좌우로 허리 움직이며) 후 손 내리기  // 정중앙 기준 +- 30도 내외 // 부드럽게 바꿈",
            "Enthusiastic wave with both hands": "양팔 손인사 (좌우로 허리 움직이며) 후 손 내리기  // 정중앙 기준 +- 30도 내외 // 부드럽게 바꿈"
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
            "Moving": "1차 주행 모션 (살짝 팔을 뒤로 보내며 팔꿈치 접은 상태)",
            "neutral": "촬영 기준 기본 모션 (양팔을 내리고 손을 살짝 가운데로 모은 자세, motion19와 비슷)",
            "Neutral": "촬영 기준 기본 모션 (양팔을 내리고 손을 살짝 가운데로 모은 자세, motion19와 비슷)",
            "recent_joint_neutral": "촬영 기준 기본 모션 (바로 직전에 움직인 관절만 )",
            "Neutralize last joint": "촬영 기준 기본 모션 (바로 직전에 움직인 관절만 )",
            "work_ready": "팔꿈치 90도 앞으로 양팔 앞으로 나란히",
            "Getting ready to work": "팔꿈치 90도 앞으로 양팔 앞으로 나란히"
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
const POI_COORDS = {};

function randomId() { return Math.floor(10000000 + Math.random() * 90000000).toString(); }
function parseChildNodes(raw) { return (raw || '').split('\n').map((v) => v.trim()).filter(Boolean).map((v) => { try { return JSON.parse(v); } catch (err) { return null; } }).filter((v) => v && typeof v === 'object'); }
function parseTyped(raw, typeName) { const t = String(typeName || '').toLowerCase(); if (t === 'int' || t === 'integer') return Number.parseInt(raw || '0', 10); if (t === 'float' || t === 'double' || t === 'number') return Number.parseFloat(raw || '0'); return raw || ''; }
function assignParamValue(out, meta, raw) { const child = meta.output_name || meta.name; const parent = meta.parent_key || ''; const value = parseTyped(raw, meta.type); if (parent) { const prev = out[parent]; if (prev && typeof prev === 'object' && !Array.isArray(prev)) { out[parent] = { ...prev, [child]: value }; } else { out[parent] = { [child]: value }; } } else { out[child] = value; } }
function collectOptionParams(block, defs, out) { (defs || []).forEach((meta) => { assignParamValue(out, meta, block.getFieldValue(meta.field)); const selected = block.getFieldValue(meta.field) || ''; const nested = ((meta.option_parameters || {})[selected]) || []; if (nested.length) collectOptionParams(block, nested, out); }); }

javascriptGenerator.forBlock['behavior__motion__bric_start_motion_motion_start_motion'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "name", "output_name": "name", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_NAME'));
  const optionMetaByField = OPTION_PARAM_MAP['behavior__motion__bric_start_motion_motion_start_motion'] || {};
  Object.entries(optionMetaByField).forEach(([parentField, byOption]) => {
    const selected = block.getFieldValue(parentField) || '';
    const defs = byOption[selected] || [];
    collectOptionParams(block, defs, parameter);
  });
  const node = {
    type: 'Action',
    action: 'BRIC.start_motion:motion/start_motion',
    parameter,
    id: randomId(),
  };
  return JSON.stringify(node) + '\n';
};

javascriptGenerator.forBlock['behavior__motion__motion_start_motion'] = function(block, generator) {
  const parameter = {};
  assignParamValue(parameter, {"name": "task_type", "output_name": "task_type", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_TASK_TYPE'));
  assignParamValue(parameter, {"name": "repeat", "output_name": "repeat", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_REPEAT'));
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
  assignParamValue(parameter, {"name": "mode", "output_name": "mode", "parent_key": "", "type": "string"}, block.getFieldValue('PARAM_MODE'));
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