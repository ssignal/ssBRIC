export const toolboxCustomBasic = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Perception',
      categorystyle: 'perception_category',
      contents: [
        {
          kind: 'label',
          text: 'Sound',
        },
        {
          kind: 'block',
          type: 'c_perception_startWakewordDetection',
        },
        {
          kind: 'block',
          type: 'c_perception_stopWakewordDetection',
        },
        {
          kind: 'block',
          type: 'c_perception_wakeWordDetection',
        },
        {
          kind: 'label',
          text: 'Vision',
        },
        {
          kind: 'block',
          type: 'c_perception_startCamera',
        },
        {
          kind: 'block',
          type: 'c_perception_stopCamera',
        },
        {
          kind: 'block',
          type: 'c_perception_personDetection',
        },
        {
          kind: 'label',
          text: 'Pose',
        },
        {
          kind: 'block',
          type: 'c_perception_fallDownDetection',
        },
        {
          kind: 'block',
          type: 'c_perception_pickUpDetection',
        },
        {
          kind: 'label',
          text: 'Perceived Variables',
        },
        {
          kind: 'block',
          type: 'c_perception_headsetAngle',
        },
        {
          kind: 'block',
          type: 'c_perception_hipAngle',
        },
        // {
        //   "kind": "block",
        //   "type": "c_perception_wheelSpeed"
        // },
      ],
    },
    {
      kind: 'category',
      name: 'Execute',
      categorystyle: 'execute_category',
      contents: [
        {
          kind: 'label',
          text: 'HEADSET',
        },
        {
          kind: 'block',
          type: 'c_execute_rotateHeadset',
        },
        {
          kind: 'block',
          type: 'c_execute_rotateHeadsetWithSpeed',
        },
        {
          kind: 'label',
          text: 'HIP',
        },
        {
          kind: 'block',
          type: 'c_execute_moveOneHip',
        },
        {
          kind: 'block',
          type: 'c_execute_moveOneHipWithSpeed',
        },
        {
          kind: 'block',
          type: 'c_execute_moveBothHip',
        },
        {
          kind: 'block',
          type: 'c_execute_moveBothHipWithSpeed',
        },
        {
          kind: 'block',
          type: 'c_execute_tiltBody',
        },
        // {
        //   'kind': 'block',
        //   'type': 'c_execute_tiltBodyWithSpeed'
        // },
        {
          kind: 'block',
          type: 'c_execute_moveHeadsetAndHip',
        },
        {
          kind: 'block',
          type: 'c_execute_moveHeadsetAndHipWithSpeed',
        },
        {
          kind: 'label',
          text: 'WHEEL',
        },
        {
          kind: 'block',
          type: 'c_execute_spinInPlace',
        },
        {
          kind: 'block',
          type: 'c_execute_spinDegrees',
        },
        {
          kind: 'block',
          type: 'c_execute_spinDegreesWithSpeed',
        },
        {
          kind: 'block',
          type: 'c_execute_moveBackOrForth',
        },
        {
          kind: 'block',
          type: 'c_execute_moveDistance',
        },
        {
          kind: 'block',
          type: 'c_execute_moveDistanceWithSpeed',
        },
        {
          kind: 'block',
          type: 'c_execute_spinDegreesAndMove',
        },
        {
          kind: 'block',
          type: 'c_execute_moveAlongTurningRadius',
        },
        {
          kind: 'label',
          text: 'STOP MOVEMENT',
        },
        {
          kind: 'block',
          type: 'c_execute_stopHeadset',
        },
        {
          kind: 'block',
          type: 'c_execute_stopHip',
        },
        {
          kind: 'block',
          type: 'c_execute_stopWheel',
        },
        {
          kind: 'block',
          type: 'c_execute_stopAllMovement',
        },
        {
          kind: 'label',
          text: 'FACE',
        },
        {
          kind: 'block',
          type: 'c_execute_facialExpression',
        },
        {
          kind: 'label',
          text: 'SOUND',
        },
        {
          kind: 'block',
          type: 'c_execute_playSoundEmotionSync',
        },
        {
          kind: 'block',
          type: 'c_execute_playSoundEmotionAsync',
        },
        {
          kind: 'block',
          type: 'c_execute_playTTSSync',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: '안녕하세요',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'c_execute_playTTSAsync',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: '안녕하세요',
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Logic',
      categorystyle: 'logic_category',
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
        {
          kind: 'block',
          type: 'c_logic_wait_until',
        },
        {
          kind: 'block',
          type: 'c_logic_wait_seconds',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Loops',
      categorystyle: 'loop_category',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'c_loop_repeat_while',
        },
        {
          kind: 'block',
          type: 'c_loop_repeat_until',
        },
        {
          kind: 'block',
          type: 'c_loop_repeat_infinitely',
        },
        {
          kind: 'block',
          type: 'c_loop_continue',
        },
        {
          kind: 'block',
          type: 'c_loop_break',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Math',
      categorystyle: 'math_category',
      contents: [
        {
          kind: 'block',
          type: 'math_arithmetic',
          inputs: {
            A: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            B: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_modulo',
          inputs: {
            DIVIDEND: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 64,
                },
              },
            },
            DIVISOR: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_random_int',
          inputs: {
            FROM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_number',
          fields: {
            NUM: 123,
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Variables',
      categorystyle: 'variable_category',
      custom: 'VARIABLE',
      contents: [],
    },
    {
      kind: 'category',
      name: 'Motions____asdfs',
      categorystyle: 'motion_category',
      contents: [
        {
          kind: 'block',
          type: 'c_motion_awe',
        },
        {
          kind: 'block',
          type: 'c_motion_exciting',
        },
        {
          kind: 'block',
          type: 'c_motion_surprise',
        },
        {
          kind: 'block',
          type: 'c_motion_anticipation',
        },
        {
          kind: 'block',
          type: 'c_motion_confident',
        },
        {
          kind: 'block',
          type: 'c_motion_love',
        },
        {
          kind: 'block',
          type: 'c_motion_delight',
        },
        {
          kind: 'block',
          type: 'c_motion_joy',
        },
        {
          kind: 'block',
          type: 'c_motion_curiosity',
        },
        {
          kind: 'block',
          type: 'c_motion_doNotKnow',
        },
        {
          kind: 'block',
          type: 'c_motion_exclamation',
        },
        {
          kind: 'block',
          type: 'c_motion_dizzy',
        },
        {
          kind: 'block',
          type: 'c_motion_sadness',
        },
        {
          kind: 'block',
          type: 'c_motion_shame',
        },
        {
          kind: 'block',
          type: 'c_motion_anxiety',
        },
        {
          kind: 'block',
          type: 'c_motion_fear',
        },
        {
          kind: 'block',
          type: 'c_motion_conversationFailed',
        },
        {
          kind: 'block',
          type: 'c_motion_lookAround',
        },
        {
          kind: 'block',
          type: 'c_motion_shakeHeadset',
        },
        {
          kind: 'block',
          type: 'c_motion_notice',
        },
        {
          kind: 'block',
          type: 'c_motion_voiceMailDeliveryEnd',
        },
        {
          kind: 'block',
          type: 'c_motion_dance',
        },
        {
          kind: 'block',
          type: 'c_motion_danceEdmCes',
        },
        {
          kind: 'block',
          type: 'c_motion_danceKbis',
        },
        {
          kind: 'block',
          type: 'c_motion_upDown',
        },
        {
          kind: 'block',
          type: 'c_motion_stopMotion',
        },
      ],
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: 'ForDevelopers',
      categorystyle: 'developer_category',
      contents: [
        {
          kind: 'label',
          text: 'Set up Robot',
        },
        {
          kind: 'block',
          type: 'c_developer_volumeControl',
        },
        {
          kind: 'block',
          type: 'c_perception_startCamera',
        },
        {
          kind: 'block',
          type: 'c_perception_stopCamera',
        },
        {
          kind: 'block',
          type: 'c_developer_initPose',
        },
        {
          kind: 'label',
          text: 'Get Robot status',
        },
        {
          kind: 'block',
          type: 'c_developer_batteryLevel',
        },
        {
          kind: 'label',
          text: 'Debugging',
        },
        {
          kind: 'block',
          type: 'c_developer_print',
        },
        {
          kind: 'block',
          type: 'text',
        },
        {
          kind: 'block',
          type: 'c_developer_sendMotorInput',
        },
      ],
    },
    {
      kind: 'category',
      name: 'BT Logic',
      categorystyle: 'logic_category',
      contents: [
        {
          kind: 'block',
          type: 'bt_program_start',
        },
        {
          kind: 'block',
          type: 'bt_sequence',
        },
        {
          kind: 'block',
          type: 'bt_selector',
        },
        {
          kind: 'block',
          type: 'bt_condition',
        },
        {
          kind: 'block',
          type: 'bt_action',
        },
        {
          kind: 'block',
          type: 'bt_inverter',
        },
        {
          kind: 'block',
          type: 'bt_fallback',
        },
        {
          kind: 'block',
          type: 'bt_ifthenelse',
        },
        {
          kind: 'block',
          type: 'bt_parallel',
        },
        {
          kind: 'block',
          type: 'bt_pipelinesequence',
        },
        {
          kind: 'block',
          type: 'bt_pipelineselect',
        },
        {
          kind: 'block',
          type: 'bt_reactivefallback',
        },
        {
          kind: 'block',
          type: 'bt_reactivesequence',
        },
        {
          kind: 'block',
          type: 'bt_recovery',
        },
        {
          kind: 'block',
          type: 'bt_sequencestar',
        },
        {
          kind: 'block',
          type: 'bt_delay',
        },
        {
          kind: 'block',
          type: 'bt_forcesuccess',
        },
        {
          kind: 'block',
          type: 'bt_forcefailure',
        },
        {
          kind: 'block',
          type: 'bt_inverse',
        },
        {
          kind: 'block',
          type: 'bt_loop',
        },
        {
          kind: 'block',
          type: 'bt_retry',
        },
        {
          kind: 'block',
          type: 'bt_retryuntilsuccess',
        },
        {
          kind: 'block',
          type: 'bt_repeat',
        },
        {
          kind: 'block',
          type: 'bt_timeout',
        },
        {
          kind: 'block',
          type: 'bt_whiledoelse',
        },
      ],
    },
// AUTO-GEN-START: BTLIST_motion
    {
      'kind': 'category',
      'name': "Motion",
      'categorystyle': 'execute_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'c_bt_motion_motion_start_motion'
        },
        {
          'kind': 'block',
          'type': 'c_bt_motion_motion_stop_motion'
        },
        {
          'kind': 'block',
          'type': 'c_bt_motion_motion_wait_motion_finished'
        }
      ],
    },
    // AUTO-GEN-END: BTLIST_motion
    // AUTO-GEN-START: BTLIST_navigation
    {
      'kind': 'category',
      'name': "자율 주행",
      'categorystyle': 'execute_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'c_bt_navigation_navigation_move_to_pose'
        },
        {
          'kind': 'block',
          'type': 'c_bt_navigation_navigation_moving_to_pose'
        },
        {
          'kind': 'block',
          'type': 'c_bt_navigation_navigation_stop_move'
        },
        {
          'kind': 'block',
          'type': 'c_bt_navigation_navigation_rotate'
        }
      ],
    },
    // AUTO-GEN-END: BTLIST_navigation
    // AUTO-GEN-START: BTLIST_sound_control
    {
      'kind': 'category',
      'name': "Sound control",
      'categorystyle': 'execute_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'c_bt_sound_control_sound_start_play'
        },
        {
          'kind': 'block',
          'type': 'c_bt_sound_control_sound_start_play_tts'
        },
        {
          'kind': 'block',
          'type': 'c_bt_sound_control_sound_stop_play'
        },
        {
          'kind': 'block',
          'type': 'c_bt_sound_control_sound_wait_play_completed'
        },
        {
          'kind': 'block',
          'type': 'c_bt_sound_control_sound_set_volume'
        }
      ],
    },
    // AUTO-GEN-END: BTLIST_sound_control
    // AUTO-GEN-START: BTLIST_bt_function
    {
      'kind': 'category',
      'name': "BT Function",
      'categorystyle': 'execute_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'c_bt_bt_function_subtree'
        },
        {
          'kind': 'block',
          'type': 'c_bt_bt_function_action'
        },
        {
          'kind': 'block',
          'type': 'c_bt_bt_function_actiondummy'
        },
        {
          'kind': 'block',
          'type': 'c_bt_bt_function_condition'
        },
        {
          'kind': 'block',
          'type': 'c_bt_bt_function_sleep'
        }
      ],
    },
    // AUTO-GEN-END: BTLIST_bt_function
  ],
};
