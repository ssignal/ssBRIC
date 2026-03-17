var count;


count = 0;
for (var count2 = 0; count2 < 10; count2++) {
  if (count >= 3) {
    console.log("{\"type\":\"Action\",\"action\":\"navigation/move_to_pose\",\"parameter\":{\"x\":0,\"y\":0,\"theta\":0,\"behavior_tree\":\"\",\"frame_id\":\"map\"}}");
    console.log("{\"type\":\"Action\",\"action\":\"sound/start_play\",\"parameter\":{\"sound_id\":\"\"}}");
    console.log("{\"type\":\"Action\",\"action\":\"motion/wait_motion_finished\",\"parameter\":{}}");
  }
  count = (typeof count === 'number' ? count : 0) + 1;
}
