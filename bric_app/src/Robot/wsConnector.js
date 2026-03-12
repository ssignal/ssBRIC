import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from "react";

// import ROSLIB from "roslib";
import useWebSocket, { ReadyState } from "react-use-websocket";
// import { rosTopics } from "./rosTopics";
// import { rosServices } from "./rosTopics";
// import { rollToHip } from "./robotJoint";

const HIP_ANGLE_NEUTRAL_POSITION = 100;
const HEADSET_ANGLE_NEUTRAL_POSITION = 1800;
const WHEEL_LINEAR_SPEED_SLOW = 0.1;      // 0.1 m/s
const WHEEL_LINEAR_SPEED_NORMAL = 0.3;      // 0.3 m/s
const WHEEL_LINEAR_SPEED_FAST = 0.7;      // 0.7 m/s
const WHEEL_LINEAR_SPEED_FASTEST = 1.0;   // 1.0 m/s
const WHEEL_ANGULAR_SPEED_SLOW_RAD = 0.1  // 0.1 rad/s -> 5.73 dps
const WHEEL_ANGULAR_SPEED_NORMAL_RAD = 0.17   // 0.17 rad/s -> 9.74 dps
const WHEEL_ANGULAR_SPEED_FAST_RAD = 0.26   // 0.26 rad/s -> 14.90 dps
const WHEEL_ANGULAR_SPEED_FASTEST_RAD = 0.34   // 0.34 rad/s -> 19.48 dps
const HEADSET_SPEED_DEFAULT = 60;
const HIP_SPEED_NORMAL = 13;
const INFINITE_ANGLE = -1;
const INFINITE_DISTANCE = -1;

const WsConnector = forwardRef(({
  name,
  ip,
  onUpdateAngleOfHeadset,
  onUpdateAngleOfHip,
  onUpdateSpeedOfWheel,
  onUpdateFalldownStatus,
  onUpdatePickupStatus,
  onUpdateWakeWordDetectionStatus,
  onPersonDetection,
  onHeadsetMotionFinished,
  onHipMotionFinished,
  onWheelMoveFinished,
  onSoundFinished,
  onMotionFinished,
  onUpdateBatteryLevel
}, ref) => {
  const currentAngleOfLeftHip = useRef(HIP_ANGLE_NEUTRAL_POSITION);
  const currentAngleOfRightHip = useRef(HIP_ANGLE_NEUTRAL_POSITION);
  const isFalldownRef = useRef(false);

  const WS_URL = 'wss://' + ip + ':8008';

  const { sendJsonMessage, lastJsonMessage, readyState, } = useWebSocket(WS_URL, {
    // queryParams: {name},
    // share: true,
    // shouldReconnect: () => false,
    onOpen: () => console.log('websocket session opened'),
    onError: (e) => console.log('websocket error:', e)
  })

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const stopHeadset = useCallback(() => {
    let msg = {
      msgId: 'stop_headset',
      data: 0
    }
    console.log('stopHeadset');
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const stopHip = useCallback(() => {
    let msg = {
      msgId: 'stop_hip',
      data: 0
    }
    console.log('stopHip');
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const stopWheel = useCallback(() => {
    let msg = {
      msgId: 'stop_wheel',
      data: 0
    }
    console.log('stopWheel');
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const stopAllMovement = useCallback(() => {
    stopHeadset();
    stopHip();
    stopWheel();
    console.log('stopAllMovement');
  }, [stopHeadset, stopHip, stopWheel]);

  const startCamera = useCallback((onOff) => {
    console.log('startCamera:', onOff);
    let msg = {
      msgId: 'gscam_start',
      data: onOff
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startPersonDetection = useCallback(() => {
    console.log('startPersonDetection');
    let msg = {
      msgId: 'sync_video_frames',
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startWakewordDetection = useCallback((onOff) => {
    console.log('startWakewordDetection', onOff);
    let msg = {
      msgId: 'start_wakeword_detection',
      data: onOff
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startPickupDetection = useCallback(() => {
    console.log('startPickupDetection');
    let msg = {
      msgId: 'start_pickup_detection',
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startFallDownDetection = useCallback(() => {
    console.log('startFallDownDetection');
    let msg = {
      msgId: 'start_falldown_detection',
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startGetHeadsetAngle = useCallback(() => {
    console.log('startGetHeadsetAngle');
    let msg = {
      msgId: 'start_get_headset_angle',
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startGetHipAngle = useCallback(() => {
    console.log('startGetHipAngle');
    let msg = {
      msgId: 'start_get_hip_angle',
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startGetBatteryInfo = useCallback(() => {
    console.log('startGetBatteryInfo');
    let msg = {
      msgId: 'start_get_battery_info',
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const rotateHeadset = useCallback((targetAngle, targetSpeed) => {
    let targetAngleOfHeadset = targetAngle * 10;
    let msg = {
      msgId: 'headset_motion',
      headset_target_angle: targetAngleOfHeadset,
      headset_target_speed: targetSpeed
    }
    console.log(`rotateHeadset to ${targetAngle} deg at ${targetSpeed * 2.5} dps`);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const moveOneHip = useCallback((selectedHip, targetAngle, targetSpeed) => {
    let targetAngleOfSelectedHip = targetAngle * 10;

    let msg = {
      msgId: 'hip_motion',
      left_hip_target_angle: selectedHip === 'left' ? targetAngleOfSelectedHip : currentAngleOfLeftHip.current,
      left_hip_target_speed: selectedHip === 'left' ? targetSpeed : 0,
      right_hip_target_angle: selectedHip === 'right' ? targetAngleOfSelectedHip : currentAngleOfRightHip.current,
      right_hip_target_speed: selectedHip === 'right' ? targetSpeed : 0
    }
    console.log(`move ${selectedHip} hip to ${targetAngle} deg at ${targetSpeed * 2.5} dps`);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const moveBothHip = useCallback((targetAngleL, targetAngleR, targetSpeed) => {
    let targetAngleOfLeftHip = targetAngleL * 10;
    let targetAngleOfRightHip = targetAngleR * 10;

    let msg = {
      msgId: 'hip_motion',
      left_hip_target_angle: targetAngleOfLeftHip,
      left_hip_target_speed: targetSpeed,
      right_hip_target_angle: targetAngleOfRightHip,
      right_hip_target_speed: targetSpeed
    }
    console.log(`move left hip to ${targetAngleL} deg and right hip to ${targetAngleR} at ${targetSpeed * 2.5} dps`);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const tiltBody = useCallback((direction, targetAngle, targetSpeed) => {
    let tiltDirection;
    direction === 'left' ? tiltDirection = 0 : tiltDirection = 1;

    let msg = {
      msgId: 'BodyRoll',
      body_target_direction: tiltDirection,
      body_target_angle: targetAngle,
      body_target_speed: targetSpeed
    }
    console.log(`tilt body ${targetAngle} deg to the ${direction} at ${targetSpeed * 2.5} dps`);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const spinInPlace = useCallback((direction, speed) => {
    let wheelAngularSpeed;

    switch (speed) {
      case 0:
        direction === 'left' ? wheelAngularSpeed = WHEEL_ANGULAR_SPEED_SLOW_RAD : wheelAngularSpeed = -WHEEL_ANGULAR_SPEED_SLOW_RAD;
        break;
      case 1:
        direction === 'left' ? wheelAngularSpeed = WHEEL_ANGULAR_SPEED_NORMAL_RAD : wheelAngularSpeed = -WHEEL_ANGULAR_SPEED_NORMAL_RAD;
        break;
      case 2:
        direction === 'left' ? wheelAngularSpeed = WHEEL_ANGULAR_SPEED_FAST_RAD : wheelAngularSpeed = -WHEEL_ANGULAR_SPEED_FAST_RAD;
        break;
      case 3:
        direction === 'left' ? wheelAngularSpeed = WHEEL_ANGULAR_SPEED_FASTEST_RAD : wheelAngularSpeed = -WHEEL_ANGULAR_SPEED_FASTEST_RAD;
        break;
      default:
    }

    let msg = {
      msgId: 'wheel_move',
      linear_target_speed: 0,
      angular_target_speed: wheelAngularSpeed,
      move_distance: 0,
      spin_angle: INFINITE_ANGLE
    }
    console.log('spinInPlace:', direction, wheelAngularSpeed);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const spinDegrees = useCallback((direction, targetAngle, targetSpeed) => {
    let wheelAngularSpeed;
    direction === 'left' ? wheelAngularSpeed = targetSpeed : wheelAngularSpeed = -targetSpeed;

    let msg = {
      msgId: 'wheel_move',
      linear_target_speed: 0,
      angular_target_speed: wheelAngularSpeed,
      move_distance: 0,
      spin_angle: targetAngle
    }
    console.log('spinDegrees:', direction, targetAngle, wheelAngularSpeed);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const moveBackOrForth = useCallback((direction, speed) => {
    let wheelLinearSpeed;

    switch (speed) {
      case 0:
        direction === 'forward' ? wheelLinearSpeed = WHEEL_LINEAR_SPEED_SLOW : wheelLinearSpeed = -WHEEL_LINEAR_SPEED_SLOW;
        break;
      case 1:
        direction === 'forward' ? wheelLinearSpeed = WHEEL_LINEAR_SPEED_NORMAL : wheelLinearSpeed = -WHEEL_LINEAR_SPEED_NORMAL;
        break;
      case 2:
        direction === 'forward' ? wheelLinearSpeed = WHEEL_LINEAR_SPEED_FAST : wheelLinearSpeed = -WHEEL_LINEAR_SPEED_NORMAL;
        break;
      case 3:
        direction === 'forward' ? wheelLinearSpeed = WHEEL_LINEAR_SPEED_FASTEST : wheelLinearSpeed = -WHEEL_LINEAR_SPEED_NORMAL;
        break;
      default:
    }

    let msg = {
      msgId: 'wheel_move',
      linear_target_speed: wheelLinearSpeed,
      angular_target_speed: 0,
      move_distance: INFINITE_DISTANCE,
      spin_angle: 0
    }
    console.log('moveBackOrForth:', direction, wheelLinearSpeed);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const moveDistance = useCallback((direction, distance, speed) => {
    let wheelLinearSpeed;
    direction === 'forward' ? wheelLinearSpeed = speed : wheelLinearSpeed = -speed;

    let msg = {
      msgId: 'wheel_move',
      linear_target_speed: wheelLinearSpeed,
      angular_target_speed: 0,
      move_distance: distance,
      spin_angle: 0
    }
    console.log('moveDistance:', direction, distance, wheelLinearSpeed);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const moveAlongTurningRadius = useCallback((direction, radius) => {
    let wheelLinearSpeed = WHEEL_LINEAR_SPEED_SLOW;
    let wheelAngularSpeed = wheelLinearSpeed / radius;
    wheelAngularSpeed = Number(wheelAngularSpeed.toFixed(2));
    if(direction === 'clockwise') wheelAngularSpeed = -wheelAngularSpeed;

    let msg = {
      msgId: 'wheel_move',
      linear_target_speed: wheelLinearSpeed,
      angular_target_speed: wheelAngularSpeed,
      move_distance: INFINITE_DISTANCE,
      spin_angle: INFINITE_ANGLE
    }
    console.log('moveAlongTurningRadius:', direction, wheelLinearSpeed, wheelAngularSpeed);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startMotion = useCallback((motionId) => {
    let msg = {
      msgId: 'start_motion',
      motion_num: motionId,
      repeat_mode: 2,
      move_mode: 0
    }
    console.log('startMotion:', msg);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const stopMotion = useCallback(() => {
    let msg = {
      msgId: 'stop_motion',
      data: 0
    }
    console.log('stopMotion:');
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const startFacialExpression = useCallback((facialExpression) => {
    let msg = {
      msgId: 'display_emotion_topic',
      name: "../WEBM_30fps/" + facialExpression + ".webm",
      loop: false,
      instant_play: true
    }
    console.log('startFacialExpression:', facialExpression);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const playSound = useCallback((sound) => {
    let filePath = `/data/SND_DATA/${sound}.wav`
    let msg = {
      msgId: 'sounds_topic',
      main_type: 2,
      sub_type: 1,
      text_value: filePath,
      number_value: 2000
    }
    console.log('playSound:', filePath);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const playTTS = useCallback((text) => {
    console.log('text:', text);
    let msg = {
      msgId: 'sounds_topic',
      main_type: 1,
      sub_type: 5,
      text_value: text,
      number_value: 0
    }
    console.log('playTTS:', text);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const initPose = useCallback(() => {
    console.log('initPose');

    let msg = {
      msgId: 'headset_motion',
      headset_target_angle: HEADSET_ANGLE_NEUTRAL_POSITION,
      headset_target_speed: HEADSET_SPEED_DEFAULT
    }
    sendJsonMessage(msg);

    msg = {
      msgId: 'hip_motion',
      left_hip_target_angle: HIP_ANGLE_NEUTRAL_POSITION,
      left_hip_target_speed: HIP_SPEED_NORMAL,
      right_hip_target_angle: HIP_ANGLE_NEUTRAL_POSITION,
      right_hip_target_speed: HIP_SPEED_NORMAL
    }
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const volumeControl = useCallback((vol) => {
    let msg = {
      msgId: 'sounds_topic',
      main_type: 2,
      sub_type: 2,
      number_value: vol
    }
    console.log('volumeControl:', vol);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  const sendMotorInput = useCallback((wheelLinearSpeed, wheelAngularSpeed, hipLeft, hipRight, hipSpeed, headset, headsetSpeed) => {
    let msg = {
      msgId: 'motor_input',
      wheel_target_linear_speed: wheelLinearSpeed,
      wheel_target_angular_speed: wheelAngularSpeed,
      left_hip_target_angle: hipLeft * 10,
      right_hip_target_angle: hipRight * 10,
      headset_target_angle: headset * 10,
      left_hip_target_current: 0,
      right_hip_target_current: 0,
      motion_hip_profile_speed: hipSpeed,
      motion_headset_profile_speed: headsetSpeed,
      motion_type: 0
    }
    console.log('sendMotorInput:', wheelLinearSpeed, wheelAngularSpeed, hipLeft, hipRight, hipSpeed, headset, headsetSpeed);
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  useImperativeHandle(ref, () => {
    return {
      startCamera,
      startPersonDetection,
      startWakewordDetection,
      startPickupDetection,
      startFallDownDetection,
      startGetHeadsetAngle,
      startGetHipAngle,
      startGetBatteryInfo,
      rotateHeadset,
      moveOneHip,
      moveBothHip,
      tiltBody,
      spinInPlace,
      spinDegrees,
      moveBackOrForth,
      moveDistance,
      moveAlongTurningRadius,
      stopHeadset,
      stopHip,
      stopWheel,
      stopAllMovement,
      startMotion,
      stopMotion,
      startFacialExpression,
      playSound,
      playTTS,
      initPose,
      volumeControl,
      sendMotorInput,
    };
  }, [
    startCamera,
    startPersonDetection,
    startWakewordDetection,
    startPickupDetection,
    startFallDownDetection,
    startGetHeadsetAngle,
    startGetHipAngle,
    startGetBatteryInfo,
    rotateHeadset,
    moveOneHip,
    moveBothHip,
    tiltBody,
    spinInPlace,
    spinDegrees,
    moveBackOrForth,
    moveDistance,
    moveAlongTurningRadius,
    stopHeadset,
    stopHip,
    stopWheel,
    stopAllMovement,
    startMotion,
    stopMotion,
    startFacialExpression,
    playSound,
    playTTS,
    initPose,
    volumeControl,
    sendMotorInput
  ]);

  useEffect(() => {
    console.log('readyState: ', connectionStatus);
  }, [connectionStatus]);

  const handleApplicationTopic = useCallback((message) => {
    if (message.maintype === 3 && message.subtype === 6) { // pick-up detected
      onUpdatePickupStatus(true);
    } else if (message.maintype === 3 && message.subtype === 7) { // landing detected
      onUpdatePickupStatus(false);
    } else if (message.maintype === 5 && message.subtype === 1) { //wake word detected
      onUpdateWakeWordDetectionStatus(true);
    }
  }, [onUpdatePickupStatus, onUpdateWakeWordDetectionStatus]);

  const handleFalldownDetectedTopic = useCallback((message) => {
    if (message.falldown === 0) { // 0: Normal, 1: Fall front fake, 2:Fall back fake, 3: Fall left, 4: Fall right 5: Fall front  6: Fall back
      if (isFalldownRef.current === true) {
        isFalldownRef.current = false;
        onUpdateFalldownStatus(isFalldownRef.current);
      }
    } else {
      if (isFalldownRef.current === false) {
        isFalldownRef.current = true;
        onUpdateFalldownStatus(isFalldownRef.current);
      }
    }
  }, [onUpdateFalldownStatus]);

  const handlePersonDetectedTopic = useCallback((message) => {
    console.log('received person detected topic:', message['persons']);
    if(message['persons'].length > 0) onPersonDetection('true');
    else onPersonDetection('false');
  }, [onPersonDetection]);

  const handleHeadsetMotionFinishedTopic = useCallback((message) => {
    console.log('received headset motion finished topic:', message);
    onHeadsetMotionFinished();
  }, [onHeadsetMotionFinished]);

  const handleHipMotionFinishedTopic = useCallback((message) => {
    console.log('received hip motion finished topic:', message);
    onHipMotionFinished();
  }, [onHipMotionFinished]);

  const handleWheelMoveFinishedTopic = useCallback((message) => {
    console.log('received wheel move finished topic:', message);
    onWheelMoveFinished();
  }, [onWheelMoveFinished]);

  const handlePlaySoundFinishedTopic = useCallback((message) => {
    console.log('received play sound finished topic:', message);
    if (message.sound_id === 2000 || message.sound_id === 1001) onSoundFinished();
  }, [onSoundFinished]);

  const handleMotionFinishedTopic = useCallback((message) => {
    console.log('received motion finished topic:', message);
    onMotionFinished();
  }, [onMotionFinished]);

  const handleHeadsetInfoTopic = useCallback((message) => {
    console.log('received headset info topic:', message);
    onUpdateAngleOfHeadset(message.headset_target_angle);
  }, [onUpdateAngleOfHeadset]);

  const handleHipInfoTopic = useCallback((message) => {
    console.log('received hip info topic:', message);
    currentAngleOfLeftHip.current = message.left_hip_target_angle;
    currentAngleOfRightHip.current = message.right_hip_target_angle;
    onUpdateAngleOfHip(currentAngleOfLeftHip.current, currentAngleOfRightHip.current);
  }, [onUpdateAngleOfHip]);

  const handleBatteryInfoTopic = useCallback((message) => {
    // console.log('received battery data topic:', message.battery_remain);
    onUpdateBatteryLevel(message.battery_remain);
  }, [onUpdateBatteryLevel]);

  const handleMessage = useCallback((msg) => {
    let msgId;
    Object.keys(msg).includes('msgId') ? msgId = msg.msgId : msgId = 'noId';
    switch(msgId){
      case 'application_topic':
        handleApplicationTopic(msg);
        break;
      case 'error_state':
        handleFalldownDetectedTopic(msg);
        break;
      case 'person_info':
        handlePersonDetectedTopic(msg);
        break;
      case 'headset_motion_finished':
        handleHeadsetMotionFinishedTopic(msg);
        break;
      case 'hip_motion_finished':
        handleHipMotionFinishedTopic(msg);
        break;
      case 'wheel_move_finished':
        handleWheelMoveFinishedTopic(msg);
        break;
      case 'sound_events':
        handlePlaySoundFinishedTopic(msg);
        break;
      case 'motion_finished':
        handleMotionFinishedTopic(msg);
        break;
      case 'headset_info':
        handleHeadsetInfoTopic(msg);
        break;
      case 'hip_info':
        handleHipInfoTopic(msg);
        break;
      case 'battery_data':
        handleBatteryInfoTopic(msg);
        break;
      default:
    }
  }, [handleApplicationTopic, handleBatteryInfoTopic, handleFalldownDetectedTopic, handleHeadsetInfoTopic, handleHeadsetMotionFinishedTopic, handleHipInfoTopic, handleHipMotionFinishedTopic, handleMotionFinishedTopic, handlePersonDetectedTopic, handlePlaySoundFinishedTopic, handleWheelMoveFinishedTopic]);

  useEffect(() => {
    // console.log('lastMessage', lastJsonMessage);
    if(lastJsonMessage) handleMessage(lastJsonMessage);
  }, [lastJsonMessage, handleMessage]);

  return
});

export default WsConnector;