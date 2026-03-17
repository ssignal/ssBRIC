window.toolboxCustomBasic = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Motion",
      "categorystyle": "motion_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__motion__motion_start_motion"
        },
        {
          "kind": "block",
          "type": "behavior__motion__motion_stop_motion"
        },
        {
          "kind": "block",
          "type": "behavior__motion__motion_wait_motion_finished"
        }
      ]
    },
    {
      "kind": "category",
      "name": "자율 주행",
      "categorystyle": "item_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__item__navigation_move_to_pose"
        },
        {
          "kind": "block",
          "type": "behavior__item__navigation_moving_to_pose"
        },
        {
          "kind": "block",
          "type": "behavior__item__navigation_stop_move"
        },
        {
          "kind": "block",
          "type": "behavior__item__navigation_rotate"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Sound control",
      "categorystyle": "sound_control_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__sound_control__sound_start_play"
        },
        {
          "kind": "block",
          "type": "behavior__sound_control__sound_start_play_tts"
        },
        {
          "kind": "block",
          "type": "behavior__sound_control__sound_stop_play"
        },
        {
          "kind": "block",
          "type": "behavior__sound_control__sound_wait_play_completed"
        },
        {
          "kind": "block",
          "type": "behavior__sound_control__sound_set_volume"
        }
      ]
    },
    {
      "kind": "category",
      "name": "BT_Logic",
      "categorystyle": "bt_logic_category",
      "contents": [
        {
          "kind": "block",
          "type": "bt_logic__fallback"
        },
        {
          "kind": "block",
          "type": "bt_logic__ifthenelse"
        },
        {
          "kind": "block",
          "type": "bt_logic__parallel"
        },
        {
          "kind": "block",
          "type": "bt_logic__pipelinesequence"
        },
        {
          "kind": "block",
          "type": "bt_logic__pipelineselect"
        },
        {
          "kind": "block",
          "type": "bt_logic__reactivefallback"
        },
        {
          "kind": "block",
          "type": "bt_logic__reactivesequence"
        },
        {
          "kind": "block",
          "type": "bt_logic__recovery"
        },
        {
          "kind": "block",
          "type": "bt_logic__sequence"
        },
        {
          "kind": "block",
          "type": "bt_logic__sequencestar"
        },
        {
          "kind": "block",
          "type": "bt_logic__delay"
        },
        {
          "kind": "block",
          "type": "bt_logic__forcesuccess"
        },
        {
          "kind": "block",
          "type": "bt_logic__forcefailure"
        },
        {
          "kind": "block",
          "type": "bt_logic__inverse"
        },
        {
          "kind": "block",
          "type": "bt_logic__loop"
        },
        {
          "kind": "block",
          "type": "bt_logic__retry"
        },
        {
          "kind": "block",
          "type": "bt_logic__retryuntilsuccess"
        },
        {
          "kind": "block",
          "type": "bt_logic__repeat"
        },
        {
          "kind": "block",
          "type": "bt_logic__timeout"
        },
        {
          "kind": "block",
          "type": "bt_logic__whiledoelse"
        }
      ]
    },
    {
      "kind": "category",
      "name": "BT_Function",
      "categorystyle": "bt_function_category",
      "contents": [
        {
          "kind": "block",
          "type": "bt_function__root"
        },
        {
          "kind": "block",
          "type": "bt_function__subtree"
        },
        {
          "kind": "block",
          "type": "bt_function__action"
        },
        {
          "kind": "block",
          "type": "bt_function__actiondummy"
        },
        {
          "kind": "block",
          "type": "bt_function__condition"
        },
        {
          "kind": "block",
          "type": "bt_function__sleep"
        }
      ]
    }
  ]
};
