import React, { useCallback } from "react";
import { createSelector } from "@reduxjs/toolkit";
import classes from "./TimerButtonStart.module.css";
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
  console.log("daspodksadkdaspodksadkdaspodksadkdaspodksadkdaspodksadk");
  const dispatch = useDispatch();

  const isTicking = useSelector((state) => state.timer.isTicking);
  const longBreakInterval = useSelector(
    (state) => state.config.longBreakInterval
  );

  const activeStage = useSelector((state) => state.timer.stage);
  const currentOptions = useSelector((state) => selectCurrentOption(state));

  const toggleTicking = useCallback(() => {
    dispatch(timerActions.toggleTicking());
  });

  // cała funkcja do thunk
  const skipTimer = useCallback(() => {
    if (isTicking) {
      const alert = window.confirm(
        "Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)"
      );
      if (!alert) {
        return;
      }
    }
    // byłoby dobrze jakby te state action się widziały
    // przenieść do thunk functions ?
    dispatch(timerActions.calculateNewStage(longBreakInterval)); // calculate next stage
    dispatch(taskListActions.updateTask(activeStage));
  });

  return (
    <div className={classes.buttonsWrapper}>
      <p>{currentOptions}</p>
      <button onClick={toggleTicking} className={classes.buttonStart}>
        START
      </button>

      {/*  jeśli jest ticking i pomodoro State */}
      {isTicking && (
        <button onClick={skipTimer} className={classes.buttonStart}>
          START
        </button>
      )}
    </div>
  );
};

export default React.memo(TimerButtonStart);
