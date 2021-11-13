import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../store/taskList-slice";
import {
  consumeTime,
  selectIsTicking,
  selectConsumedTime,
  selectActiveStage,
  calculateNewStage,
} from "../store/timer-slice";
import { selectStageOptions, selectLongInterval } from "../store/config-slice";

import { createSelector } from "reselect";

const selectCurrentTime = createSelector(
  selectActiveStage,
  selectStageOptions,
  (stage, stageOptions) => stageOptions[stage]
);

// // sellector with currentTime but stage is commping from / props / arg
// const selectCurrentTimeFromArg = (stage) =>
//   createSelector(selectStageOptions, (stageOptions) => stageOptions[stage]);

export const useTimer = () => {
  console.log("INSIDE USE TIMER HOOK");
  const dispatch = useDispatch();

  const isTicking = useSelector(selectIsTicking);
  const consumedSeconds = useSelector(selectConsumedTime);
  const longBreakInterval = useSelector(selectLongInterval);
  const activeStage = useSelector(selectActiveStage);

  // opcja z createSelector i bez
  const currentTimeOptions = useSelector((state) => selectCurrentTime(state));
  // const currentTimeOptions = useSelector((state) => selectCurrentTime(state));

  // id first dispatch changing state that secound disptach will use
  // we need to make redux thunk function
  const timeIsEndAction = () => {
    dispatch(updateTask(activeStage));
    dispatch(calculateNewStage(longBreakInterval));
  };

  useEffect(() => {
    let intervalId;
    if (isTicking && consumedSeconds <= currentTimeOptions) {
      intervalId = setInterval(() => {
        dispatch(consumeTime());
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
