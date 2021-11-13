import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../store/taskList-slice";
import {
  // actions
  consumeTime,
  calculateNewStage,
  // selectors
  selectActiveStage,
  selectIsTicking,
  selectConsumedTime,
} from "../store/timer-slice";

import {
  selectLongInterval,
  selectPomodoroOptionTime,
} from "../store/config-slice";

export const useTimer = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector(selectIsTicking);
  const consumedSeconds = useSelector(selectConsumedTime);

  const activeStage = useSelector(selectActiveStage);
  const longBreakInterval = useSelector(selectLongInterval);
  const pomodoroTimeOption = useSelector(selectPomodoroOptionTime);

  const timeIsEndAction = () => {
    dispatch(updateTask(activeStage));
    dispatch(calculateNewStage(longBreakInterval));
  };

  // consumedTimeCalculations
  useEffect(() => {
    let intervalId;
    if (isTicking && consumedSeconds <= pomodoroTimeOption) {
      intervalId = setInterval(() => {
        dispatch(consumeTime());
      }, 1000);
    } else if (consumedSeconds > pomodoroTimeOption) {
      timeIsEndAction();
    }
    return () => clearInterval(intervalId); // to też się wywoła po setInterval
  }, [isTicking, consumedSeconds, pomodoroTimeOption]);

  //
  const calculateCounter = () => {
    return pomodoroTimeOption * 60 - consumedSeconds;
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
