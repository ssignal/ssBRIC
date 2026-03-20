window.toolboxCustomBasic = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "BT Logic",
      "categorystyle": "bt_logic_category",
      "contents": [
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
          "type": "bt_logic__recovery"
        },
        {
          "kind": "block",
          "type": "bt_logic__sequence"
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
          "type": "bt_logic__loop"
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
      "name": "BT Function",
      "categorystyle": "bt_function_category",
      "contents": [
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
          "type": "bt_function__sleep"
        }
      ]
    },
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
      "name": "Navigation",
      "categorystyle": "navigation_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__navigation__navigation_move_to_pose"
        },
        {
          "kind": "block",
          "type": "behavior__navigation__navigation_move_in_direction"
        },
        {
          "kind": "block",
          "type": "behavior__navigation__navigation_rotate"
        },
        {
          "kind": "block",
          "type": "behavior__navigation__navigation_wait_move_finished"
        },
        {
          "kind": "block",
          "type": "behavior__navigation__navigation_stop_move"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Sound",
      "categorystyle": "sound_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__sound__sound_start_play"
        },
        {
          "kind": "block",
          "type": "behavior__sound__sound_start_play_tts"
        },
        {
          "kind": "block",
          "type": "behavior__sound__sound_wait_play_completed"
        },
        {
          "kind": "block",
          "type": "behavior__sound__sound_stop_play"
        },
        {
          "kind": "block",
          "type": "behavior__sound__sound_set_volume"
        }
      ]
    },
    {
      "kind": "category",
      "name": "LCD",
      "categorystyle": "lcd_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__lcd__lcd_play_animation"
        },
        {
          "kind": "block",
          "type": "behavior__lcd__lcd_stop_animation"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Device",
      "categorystyle": "device_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__device__device_set_led"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Etc",
      "categorystyle": "etc_category",
      "contents": [
        {
          "kind": "block",
          "type": "behavior__etc__demo_set_demo_id"
        }
      ]
    }
  ]
};
