import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  // actions
  consumeTime,
  // selectors
  selectIsTicking,
  selectConsumedTime,
} from "../store/timer-slice";

import { nextStageWithConfig } from "../store/thunks/calculateNextStage-actions";
import { selectCurrentSeconds } from "../store/timer-slice";
import { selectAlarmSound } from "../store/config-slice";
import useSound from "use-sound";
import { findNotification } from "./findNotification";

export const useTimer = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector(selectIsTicking);
  const consumedSeconds = useSelector(selectConsumedTime);

  const currentTimeOption = useSelector(selectCurrentSeconds);
  const alarmSound = useSelector(selectAlarmSound);

  const [play] = useSound(findNotification(alarmSound));

  const timeIsEndAction = () => {
    dispatch(nextStageWithConfig());
  };

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
    return () => clearInterval(intervalId);
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
