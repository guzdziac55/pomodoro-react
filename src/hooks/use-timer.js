import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { taskListActions } from "../store/taskList-slice";
import { timerActions } from "../store/timer-slice";

export const useTimer = () => {
  // state slices
  const activeStage = useSelector((state) => state.timer.stage);
  const isTicking = useSelector((state) => state.timer.isTicking);
  const consumedSeconds = useSelector((state) => state.timer.consumedSeconds);
  const configStage = useSelector((state) => state.config.stageOptions);
  const longBreakInterval = useSelector(
    (state) => state.config.longBreakInterval
  );

  const currentOptionTime = configStage[activeStage];
  const dispatch = useDispatch();

  const consumeTime = () => {
    dispatch(timerActions.consumeTime());
  };

  const timeIsEndAction = () => {
    dispatch(timerActions.calculateNewStage(longBreakInterval)); // calculate next stage
    dispatch(taskListActions.updateTask(activeStage));
  };

  //

  useEffect(() => {
    let intervalId;
    if (isTicking && consumedSeconds <= currentOptionTime) {
      intervalId = setInterval(() => {
        consumeTime(); // update consumed secounds
      }, 1000);
    } else if (consumedSeconds > currentOptionTime) {
      timeIsEndAction();
    }
    return () => clearInterval(intervalId); // to też się wywoła po setInterval
  }, [isTicking, consumedSeconds, currentOptionTime]);

  const calculateCounter = () => {
    return currentOptionTime - consumedSeconds;
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
