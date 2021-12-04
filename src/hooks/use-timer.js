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

import { nextStageWithConfig } from "../store/thunks/calculateNextStage-actions";
import { selectLongBrakInterval } from "../store/config-slice";
import { selectCurrentSeconds } from "../store/timer-slice";
import { selectAlarmSound } from "../store/config-slice";
import useSound from "use-sound";
import { findNotification } from "./findNotification";

export const useTimer = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector(selectIsTicking);
  const consumedSeconds = useSelector(selectConsumedTime);

  const activeStage = useSelector(selectActiveStage);
  const longBreakInterval = useSelector(selectLongBrakInterval);
  const currentTimeOption = useSelector(selectCurrentSeconds);
  const alarmSound = useSelector(selectAlarmSound);

  const [play] = useSound(findNotification(alarmSound));

  const timeIsEndAction = () => {
    dispatch(updateTask(activeStage));
    dispatch(nextStageWithConfig());
  };

  // consumedTimeCalculations
  useEffect(() => {
    let intervalId;
    if (isTicking && consumedSeconds <= currentTimeOption) {
      intervalId = setInterval(() => {
        dispatch(consumeTime());
      }, 1000);
    } else if (consumedSeconds > currentTimeOption) {
      timeIsEndAction();
      play();
    }
    return () => clearInterval(intervalId); // to też się wywoła po setInterval
  }, [isTicking, consumedSeconds, currentTimeOption]);

  //
  const calculateCounter = () => {
    return currentTimeOption - consumedSeconds;
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
