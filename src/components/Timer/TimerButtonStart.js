import React, { useCallback } from "react";
import { createSelector } from "@reduxjs/toolkit";
import classes from "./TimerButtonStart.module.css";
import { MdSkipNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { taskListActions } from "../../store/taskList-slice";
import { timerActions } from "../../store/timer-slice";
import { useSelector } from "react-redux";
// change into action selector

// component
const selectCurrentOption = createSelector(
  (state) => state.timer.stage,
  (state) => state.config.stageOptions,
  (stage, stageOptions) => stageOptions[stage]
);

const TimerButtonStart = () => {
  const dispatch = useDispatch();

  const isTicking = useSelector((state) => state.timer.isTicking);
  const longBreakInterval = useSelector(
    (state) => state.config.longBreakInterval
  );

  const selectCurrentStage = useSelector((state) => state.timer.stage);
  const currentOptions = useSelector((state) => selectCurrentOption(state));

  const toggleTicking = useCallback(() => {
    dispatch(timerActions.toggleTicking());
  });

  // logika wykorzystana w dwóch miejscach
  const skipTimer = useCallback(() => {
    if (isTicking) {
      const alert = window.confirm(
        "Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)"
      );
      if (!alert) {
        return;
      }
    }
    dispatch(taskListActions.updateTask(selectCurrentStage));
    dispatch(timerActions.calculateNewStage(longBreakInterval)); // calculate next stage
  });

  const showSkipButton = isTicking ? classes.show : "";

  return (
    <div>
      <button onClick={toggleTicking} className={classes.buttonStart}>
        START
      </button>

      <button
        onClick={skipTimer}
        className={`${classes.button} ${showSkipButton}`}
      >
        <MdSkipNext className={classes.icon}>START</MdSkipNext>
      </button>
    </div>
  );
};

export default React.memo(TimerButtonStart);
