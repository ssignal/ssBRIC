import Blockly from 'blockly/core';

export const themeForCustomBasic = Blockly.Theme.defineTheme('custom_basic', {
  'base': Blockly.Themes.Zelos,  
  // 'componentStyles': {
  //   'workspaceBackgroundColour': '#1e1e1e',
  //   'toolboxBackgroundColour': 'blackBackground',
  //   'toolboxForegroundColour': '#fff',
  //   'flyoutBackgroundColour': '#252526',
  //   'flyoutForegroundColour': '#ccc',
  //   'flyoutOpacity': 1,
  //   'scrollbarColour': '#797979',
  //   'insertionMarkerColour': '#fff',
  //   'insertionMarkerOpacity': 0.3,
  //   'scrollbarOpacity': 0.4,
  //   'cursorColour': '#d0d0d0',
  //   'blackBackground': '#333',
  // },
	'categoryStyles' : {
		'perception_category': {
			'colour': '#F27DC7'
		},
		'execute_category': {
			'colour': '#7D0DEE',
		},
		'motion_category': {
			'colour': '#EF3C28',
		},    
		'developer_category': {
			'colour': '#4CDDFA',
		},    
	},
  'blockStyles': {
    'perception_blocks': {
			'colourPrimary': '#F27DC7',
      'colourSecondary': '#D06AB5',
      // 'colourTertiary':'DC7171'
    },
    'execute_blocks': {
			'colourPrimary': '#7D0DEE',
      'colourSecondary': '#6A0BCF',
      // 'colourTertiary':'DC7171'
    },
    'motion_blocks': {
			'colourPrimary': '#EF3C28',
      'colourSecondary': '#CF3422',
      // 'colourTertiary':'DC7171'
    },    
		    'developer_blocks': {
					'colourPrimary': '#4CDDFA',
		      'colourSecondary': '#42BEDA',
		      // 'colourTertiary':'DC7171'
		    },    'completed_blocks': {
			'colourPrimary': '#7A7777',
      'colourTertiary':'#DC2222'
    },  
	},
	'fontStyle': {

	},
});