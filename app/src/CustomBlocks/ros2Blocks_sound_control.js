const BLOCKS = [
  {
    "type": "behavior__sound_control__sound_start_play",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "sound/start_play",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_SOUND_ID"
      },
      {
        "type": "field_label",
        "text": "sound_id"
      },
      {
        "type": "field_input",
        "name": "PARAM_SOUND_ID",
        "text": ""
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "등록된 sound/music 항목을 재생한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound_control__sound_start_play_tts",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "sound/start_play_tts",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_TEXT"
      },
      {
        "type": "field_label",
        "text": "text"
      },
      {
        "type": "field_input",
        "name": "PARAM_TEXT",
        "text": ""
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "입력한 텍스트를 TTS로 재생한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound_control__sound_stop_play",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "sound/stop_play",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "현재 재생 중인 sound를 강제로 종료한다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound_control__sound_wait_play_completed",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "sound/wait_play_completed",
        "name": "TITLE"
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "현재 sound 재생이 끝날 때까지 기다린다.",
    "helpUrl": ""
  },
  {
    "type": "behavior__sound_control__sound_set_volume",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP"
      },
      {
        "type": "field_label",
        "text": "sound/set_volume",
        "name": "TITLE"
      },
      {
        "type": "field_image",
        "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='white' stroke='black' stroke-width='1.2'/><text x='8' y='11.2' text-anchor='middle' font-size='10' fill='black' font-family='Arial'>?</text></svg>",
        "width": 16,
        "height": 16,
        "alt": "?",
        "name": "HELP_VOLUME"
      },
      {
        "type": "field_label",
        "text": "volume"
      },
      {
        "type": "field_dropdown",
        "name": "PARAM_VOLUME",
        "options": [
          [
            "1",
            "1"
          ],
          [
            "2",
            "2"
          ],
          [
            "3",
            "3"
          ],
          [
            "4",
            "4"
          ],
          [
            "5",
            "5"
          ],
          [
            "6",
            "6"
          ],
          [
            "7",
            "7"
          ],
          [
            "8",
            "8"
          ],
          [
            "9",
            "9"
          ],
          [
            "10",
            "10"
          ]
        ]
      }
    ],
    "previousStatement": "BTNode",
    "nextStatement": "BTNode",
    "colour": 210,
    "tooltip": "sound 볼륨을 설정한다.",
    "helpUrl": ""
  }
];
const BLOCK_TOOLTIPS = {
  "behavior__sound_control__sound_start_play": "등록된 sound/music 항목을 재생한다.",
  "behavior__sound_control__sound_start_play_tts": "입력한 텍스트를 TTS로 재생한다.",
  "behavior__sound_control__sound_stop_play": "현재 재생 중인 sound를 강제로 종료한다.",
  "behavior__sound_control__sound_wait_play_completed": "현재 sound 재생이 끝날 때까지 기다린다.",
  "behavior__sound_control__sound_set_volume": "sound 볼륨을 설정한다."
};
const PARAM_TOOLTIPS = {
  "behavior__sound_control__sound_start_play": {
    "PARAM_SOUND_ID": "ID from /api/action/sound/list. For music entries, the app publishes the mapped URL."
  },
  "behavior__sound_control__sound_start_play_tts": {
    "PARAM_TEXT": "Text to speak."
  },
  "behavior__sound_control__sound_stop_play": {},
  "behavior__sound_control__sound_wait_play_completed": {},
  "behavior__sound_control__sound_set_volume": {
    "PARAM_VOLUME": "Playback volume level."
  }
};

function registerBlocks_ros2blocks_sound_control() {
  Blockly.defineBlocksWithJsonArray(BLOCKS);
  Object.entries(BLOCK_TOOLTIPS).forEach(([blockType, tip]) => {
    const def = Blockly.Blocks[blockType];
    if (def) {
      const baseInit = def.init;
      def.init = function wrappedInit() {
        baseInit.call(this);
        this.setTooltip(tip || '');
        const perField = PARAM_TOOLTIPS[blockType] || {};
        Object.entries(perField).forEach(([fieldName, fieldTip]) => {
          const field = this.getField(fieldName);
          if (field && field.setTooltip) {
            field.setTooltip(fieldTip || '');
          }
          const helpField = this.getField('HELP_' + fieldName.replace('PARAM_', ''));
          if (helpField && helpField.setTooltip) {
            helpField.setTooltip(fieldTip || '');
          }
        });
      };
    }
  });
}

window.BRIC = window.BRIC || {};
window.BRIC.blockRegistrars = window.BRIC.blockRegistrars || [];
window.BRIC.blockRegistrars.push(registerBlocks_ros2blocks_sound_control);
