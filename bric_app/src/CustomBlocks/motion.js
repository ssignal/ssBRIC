import Blockly from 'blockly/core';

// block type naming rule : {toolbox_name}_{block_description}

const motionList = [
  "E1_AWE_1",
	"E1_AWE_2",
	"E2_EXCITING_1",
	"E2_EXCITING_2",
	"E3_SURPRISE_1",
	"E4_ANTICIPATION_1",
	"E4_ANTICIPATION_2",
	"E4_ANTICIPATION_3",
	"E5_CONFIDENT_1",
	"E5_CONFIDENT_2",
	"E6_LOVE_1",
	"E7_DELIGHT_1",
	"E7_DELIGHT_2",
	"E8_JOY_1",
	"E8_JOY_2",
	"E9_CURIOSITY_1",
	"E12_DO_NOT_KNOW_1",
	"E12_DO_NOT_KNOW_2",
	"E13_EXCLAMATION_1",
	"E14_DIZZY_1",
	"E15_SADNESS_1",
	"E16_SHAME_1",
	"E17_ANXIETY_1",
	"E17_ANXIETY_2",
	"E18_FEAR_2",
	"F0_CONVERSATION_FAILED_1",
	"D1_LOOK_AROUND_1",
	"A1_SHAKE_HEADSET_1",
	"A2_NOTICE_1",
	"A3_VOICE_MAIL_DELIVERY_END",
	"A4_WITH_ACCELERATION_1",
	"A4_WITH_ACCELERATION_2",
	"A5_WITH_DECELERATION_1",
	"A5_WITH_DECELERATION_2",
	"UP_DOWN",
	"DOWN_UP",
	"DANCE_1",
	"DANCE_FUNKY",
	"DANCE_SWING",
	"DANCE_EDM",
	"DANCE_EDM_FUNKY_CES_LEFT",
	"DANCE_EDM_FUNKY_CES_CENTER",
	"DANCE_EDM_FUNKY_CES_RIGHT",
	"KBIS_DANCE_1",
	"KBIS_DANCE_2",
	"KBIS_DANCE_3",
	"KBIS_DANCE_4",
	"KBIS_DANCE_5",
]

const motionJson = {
	"message0": "start motion %1",
	"args0": [
		{
			'type': 'field_dropdown',
			'name': 'MOTION',
			'options': [			
			],
		}
	],
	"previousStatement": null,
	"nextStatement": null,
	"style": "motion_blocks",
}

const motionAweJson = JSON.parse(JSON.stringify(motionJson));;
motionAweJson.args0[0].options = [
	['AWE_1', motionList.indexOf('E1_AWE_1').toString()],
	['AWE_2', motionList.indexOf('E1_AWE_2').toString()],
];

Blockly.Blocks['c_motion_awe'] = {
	init: function() {
		this.jsonInit(motionAweJson);
	}
}

const motionExcitingJson = JSON.parse(JSON.stringify(motionJson));;
motionExcitingJson.args0[0].options = [
	['EXCITING_1', motionList.indexOf('E2_EXCITING_1').toString()],
	['EXCITING_2', motionList.indexOf('E2_EXCITING_2').toString()],
];

Blockly.Blocks['c_motion_exciting'] = {
	init: function() {
		this.jsonInit(motionExcitingJson);
	}
}

const motionSurpriseJson = JSON.parse(JSON.stringify(motionJson));;
motionSurpriseJson.args0[0].options = [
	['SURPRISE_1', motionList.indexOf('E3_SURPRISE_1').toString()],
];

Blockly.Blocks['c_motion_surprise'] = {
	init: function() {
		this.jsonInit(motionSurpriseJson);
	}
}

const motionAnticipationJson = JSON.parse(JSON.stringify(motionJson));;
motionAnticipationJson.args0[0].options = [
	['ANTICIPATION_1', motionList.indexOf('E4_ANTICIPATION_1').toString()],
	['ANTICIPATION_2', motionList.indexOf('E4_ANTICIPATION_2').toString()],
	['ANTICIPATION_3', motionList.indexOf('E4_ANTICIPATION_3').toString()],
];

Blockly.Blocks['c_motion_anticipation'] = {
	init: function() {
		this.jsonInit(motionAnticipationJson);
	}
}

const motionConfidentJson = JSON.parse(JSON.stringify(motionJson));;
motionConfidentJson.args0[0].options = [
	['CONFIDENT_1', motionList.indexOf('E5_CONFIDENT_1').toString()],
	['CONFIDENT_2', motionList.indexOf('E5_CONFIDENT_2').toString()],
];

Blockly.Blocks['c_motion_confident'] = {
	init: function() {
		this.jsonInit(motionConfidentJson);
	}
}

const motionLoveJson = JSON.parse(JSON.stringify(motionJson));;
motionLoveJson.args0[0].options = [
	['LOVE_1', motionList.indexOf('E6_LOVE_1').toString()],
];

Blockly.Blocks['c_motion_love'] = {
	init: function() {
		this.jsonInit(motionLoveJson);
	}
}

const motionDelightJson = JSON.parse(JSON.stringify(motionJson));;
motionDelightJson.args0[0].options = [
	['DELIGHT_1', motionList.indexOf('E7_DELIGHT_1').toString()],
	['DELIGHT_2', motionList.indexOf('E7_DELIGHT_2').toString()],
];

Blockly.Blocks['c_motion_delight'] = {
	init: function() {
		this.jsonInit(motionDelightJson);
	}
}

const motionJoyJson = JSON.parse(JSON.stringify(motionJson));;
motionJoyJson.args0[0].options = [
	['JOY_1', motionList.indexOf('E8_JOY_1').toString()],
	['JOY_2', motionList.indexOf('E8_JOY_2').toString()],
];

Blockly.Blocks['c_motion_joy'] = {
	init: function() {
		this.jsonInit(motionJoyJson);
	}
}

const motionCuriosityJson = JSON.parse(JSON.stringify(motionJson));;
motionCuriosityJson.args0[0].options = [
	['CURIOSITY_1', motionList.indexOf('E9_CURIOSITY_1').toString()],
];

Blockly.Blocks['c_motion_curiosity'] = {
	init: function() {
		this.jsonInit(motionCuriosityJson);
	}
}

const motionDoNotKnowJson = JSON.parse(JSON.stringify(motionJson));;
motionDoNotKnowJson.args0[0].options = [
	['DO_NOT_KNOW_1', motionList.indexOf('E12_DO_NOT_KNOW_1').toString()],
	['DO_NOT_KNOW_2', motionList.indexOf('E12_DO_NOT_KNOW_2').toString()],
];

Blockly.Blocks['c_motion_doNotKnow'] = {
	init: function() {
		this.jsonInit(motionDoNotKnowJson);
	}
}

const motionExclamationJson = JSON.parse(JSON.stringify(motionJson));;
motionExclamationJson.args0[0].options = [
	['EXCLAMATION_1', motionList.indexOf('E13_EXCLAMATION_1').toString()],		
];

Blockly.Blocks['c_motion_exclamation'] = {
	init: function() {
		this.jsonInit(motionExclamationJson);
	}
}

const motionDizzyJson = JSON.parse(JSON.stringify(motionJson));;
motionDizzyJson.args0[0].options = [
	['DIZZY_1', motionList.indexOf('E14_DIZZY_1').toString()],		
];

Blockly.Blocks['c_motion_dizzy'] = {
	init: function() {
		this.jsonInit(motionDizzyJson);
	}
}

const motionSadnessJson = JSON.parse(JSON.stringify(motionJson));;
motionSadnessJson.args0[0].options = [
	['SADNESS_1', motionList.indexOf('E15_SADNESS_1').toString()],		
];

Blockly.Blocks['c_motion_sadness'] = {
	init: function() {
		this.jsonInit(motionSadnessJson);
	}
}

const motionShameJson = JSON.parse(JSON.stringify(motionJson));;
motionShameJson.args0[0].options = [
	['SHAME_1', motionList.indexOf('E16_SHAME_1').toString()],				
];

Blockly.Blocks['c_motion_shame'] = {
	init: function() {
		this.jsonInit(motionShameJson);
	}
}

const motionAnxietyJson = JSON.parse(JSON.stringify(motionJson));;
motionAnxietyJson.args0[0].options = [
	['ANXIETY_1', motionList.indexOf('E17_ANXIETY_1').toString()],
	['ANXIETY_2', motionList.indexOf('E17_ANXIETY_2').toString()],
];

Blockly.Blocks['c_motion_anxiety'] = {
	init: function() {
		this.jsonInit(motionAnxietyJson);
	}
}


const motionFearJson = JSON.parse(JSON.stringify(motionJson));
motionFearJson.args0[0].options = [
	['FEAR_2', motionList.indexOf('E18_FEAR_2').toString()],
];

Blockly.Blocks['c_motion_fear'] = {
	init: function() {
		this.jsonInit(motionFearJson);
	}
}

const motionConversationFailedJson = JSON.parse(JSON.stringify(motionJson));
motionConversationFailedJson.args0[0].options = [
	['CONVERSATION_FAILED_1', motionList.indexOf('F0_CONVERSATION_FAILED_1').toString()],
];

Blockly.Blocks['c_motion_conversationFailed'] = {
	init: function() {
		this.jsonInit(motionConversationFailedJson);
	}
}

const motionLookAroundJson = JSON.parse(JSON.stringify(motionJson));
motionLookAroundJson.args0[0].options = [
	['LOOK_AROUND_1', motionList.indexOf('D1_LOOK_AROUND_1').toString()],
];

Blockly.Blocks['c_motion_lookAround'] = {
	init: function() {
		this.jsonInit(motionLookAroundJson);
	}
}

const motionShakeHeadsetJson = JSON.parse(JSON.stringify(motionJson));
motionShakeHeadsetJson.args0[0].options = [
	['SHAKE_HEADSET_1', motionList.indexOf('A1_SHAKE_HEADSET_1').toString()],
];

Blockly.Blocks['c_motion_shakeHeadset'] = {
	init: function() {
		this.jsonInit(motionShakeHeadsetJson);
	}
}

const motionNoticeJson = JSON.parse(JSON.stringify(motionJson));
motionNoticeJson.args0[0].options = [
	['NOTICE_1', motionList.indexOf('A2_NOTICE_1').toString()],
];

Blockly.Blocks['c_motion_notice'] = {
	init: function() {
		this.jsonInit(motionNoticeJson);
	}
}

const motionVoiceMailDeliveryEndJson = JSON.parse(JSON.stringify(motionJson));
motionVoiceMailDeliveryEndJson.args0[0].options = [
	['VOICE_MAIL_DELIVERY_END', motionList.indexOf('A3_VOICE_MAIL_DELIVERY_END').toString()],
];

Blockly.Blocks['c_motion_voiceMailDeliveryEnd'] = {
	init: function() {
		this.jsonInit(motionVoiceMailDeliveryEndJson);
	}
}

const motionWithAccelerationJson = JSON.parse(JSON.stringify(motionJson));
motionWithAccelerationJson.args0[0].options = [
	['A4_WITH_ACCELERATION_1', motionList.indexOf('A4_WITH_ACCELERATION_1').toString()],
	['A4_WITH_ACCELERATION_2', motionList.indexOf('A4_WITH_ACCELERATION_2').toString()],
];

Blockly.Blocks['c_motion_withAcceleration'] = {
	init: function() {
		this.jsonInit(motionWithAccelerationJson);
	}
}

const motionWithDecelerationJson = JSON.parse(JSON.stringify(motionJson));
motionWithDecelerationJson.args0[0].options = [
	['A5_WITH_DECELERATION_1', motionList.indexOf('A5_WITH_DECELERATION_1').toString()],
	['A5_WITH_DECELERATION_2', motionList.indexOf('A5_WITH_DECELERATION_2').toString()],
];

Blockly.Blocks['c_motion_withDeceleration'] = {
	init: function() {
		this.jsonInit(motionWithDecelerationJson);
	}
}

const motionUpDownJson = JSON.parse(JSON.stringify(motionJson));
motionUpDownJson.args0[0].options = [
	['UP_DOWN', motionList.indexOf('UP_DOWN').toString()],
	['DOWN_UP', motionList.indexOf('DOWN_UP').toString()],
];

Blockly.Blocks['c_motion_upDown'] = {
	init: function() {
		this.jsonInit(motionUpDownJson);
	}
}

const motionDanceJson = JSON.parse(JSON.stringify(motionJson));
motionDanceJson.args0[0].options = [
	['DANCE_1', motionList.indexOf('DANCE_1').toString()],
	['DANCE_FUNKY', motionList.indexOf('DANCE_FUNKY').toString()],
	['DANCE_SWING', motionList.indexOf('DANCE_SWING').toString()],
	['DANCE_EDM', motionList.indexOf('DANCE_EDM').toString()],
];

Blockly.Blocks['c_motion_dance'] = {
	init: function() {
		this.jsonInit(motionDanceJson);
	}
}

const motionDanceEdmCesJson = JSON.parse(JSON.stringify(motionJson));
motionDanceEdmCesJson.args0[0].options = [
	['DANCE_EDM_FUNKY_CES_LEFT', motionList.indexOf('DANCE_EDM_FUNKY_CES_LEFT').toString()],
	['DANCE_EDM_FUNKY_CES_CENTER', motionList.indexOf('DANCE_EDM_FUNKY_CES_CENTER').toString()],
	['DANCE_EDM_FUNKY_CES_RIGHT', motionList.indexOf('DANCE_EDM_FUNKY_CES_RIGHT').toString()],
];

Blockly.Blocks['c_motion_danceEdmCes'] = {
	init: function() {
		this.jsonInit(motionDanceEdmCesJson);
	}
}

const motionDanceKbisJson = JSON.parse(JSON.stringify(motionJson));
motionDanceKbisJson.args0[0].options = [
	['KBIS_DANCE_1', motionList.indexOf('KBIS_DANCE_1').toString()],
	['KBIS_DANCE_2', motionList.indexOf('KBIS_DANCE_2').toString()],
	['KBIS_DANCE_3', motionList.indexOf('KBIS_DANCE_3').toString()],
	['KBIS_DANCE_4', motionList.indexOf('KBIS_DANCE_4').toString()],
	['KBIS_DANCE_5', motionList.indexOf('KBIS_DANCE_5').toString()],
];

Blockly.Blocks['c_motion_danceKbis'] = {
	init: function() {
		this.jsonInit(motionDanceKbisJson);
	}
}

const stopMotionJson = {
	"message0": "stop motion",
	"inputsInline": false,
	"previousStatement": null,
	"nextStatement": null,
	"style": "motion_blocks",
}

Blockly.Blocks['c_motion_stopMotion'] = {
	init: function() {
		this.jsonInit(stopMotionJson);
	}
}
// Extensions and Mutators