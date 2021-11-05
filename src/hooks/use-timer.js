import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { taskListActions } from "../store/taskList-slice";
import { timerActions } from "../store/timer-slice";
import { getActiveTimeStage } from "../store/timer-slice";
import { getTimeOptions } from "../store/config-slice";
import { createSelector } from "reselect";

// name conventions
// get => geters for get part of state
// select.name => selectors with reSelect

const selectCurrentTime = createSelector(
  getActiveTimeStage,
  getTimeOptions,
  (stage, stageOptions) => stageOptions[stage]
);

// sellector with currentTime but stage is commping from / props / arg
const selectCurrentTimeFromArg = (stage) =>
  createSelector(getTimeOptions, (stageOptions) => stageOptions[stage]);

// move into thunk function ?
export const useTimer = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector((state) => state.timer.isTicking);
  const consumedSeconds = useSelector((state) => state.timer.consumedSeconds);
  const longBreakInterval = useSelector(
    (state) => state.config.longBreakInterval
  );
  const activeStage = useSelector((state) => state.timer.stage);
  const currentTimeOptions = useSelector((state) => selectCurrentTime(state));

  const consumeTime = () => {
    dispatch(timerActions.consumeTime());
  };

  const timeIsEndAction = () => {
    dispatch(timerActions.calculateNewStage(longBreakInterval)); // calculate next stage
    dispatch(taskListActions.updateTask(activeStage));
  };

  useEffect(() => {
    let intervalId;
    if (isTicking && consumedSeconds <= currentTimeOptions) {
      intervalId = setInterval(() => {
        consumeTime(); // update consumed secounds
      }, 1000);
    } else if (consumedSeconds > currentTimeOptions) {
      timeIsEndAction();
    }
    return () => clearInterval(intervalId); // to też się wywoła po setInterval
  }, [isTicking, consumedSeconds, currentTimeOptions]);

  const calculateCounter = () => {
    return currentTimeOptions - consumedSeconds;
  };

  const counter = calculateCounter();

  // dodać także minus Consumed Time
  const convertTime = (time) => {
    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const outputTime = `${minutes}:${seconds}`;
    return outputTime;
  };

  return convertTime(counter);
};
