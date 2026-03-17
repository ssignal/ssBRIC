import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// style sheet
import './App.css';

// mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

// Blockly component
import Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import locale from 'blockly/msg/en';
import 'blockly/blocks';
import { Backpack } from '@blockly/workspace-backpack';

// custom Blockly component
import './CustomBlocks/blocks';
import {
  perceptionGenerator,
  logicGenerator,
  loopsGenerator,
  developerGenerator,
} from './Generators/generators';
import { toolboxCustomBasic } from './Toolbox/toolboxCustomBasic';
import { themeForCustomBasic } from './Theme/themeForCustomBasic';
import { saveWorkspace, loadWorkspace } from './Serialization/Serialization';

// custom component
// import RosConnector from "./Robot/RosConnector";
import WsConnector from './Robot/wsConnector';

// external component
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/xcode.css';
import Interpreter from 'js-interpreter/lib/js-interpreter';

Blockly.setLocale(locale);
hljs.registerLanguage('javascript', javascript);

const WHEEL_ANGULAR_SPEED_SLOW_RAD = 0.1; // 0.1 rad/s -> 5.73 dps
const WHEEL_ANGULAR_SPEED_NORMAL_RAD = 0.17; // 0.17 rad/s -> 9.74 dps
const WHEEL_ANGULAR_SPEED_FAST_RAD = 0.26; // 0.26 rad/s -> 14.90 dps
const WHEEL_ANGULAR_SPEED_FASTEST_RAD = 0.34; // 0.34 rad/s -> 19.48 dps
const WHEEL_LINEAR_SPEED_SLOW = 0.1; // 0.1 m/s
const WHEEL_LINEAR_SPEED_NORMAL = 0.3; // 0.3 m/s
const WHEEL_LINEAR_SPEED_FAST = 0.7; // 0.7 m/s
const WHEEL_LINEAR_SPEED_FASTEST = 1.0; // 1.0 m/s

const HEADSET_SPEED_FASTEST = 240; // 240dps
const HEADSET_SPEED_DEFAULT = 60; // 60dps
const HIP_SPEED_FAST = 20; // 20dps
const HIP_SPEED_NORMAL = 13; // 13dps
const HIP_SPEED_SLOW = 5; // 5dps
const BODY_SPEED_NORMAL = 1; // body 각도 1도 당 hip 각도 약 5~10도 정도 변화. Hip speed 5~10dps
// const HIP_ANGLE_MAX = 22;

const START_BLOCK_TYPES = new Set(['c_program_start', 'bt_program_start']);

function isStartBlockType(type) {
  return START_BLOCK_TYPES.has(type);
}

function App() {
  const blocklyDiv = useRef();
  const blocklyArea = useRef();
  const workspace = useRef();
  const element = useRef(null);
  const robotRef = useRef(null);
  const myInterpreter = useRef(null);
  const runnerPid = useRef(0);
  const intervalPid = useRef(0);
  // let prevTime = useRef(0);
  const prevBlock = useRef(null);

  const [robotIP, setRobotIP] = useState('');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [viewCode, setViewCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runButtonMsg, setRunButtonMsg] = useState('Run Code');
  const [openSaveWSSuccess, setOpenSaveWSSuccess] = useState(false);
  // const [isHighlight, setIsHighlight] = useState(false);

  const { state } = useLocation();

  // for reactive workspace dimension
  const onresize = function (e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    // console.log('blocklyArea.current:', blocklyArea.current);
    if (blocklyArea.current) {
      element.current = blocklyArea.current;
      let x = 0;
      let y = 0;
      do {
        x += element.current.offsetLeft;
        y += element.current.offsetTop;
        element.current = element.current.offsetParent;
      } while (element.current);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.current.style.left = x + 'px';
      blocklyDiv.current.style.top = y + 'px';
      blocklyDiv.current.style.width = blocklyArea.current.offsetWidth + 'px';
      blocklyDiv.current.style.height = blocklyArea.current.offsetHeight + 'px';
      // console.log('onresize called. width & height:', blocklyDiv.current.style.width, blocklyDiv.current.style.height);
      Blockly.svgResize(workspace.current);
    }
  };

  const updateCode = useCallback(() => {
    // blocks that aren't attached to the start block will be disabled
    const blocks = workspace.current.getAllBlocks(false);
    blocks.forEach((block) => {
      if (!isStartBlockType(block.getRootBlock().type)) {
        block.setEnabled(false);
        block.setWarningText('Need to be attached to the start block tree.');
      } else {
        block.setEnabled(true);
        block.setWarningText('');
        // console.log('block:', block.type);
      }
    });
    // javascriptGenerator.addReservedWords('code');
    // javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    javascriptGenerator.STATEMENT_PREFIX = '';
    // javascriptGenerator.addReservedWords('highlightBlock');
    const code = javascriptGenerator.workspaceToCode(workspace.current);
    setGeneratedCode(code);
  }, [workspace]);

  // set workspace options and inject to blocklyDiv
  useEffect(() => {
    if (workspace.current) return;

    const wsOptions = {
      renderer: 'zelos',
      theme: themeForCustomBasic,
      toolbox: toolboxCustomBasic,
      collapse: true,
      comments: true,
      tooltips: true,
      disable: true,
      maxBlocks: Infinity,
      trashcan: true,
      horizontalLayout: false,
      toolboxPosition: 'start',
      css: true,
      // media : 'https://blockly-demo.appspot.com/static/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      oneBasedIndex: true,
      grid: {
        spacing: 20,
        length: 1,
        colour: '#888',
        snap: false,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
    };
    workspace.current = Blockly.inject(blocklyDiv.current, wsOptions);

    const backpackOptions = {
      allowEmptyBackpackOpen: true,
      useFilledBackpackImage: true,
      skipSerializerRegistration: false,
      contextMenu: {
        emptyBackpack: true,
        removeFromBackpack: true,
        copyToBackpack: true,
        copyAllToBackpack: false,
        pasteAllToBackpack: false,
        disablePreconditionChecks: false,
      },
    };

    const backpack = new Backpack(workspace.current, backpackOptions);
    backpack.init();

    // add event listerer to fit the size of workspace
    window.addEventListener('resize', onresize, false);
    onresize();
    // workspace.current.scrollCenter();

    // put program start block to workspace and set deletable false.
    const width = blocklyDiv.current.style.width;
    const height = blocklyDiv.current.style.height;
    const posX = Number(width.slice(0, -2)) / 4;
    const posY = Number(height.slice(0, -2)) / 8;

    console.log('robot info:', state.robotName, state.robotIP);
    setRobotIP(state.robotIP);

    if ('savedWorkspace' in state) {
      console.log('state.savedWorkspace:', state.savedWorkspace);
      setWorkspaceName(state.savedWorkspace);
      loadWorkspace(workspace.current, state.savedWorkspace);
    } else {
      const startBlock = {
        blocks: {
          blocks: [
            {
              type: 'bt_program_start',
              x: posX,
              y: posY,
            },
          ],
        },
      };
      Blockly.serialization.workspaces.load(startBlock, workspace.current);
      const blocks = workspace.current.getAllBlocks(false);
      blocks[0].setDeletable(false);
      blocks[0].setMovable(false);
    }

    // To generate new code for blocks in the current workspace
    workspace.current.addChangeListener(updateCode);
    // workspace.current.registerButtonCallback("openCodeView", updateCode);
  }, [state, updateCode, workspace]);

  function highlightCode() {
    const nodes = document.querySelectorAll('pre code');
    nodes.forEach((node) => hljs.highlightElement(node));
  }

  useEffect(() => {
    if (generatedCode === '' || viewCode === false) return;
    const element = document.getElementsByClassName('javascript');
    if (element[0] && element[0].hasAttribute('data-highlighted')) {
      element[0].removeAttribute('data-highlighted');
    }
    highlightCode();
  }, [generatedCode, viewCode]);

  function initApi(interpreter, globalObject) {
    // Add an API function for ros topic blocks.
    const wrapperStartCamera = interpreter.createNativeFunction(function () {
      return robotRef.current.startCamera(true);
    });
    interpreter.setProperty(globalObject, 'startCamera', wrapperStartCamera);

    const wrapperStopCamera = interpreter.createNativeFunction(function () {
      return robotRef.current.startCamera(false);
    });
    interpreter.setProperty(globalObject, 'stopCamera', wrapperStopCamera);

    const wrapperStartPersonDetection = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startPersonDetection();
      },
    );
    interpreter.setProperty(
      globalObject,
      'startPersonDetection',
      wrapperStartPersonDetection,
    );

    const wrapperStartWakewordDetection = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startWakewordDetection(true);
      },
    );
    interpreter.setProperty(
      globalObject,
      'startWakewordDetection',
      wrapperStartWakewordDetection,
    );

    const wrapperStopWakewordDetection = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startWakewordDetection(false);
      },
    );
    interpreter.setProperty(
      globalObject,
      'stopWakewordDetection',
      wrapperStopWakewordDetection,
    );

    const wrapperStartPickupDetection = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startPickupDetection();
      },
    );
    interpreter.setProperty(
      globalObject,
      'startPickupDetection',
      wrapperStartPickupDetection,
    );

    const wrapperStartFalldownDetection = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startFallDownDetection();
      },
    );
    interpreter.setProperty(
      globalObject,
      'startFallDownDetection',
      wrapperStartFalldownDetection,
    );

    const wrapperStartGetHeadsetAngle = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startGetHeadsetAngle();
      },
    );
    interpreter.setProperty(
      globalObject,
      'startGetHeadsetAngle',
      wrapperStartGetHeadsetAngle,
    );

    const wrapperStartGetHipAngle = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startGetHipAngle();
      },
    );
    interpreter.setProperty(
      globalObject,
      'startGetHipAngle',
      wrapperStartGetHipAngle,
    );

    const wrapperStartGetBatteryInfo = interpreter.createNativeFunction(
      function () {
        return robotRef.current.startGetBatteryInfo();
      },
    );
    interpreter.setProperty(
      globalObject,
      'startGetBatteryInfo',
      wrapperStartGetBatteryInfo,
    );

    const wrapperUpdateValueConditional = interpreter.createAsyncFunction(
      function (timeout, elementId, callback) {
        intervalPid.current = setInterval(function () {
          const status = document.getElementById(elementId).value;
          if (status !== 'standby') {
            clearInterval(intervalPid.current);
            callback();
          }
        }, timeout);
      },
    );
    interpreter.setProperty(
      globalObject,
      'updateValueConditional',
      wrapperUpdateValueConditional,
    );

    const wrapperRotateHeadset = interpreter.createNativeFunction(
      function (targetAngle, seconds) {
        // console.log('headset motion start.');
        document.getElementById('isHeadsetMotionFinished').value = 'false';

        let currentAngle = Number(
          document.getElementById('angleOfHeadset').value,
        );
        currentAngle = Math.round(currentAngle / 10);
        const diffAngle = Math.abs(currentAngle - targetAngle);
        let targetSpeed;
        if (seconds) {
          const degreesPerSecond = diffAngle / seconds;
          targetSpeed = Math.round(degreesPerSecond);
          if (targetSpeed > HEADSET_SPEED_FASTEST) {
            targetSpeed = HEADSET_SPEED_FASTEST;
          } else if (targetSpeed < 1) {
            targetSpeed = 1;
          }
        } else {
          targetSpeed = HEADSET_SPEED_DEFAULT;
        }
        robotRef.current.rotateHeadset(targetAngle, targetSpeed);
      },
    );
    interpreter.setProperty(
      globalObject,
      'rotateHeadset',
      wrapperRotateHeadset,
    );

    const wrapperHeadsetMotionFinishChecker = interpreter.createAsyncFunction(
      function (callback) {
        intervalPid.current = setInterval(function () {
          const isFinished = document.getElementById(
            'isHeadsetMotionFinished',
          ).value;
          if (isFinished === 'true') {
            document.getElementById('isHeadsetMotionFinished').value = 'false';
            console.log('headset motion finished.');
            clearInterval(intervalPid.current);
            callback();
          }
        }, 1000);
      },
    );
    interpreter.setProperty(
      globalObject,
      'headsetMotionFinishChecker',
      wrapperHeadsetMotionFinishChecker,
    );

    const wrapperMoveOneHip = interpreter.createNativeFunction(
      function (selectedHip, targetAngle, selectedSpeed) {
        // console.log('hip motion start.');
        document.getElementById('isHipMotionFinished').value = 'false';

        let targetSpeed;
        switch (selectedSpeed) {
          case 'slow':
            targetSpeed = HIP_SPEED_SLOW;
            break;
          case 'normal':
            targetSpeed = HIP_SPEED_NORMAL;
            break;
          case 'fast':
            targetSpeed = HIP_SPEED_FAST;
            break;
          default:
            targetSpeed = HIP_SPEED_NORMAL;
        }
        robotRef.current.moveOneHip(selectedHip, targetAngle, targetSpeed);
      },
    );
    interpreter.setProperty(globalObject, 'moveOneHip', wrapperMoveOneHip);

    const wrapperMoveBothHip = interpreter.createNativeFunction(
      function (targetAngleL, targetAngleR, selectedSpeed) {
        // console.log('hip motion start.');
        document.getElementById('isHipMotionFinished').value = 'false';

        let targetSpeed;
        switch (selectedSpeed) {
          case 'slow':
            targetSpeed = HIP_SPEED_SLOW;
            break;
          case 'normal':
            targetSpeed = HIP_SPEED_NORMAL;
            break;
          case 'fast':
            targetSpeed = HIP_SPEED_FAST;
            break;
          default:
            targetSpeed = HIP_SPEED_NORMAL;
        }
        robotRef.current.moveBothHip(targetAngleL, targetAngleR, targetSpeed);
      },
    );
    interpreter.setProperty(globalObject, 'moveBothHip', wrapperMoveBothHip);

    const wrapperTiltBody = interpreter.createNativeFunction(
      function (direction, targetAngle, selectedSpeed) {
        // console.log('hip motion start.');
        document.getElementById('isHipMotionFinished').value = 'false';

        let targetSpeed;
        // switch(selectedSpeed){
        //   case 'slow':
        //     targetSpeed = HIP_SPEED_SLOW;
        //     break;
        //   case 'normal':
        //     targetSpeed = HIP_SPEED_NORMAL;
        //     break;
        //   case 'fast':
        //     targetSpeed = HIP_SPEED_FAST;
        //     break;
        //   default:
        //     targetSpeed = HIP_SPEED_NORMAL;
        // }
        targetSpeed = BODY_SPEED_NORMAL;
        robotRef.current.tiltBody(direction, targetAngle, targetSpeed);
      },
    );
    interpreter.setProperty(globalObject, 'tiltBody', wrapperTiltBody);

    const wrapperHipMotionFinishChecker = interpreter.createAsyncFunction(
      function (callback) {
        intervalPid.current = setInterval(function () {
          const isFinished = document.getElementById(
            'isHipMotionFinished',
          ).value;
          if (isFinished === 'true') {
            document.getElementById('isHipMotionFinished').value = 'false';
            console.log('hip motion finished.');
            clearInterval(intervalPid.current);
            callback();
          }
        }, 1000);
      },
    );
    interpreter.setProperty(
      globalObject,
      'hipMotionFinishChecker',
      wrapperHipMotionFinishChecker,
    );

    const wrapperMoveHeadsetAndHip = interpreter.createNativeFunction(
      function (args) {
        // console.log('hip motion start.');
        document.getElementById('isHeadsetMotionFinished').value = 'false';
        document.getElementById('isHipMotionFinished').value = 'false';

        const options = args.properties;
        // calculate headset speed and timeout
        const targetAngleOfHeadset = options.targetAngleOfHeadset;
        const seconds = options.seconds ? options.seconds : undefined;
        let currentHeadsetAngle = Number(
          document.getElementById('angleOfHeadset').value,
        );
        currentHeadsetAngle = Math.round(currentHeadsetAngle / 10);
        const diffAngle = Math.abs(currentHeadsetAngle - targetAngleOfHeadset);
        let targetHeadsetSpeed;
        if (seconds) {
          const degreesPerSecond = diffAngle / seconds;
          targetHeadsetSpeed = Math.round(degreesPerSecond * 0.4); // report rate 40ms * 10(because 1000 level means 100.0 deg)
          if (targetHeadsetSpeed > HEADSET_SPEED_FASTEST) {
            targetHeadsetSpeed = HEADSET_SPEED_FASTEST;
          } else if (targetHeadsetSpeed < 1) {
            targetHeadsetSpeed = 1;
          }
        } else {
          targetHeadsetSpeed = HEADSET_SPEED_DEFAULT;
        }
        robotRef.current.rotateHeadset(
          targetAngleOfHeadset,
          targetHeadsetSpeed,
        );
        // calculate hip speed and timeout
        const targetAngleOfHipL = options.targetAngleOfHipL;
        const targetAngleOfHipR = options.targetAngleOfHipR;
        const selectedSpeed = options.selectedSpeed
          ? options.selectedSpeed
          : undefined;
        let targetHipSpeed;
        switch (selectedSpeed) {
          case 'slow':
            targetHipSpeed = HIP_SPEED_SLOW;
            break;
          case 'normal':
            targetHipSpeed = HIP_SPEED_NORMAL;
            break;
          case 'fast':
            targetHipSpeed = HIP_SPEED_FAST;
            break;
          default:
            targetHipSpeed = HIP_SPEED_NORMAL;
        }
        robotRef.current.moveBothHip(
          targetAngleOfHipL,
          targetAngleOfHipR,
          targetHipSpeed,
        );
      },
    );
    interpreter.setProperty(
      globalObject,
      'moveHeadsetAndHip',
      wrapperMoveHeadsetAndHip,
    );

    const wrapperHeadsetHipMotionFinishChecker =
      interpreter.createAsyncFunction(function (callback) {
        intervalPid.current = setInterval(function () {
          const isHeadsetFinished = document.getElementById(
            'isHeadsetMotionFinished',
          ).value;
          const isHipFinished = document.getElementById(
            'isHipMotionFinished',
          ).value;
          if (isHeadsetFinished === 'true' && isHipFinished === 'true') {
            document.getElementById('isHeadsetMotionFinished').value = 'false';
            document.getElementById('isHipMotionFinished').value = 'false';
            console.log('headset and hip motion finished.');
            clearInterval(intervalPid.current);
            callback();
          }
        }, 1000);
      });
    interpreter.setProperty(
      globalObject,
      'headsetHipMotionFinishChecker',
      wrapperHeadsetHipMotionFinishChecker,
    );

    const wrapperSpinInPlace = interpreter.createNativeFunction(
      function (direction, speed) {
        return robotRef.current.spinInPlace(direction, speed);
      },
    );
    interpreter.setProperty(globalObject, 'spinInPlace', wrapperSpinInPlace);

    const wrapperSpinDegrees = interpreter.createNativeFunction(
      function (direction, angle, selectedSpeed) {
        // console.log('hip motion start.');
        document.getElementById('isWheelMoveFinished').value = 'false';

        let targetSpeed;
        switch (selectedSpeed) {
          case 'slow':
            targetSpeed = WHEEL_ANGULAR_SPEED_SLOW_RAD;
            break;
          case 'normal':
            targetSpeed = WHEEL_ANGULAR_SPEED_NORMAL_RAD;
            break;
          case 'fast':
            targetSpeed = WHEEL_ANGULAR_SPEED_FAST_RAD;
            break;
          case 'fastest':
            targetSpeed = WHEEL_ANGULAR_SPEED_FASTEST_RAD;
            break;
          default:
            targetSpeed = WHEEL_ANGULAR_SPEED_FAST_RAD;
        }
        robotRef.current.spinDegrees(direction, angle, targetSpeed);
      },
    );
    interpreter.setProperty(globalObject, 'spinDegrees', wrapperSpinDegrees);

    const wrapperMoveBackOrForth = interpreter.createNativeFunction(
      function (direction, speed) {
        return robotRef.current.moveBackOrForth(direction, speed);
      },
    );
    interpreter.setProperty(
      globalObject,
      'moveBackOrForth',
      wrapperMoveBackOrForth,
    );

    const wrapperMoveDistance = interpreter.createNativeFunction(
      function (direction, distance, speed) {
        // console.log('hip motion start.');
        document.getElementById('isWheelMoveFinished').value = 'false';

        let targetSpeed;
        switch (speed) {
          case 0:
            targetSpeed = WHEEL_LINEAR_SPEED_SLOW;
            break;
          case 1:
            targetSpeed = WHEEL_LINEAR_SPEED_NORMAL;
            break;
          case 2:
            targetSpeed = WHEEL_LINEAR_SPEED_FAST;
            break;
          case 3:
            targetSpeed = WHEEL_LINEAR_SPEED_FASTEST;
            break;
          default:
            targetSpeed = WHEEL_LINEAR_SPEED_NORMAL;
        }
        robotRef.current.moveDistance(direction, distance, targetSpeed);
      },
    );
    interpreter.setProperty(globalObject, 'moveDistance', wrapperMoveDistance);

    const wrapperWheelMoveFinishChecker = interpreter.createAsyncFunction(
      function (callback) {
        intervalPid.current = setInterval(function () {
          const isFinished = document.getElementById(
            'isWheelMoveFinished',
          ).value;

          if (isFinished === 'true') {
            document.getElementById('isWheelMoveFinished').value = 'false';
            console.log('wheel move finished.');
            clearInterval(intervalPid.current);
            callback();
          }
        }, 1000);
      },
    );
    interpreter.setProperty(
      globalObject,
      'wheelMoveFinishChecker',
      wrapperWheelMoveFinishChecker,
    );

    const wrapperMoveAlongTurningRadius = interpreter.createNativeFunction(
      function (direction, radius) {
        return robotRef.current.moveAlongTurningRadius(direction, radius);
      },
    );
    interpreter.setProperty(
      globalObject,
      'moveAlongTurningRadius',
      wrapperMoveAlongTurningRadius,
    );

    const wrapperStopHeadset = interpreter.createNativeFunction(function () {
      // console.log(`stopHeadset()`);
      return robotRef.current.stopHeadset();
    });
    interpreter.setProperty(globalObject, 'stopHeadset', wrapperStopHeadset);

    const wrapperStopHip = interpreter.createNativeFunction(function () {
      // console.log(`stopHip()`);
      return robotRef.current.stopHip();
    });
    interpreter.setProperty(globalObject, 'stopHip', wrapperStopHip);

    const wrapperStopWheel = interpreter.createNativeFunction(function () {
      // console.log(`stopWheel()`);
      return robotRef.current.stopWheel();
    });
    interpreter.setProperty(globalObject, 'stopWheel', wrapperStopWheel);

    const wrapperStopAllMovement = interpreter.createNativeFunction(
      function () {
        return robotRef.current.stopAllMovement();
      },
    );
    interpreter.setProperty(
      globalObject,
      'stopAllMovement',
      wrapperStopAllMovement,
    );

    const wrapperStartMotion = interpreter.createNativeFunction(
      function (motionId) {
        console.log('motion start.');
        document.getElementById('isMotionFinished').value = 'false';
        return robotRef.current.startMotion(motionId);
      },
    );
    interpreter.setProperty(globalObject, 'startMotion', wrapperStartMotion);

    const wrapperMotionFinishChecker = interpreter.createAsyncFunction(
      function (callback) {
        intervalPid.current = setInterval(function () {
          const isMotionFinished =
            document.getElementById('isMotionFinished').value;
          if (isMotionFinished === 'true') {
            document.getElementById('isMotionFinished').value = 'false';
            console.log('motion finished.');
            clearInterval(intervalPid.current);
            callback();
          }
        }, 1000);
      },
    );
    interpreter.setProperty(
      globalObject,
      'motionFinishChecker',
      wrapperMotionFinishChecker,
    );

    const wrapperStopMotion = interpreter.createNativeFunction(function () {
      return robotRef.current.stopMotion();
    });
    interpreter.setProperty(globalObject, 'stopMotion', wrapperStopMotion);

    const wrapperInitPose = interpreter.createNativeFunction(function () {
      return robotRef.current.initPose();
    });
    interpreter.setProperty(globalObject, 'initPose', wrapperInitPose);

    const wrapperStartFacialExpression = interpreter.createNativeFunction(
      function (facialExpression) {
        return robotRef.current.startFacialExpression(facialExpression);
      },
    );
    interpreter.setProperty(
      globalObject,
      'startFacialExpression',
      wrapperStartFacialExpression,
    );

    const wrapperPlaySound = interpreter.createNativeFunction(function (sound) {
      console.log('play sound.');
      document.getElementById('isSoundFinished').value = 'false';
      return robotRef.current.playSound(sound);
    });
    interpreter.setProperty(globalObject, 'playSound', wrapperPlaySound);

    const wrapperPlayTTS = interpreter.createNativeFunction(function (text) {
      // console.log('play TTS.');
      document.getElementById('isSoundFinished').value = 'false';
      return robotRef.current.playTTS(text);
    });
    interpreter.setProperty(globalObject, 'playTTS', wrapperPlayTTS);

    const wrapperPlaySoundFinishChecker = interpreter.createAsyncFunction(
      function (callback) {
        intervalPid.current = setInterval(function () {
          const isFinished = document.getElementById('isSoundFinished').value;
          if (isFinished === 'true') {
            document.getElementById('isSoundFinished').value = 'false';
            console.log('playSound finished.');
            clearInterval(intervalPid.current);
            callback();
          }
        }, 1000);
      },
    );
    interpreter.setProperty(
      globalObject,
      'soundFinishChecker',
      wrapperPlaySoundFinishChecker,
    );

    const wrapperPlayFaceExpression = interpreter.createNativeFunction(
      function (typeNum) {
        return robotRef.current.playFacialExpression(typeNum);
      },
    );
    interpreter.setProperty(
      globalObject,
      'playFacialExpression',
      wrapperPlayFaceExpression,
    );

    // Argument passing between browser and js-interpreter occurs during program execution.
    // Therefore, to retrieve the latest updated value from the browser to the interpreter,
    // the program must be rerun, and an async function wrapped as createAsyncFunction wrapper
    // is used for this purpose.
    const wrapperUpdateRecentValue = interpreter.createAsyncFunction(
      function (timeout, callback) {
        intervalPid.current = setInterval(function () {
          console.log('update recent value');
          clearInterval(intervalPid.current);
          callback(function () {
            return true;
          });
        }, timeout);
      },
    );
    interpreter.setProperty(
      globalObject,
      'updateRecentValue',
      wrapperUpdateRecentValue,
    );

    const wrapperVolumeControl = interpreter.createNativeFunction(
      function (vol) {
        return robotRef.current.volumeControl(vol);
      },
    );
    interpreter.setProperty(
      globalObject,
      'volumeControl',
      wrapperVolumeControl,
    );

    const wrapperSendMotorInput = interpreter.createNativeFunction(
      function (
        wheelLinearSpeed,
        wheelAngularSpeed,
        hipLeft,
        hipRight,
        hipSpeed,
        headset,
        headsetSpeed,
      ) {
        return robotRef.current.sendMotorInput(
          wheelLinearSpeed,
          wheelAngularSpeed,
          hipLeft,
          hipRight,
          hipSpeed,
          headset,
          headsetSpeed,
        );
      },
    );
    interpreter.setProperty(
      globalObject,
      'sendMotorInput',
      wrapperSendMotorInput,
    );

    // Add an API function for highlighting blocks.
    const wrapperHighlight = interpreter.createNativeFunction(function (id) {
      id = String(id || '');
      return highlightBlock(id);
    });
    interpreter.setProperty(globalObject, 'highlightBlock', wrapperHighlight);

    // Add an API for the wait block.  See ./Generators/logic.js
    perceptionGenerator.initInterpreterGetAngleOfHeadset(
      interpreter,
      globalObject,
    );
    perceptionGenerator.initInterpreterGetAngleOfHip(interpreter, globalObject);
    perceptionGenerator.initInterpreterGetSpeedOfWheel(
      interpreter,
      globalObject,
    );
    perceptionGenerator.initInterpreterGetFalldownStatus(
      interpreter,
      globalObject,
    );
    perceptionGenerator.initInterpreterGetPickupStatus(
      interpreter,
      globalObject,
    );
    perceptionGenerator.initInterpreterGetWakeWordDetectionStatus(
      interpreter,
      globalObject,
    );
    perceptionGenerator.initInterpreterGetPersonDetectionStatus(
      interpreter,
      globalObject,
    );
    logicGenerator.initInterpreterWaitForSeconds(interpreter, globalObject);
    loopsGenerator.initInterpreterSetLoopTrapCounter(interpreter, globalObject);
    loopsGenerator.initInterpreterCheckLoopTrapCounter(
      interpreter,
      globalObject,
    );
    loopsGenerator.initInterpreterPrintLoopTrapCounter(
      interpreter,
      globalObject,
    );
    developerGenerator.initInterpreterGetBatteryLevel(
      interpreter,
      globalObject,
    );
    developerGenerator.initInterpreterAlert(interpreter, globalObject);

    {
      // console 객체 생성
      const consoleObj = interpreter.createObject(interpreter.OBJECT);
      interpreter.setProperty(globalObject, 'console', consoleObj);

      // console.log 함수 주입
      const logWrapper = function (...args) {
        // 실제 브라우저 콘솔로 전달
        console.log(...args.map((a) => (a && a.toString ? a.toString() : a)));
      };
      interpreter.setProperty(
        consoleObj,
        'log',
        interpreter.createNativeFunction(logWrapper),
      );
    }
  }

  function highlightBlock(id) {
    const loopBlocks = [
      'c_loop_repeat_infinitely',
      'c_loop_repeat_until',
      'c_loop_repeat_while',
      'controls_repeat_ext',
    ];

    // let currTime = new Date();
    // let timeDiff = currTime - prevTime.current;
    // const minHLTime = 200;
    const thisBlock = workspace.current.getBlockById(id);
    // const prevBlock = thisBlock.getPreviousBlock();
    // console.log('this block:', thisBlock.type, thisBlock.id);
    // if(prevBlock.current) console.log('prev block:', prevBlock.current.type, prevBlock.current.id);

    // unhighlight blocks in loop block when this block is loop block.
    if (loopBlocks.includes(thisBlock.type)) {
      // this block is loop block
      const childBlocks = thisBlock.getDescendants();
      // console.log('children block list is:', childBlocks);
      // extract inner blocks of loop block
      const filteredChildBlocks = childBlocks.filter((value, index, arr) => {
        const child = childBlocks[index];
        const surroundParent = child.getSurroundParent();
        return (
          surroundParent &&
          surroundParent.id === thisBlock.id &&
          child.previousConnection
        );
      });
      // console.log('inner blocks:', filteredChildBlocks);

      // highlight inner blocks of loop block.
      filteredChildBlocks.forEach((child, idx) => {
        workspace.current.highlightBlock(child.id, true);
      });
    }

    // logic for checking 1st block after loop.
    const surroundParent = thisBlock.getSurroundParent();
    const is1stBlockAfterLoop =
      prevBlock.current &&
      loopBlocks.includes(prevBlock.current.type) &&
      (!surroundParent || surroundParent.id !== prevBlock.current.id);
    // console.log('is1stBlockAfterLoop:', thisBlock.type, thisBlock.id, is1stBlockAfterLoop);
    // unhighlight blocks in loop block when this block is 1st block after the loop block
    if (is1stBlockAfterLoop) {
      // this block is loop block
      const childBlocks = prevBlock.current.getDescendants();
      // extract inner blocks of loop block
      const filteredChildBlocks = childBlocks.filter((value, index, arr) => {
        const child = childBlocks[index];
        const surroundParent = child.getSurroundParent();
        return (
          surroundParent &&
          surroundParent.id === prevBlock.current.id &&
          child.previousConnection
        );
      });
      // console.log('inner blocks:', filteredChildBlocks);

      // unhighlight inner blocks of loop block.
      filteredChildBlocks.forEach((child, idx) => {
        workspace.current.highlightBlock(child.id, false);
      });
    }

    // remove select ui for previous block
    if (prevBlock.current !== null) {
      if (!isStartBlockType(prevBlock.current.type)) {
        prevBlock.current.removeSelect();
        // prevBlock.current.setStyle('completed_blocks');
        // workspace.current.highlightBlock(prevBlock.current.id, false);
      }
    }

    // highlight current block
    if (!isStartBlockType(thisBlock.type)) {
      workspace.current.highlightBlock(id, false);
      // console.log('highlight:', thisBlock.type, now);
      thisBlock.addSelect();
      // thisBlock.select();
    }
    prevBlock.current = thisBlock;
    // console.log('selected:', Blockly.getSelected());
  }

  // to apply step ui
  function resetStepUi(clearOutput) {
    // clearTimeout(runnerPid.current);
    workspace.current.highlightBlock(null);
    const blocks = workspace.current.getAllBlocks(false);
    // console.log('getAllBlocks:', blocks);
    if (clearOutput) {
      blocks.forEach((block) => {
        // console.log('highlight block:', block.type, block.id);
        if (!isStartBlockType(block.type))
          workspace.current.highlightBlock(block.id, true);
      });
      console.log('Program output:\n=================');
    } else {
      blocks.forEach((block) => {
        block.removeSelect();
      });
    }
  }

  useEffect(() => {
    isRunning ? setRunButtonMsg('Stop') : setRunButtonMsg('Run Code');
  }, [isRunning]);

  function runGeneratedCode() {
    myInterpreter.current = new Interpreter(generatedCode, initApi);
    console.log('<< myInterpreter run >>');
    function runner() {
      if (myInterpreter.current) {
        const hasMore = myInterpreter.current.run();
        if (hasMore) {
          console.log('<< re run runner >>');
          // Execution is currently blocked by some async call.
          // Try again later.
          runnerPid.current = setTimeout(runner, 500);
        } else {
          // Program is complete.
          console.log('<< Program complete >>');
          setIsRunning(false);
          clearTimeout(runnerPid.current);
          clearInterval(intervalPid.current);
          resetStepUi(false);
          // setTimeout(function(){
          //   resetStepUi(false);
          // }, 500)
          // const runButton = document.getElementById("runCodeButton");
          // runButton.disabled = false;
          myInterpreter.current = null;
          // javascriptGenerator.INFINITE_LOOP_TRAP = null;
        }
      }
    }
    runner();
  }

  function runCode(stopRobot) {
    if (!stopRobot && !myInterpreter.current) {
      // First statement of this code.
      // Clear the program output.
      resetStepUi(true);
      setIsRunning(true);
      clearTimeout(runnerPid.current);
      clearInterval(intervalPid.current);

      // disable runCode button
      // const runButton = document.getElementById("runCodeButton");
      // runButton.disabled = true;

      // In a timeout to allow the outputArea.value to reset first.
      // setTimeout(runGeneratedCode(), 1);
      runGeneratedCode();

      return;
    } else {
      console.log('<< Force stop program >>');
      resetStepUi(false);
      setIsRunning(false);
      clearTimeout(runnerPid.current);
      clearInterval(intervalPid.current);
      myInterpreter.current = null;
    }
  }

  const stopRobotMovement = () => {
    let timeout = 500;
    if (isRunning) {
      runCode(true);
      timeout = 2000;
    }
    robotRef.current.stopAllMovement();
    setTimeout(function () {
      robotRef.current.initPose();
    }, timeout);
  };

  const handleClickSave = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseSave = () => {
    setOpenSaveDialog(false);
  };

  const handleCloseSaveWSSuccess = () => {
    setOpenSaveWSSuccess(false);
  };

  return (
    <>
      <div ref={blocklyArea} id="blocklyArea" />
      <div ref={blocklyDiv} id="blocklyDiv" style={{ position: 'absolute' }} />

      <Stack
        spacing={2}
        direction="row"
        sx={{ top: '40px', right: '120px', position: 'absolute' }}
      >
        <Button
          variant="outlined"
          onClick={handleClickSave}
          sx={{
            width: '100px',
            height: '30px',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={() => setViewCode(!viewCode)}
          sx={{
            width: '100px',
            height: '30px',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          Code view
        </Button>
        <Button
          variant="outlined"
          onClick={() => runCode(false)}
          sx={{
            width: '100px',
            height: '30px',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          {runButtonMsg}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            stopRobotMovement();
          }}
          sx={{
            width: '100px',
            height: '30px',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          Stop All
        </Button>
      </Stack>

      <Dialog
        open={openSaveDialog}
        onClose={handleCloseSave}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            saveWorkspace(workspace.current, workspaceName);
            console.log('save new workspace:', workspaceName);
            setOpenSaveWSSuccess(true);
            handleCloseSave();
          },
        }}
      >
        <DialogTitle>Save Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter the name of block code
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            value={workspaceName}
            onChange={(event) => {
              setWorkspaceName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSave}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSaveWSSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSaveWSSuccess}
        message="Workspace Saved Successfully"
      />

      {viewCode && generatedCode !== '' && (
        <div id="codeDiv">
          <pre>
            <code className="javascript">{generatedCode}</code>
          </pre>
        </div>
      )}
      {robotIP && (
        <WsConnector
          name="q9"
          ip={robotIP}
          onUpdateAngleOfHeadset={(angle) => {
            // console.log('onUpdateAngleOfHeadset:', angle);
            document.getElementById('angleOfHeadset').value = angle;
          }}
          onUpdateAngleOfHip={(left, right) => {
            // console.log('onUpdateAngleOfHip:', left, right);
            document.getElementById('angleOfLeftHip').value = left;
            document.getElementById('angleOfRightHip').value = right;
          }}
          onUpdateSpeedOfWheel={(left, right) => {
            // console.log('onUpdateSpeedOfWheel:', left, right);
            document.getElementById('speedOfLeftWheel').value = left;
            document.getElementById('speedOfRightWheel').value = right;
          }}
          onUpdateFalldownStatus={(status) => {
            // console.log('onUpdateFalldownStatus:', status);
            if (status) {
              document.getElementById('isFalldown').value = 'true';
            } else {
              document.getElementById('isFalldown').value = 'false';
            }
          }}
          onUpdatePickupStatus={(status) => {
            // console.log('onUpdatePickupStatus:', status);
            status === true
              ? (document.getElementById('isPickUp').value = 'true')
              : (document.getElementById('isPickUp').value = 'false');
          }}
          onUpdateWakeWordDetectionStatus={(status) => {
            // console.log('onUpdateWakeWordDetectionStatus:', status);
            document.getElementById('isWakeWordDetected').value = 'true';
          }}
          onPersonDetection={(status) => {
            // console.log('onPersonDetection:', status);
            document.getElementById('isPersonDetected').value = status;
          }}
          onHeadsetMotionFinished={() => {
            // console.log('onHeadsetMotionFinished');
            document.getElementById('isHeadsetMotionFinished').value = 'true';
          }}
          onHipMotionFinished={() => {
            // console.log('onHipMotionFinished');
            document.getElementById('isHipMotionFinished').value = 'true';
          }}
          onWheelMoveFinished={() => {
            // console.log('onWheelMoveFinished');
            document.getElementById('isWheelMoveFinished').value = 'true';
          }}
          onSoundFinished={() => {
            // console.log('onSoundFinished');
            document.getElementById('isSoundFinished').value = 'true';
          }}
          onMotionFinished={() => {
            // console.log('onMotionFinished');
            document.getElementById('isMotionFinished').value = 'true';
          }}
          onUpdateBatteryLevel={(level) => {
            document.getElementById('batteryLevel').value = level;
          }}
          ref={(element) => (robotRef.current = element)}
        />
      )}
      <input id="angleOfHeadset" type="hidden" value="standby"></input>
      <input id="angleOfLeftHip" type="hidden" value="standby"></input>
      <input id="angleOfRightHip" type="hidden" value="standby"></input>
      <input id="speedOfLeftWheel" type="hidden" value="standby"></input>
      <input id="speedOfRightWheel" type="hidden" value="standby"></input>
      <input id="isFalldown" type="hidden" value="standby"></input>
      <input id="isPickUp" type="hidden" value="standby"></input>
      <input id="isPersonDetected" type="hidden" value="standby"></input>
      <input id="batteryLevel" type="hidden" value="standby"></input>
      <input id="isWakeWordDetected" type="hidden" value="false"></input>
      <input id="isHeadsetMotionFinished" type="hidden" value="false"></input>
      <input id="isHipMotionFinished" type="hidden" value="false"></input>
      <input id="isWheelMoveFinished" type="hidden" value="false"></input>
      <input id="isSoundFinished" type="hidden" value="false"></input>
      <input id="isMotionFinished" type="hidden" value="false"></input>
    </>
  );
}

export default App;
