import React, { useEffect, useContext } from "react";
import classes from "./TimerCountdown.module.css";
import { useState } from "react";

import { timerActions } from "../../store/timer-slice";
import { taskListActions } from "../../store/taskList-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TimerCountdown = () => {
  const dispatch = useDispatch();
  const stageOptionsArray = useSelector((state) => state.config.stageOptions);

  const activeStage = useSelector((state) => state.timer.stage);
  const consumedSeconds = useSelector((state) => state.timer.consumedSeconds);
  const isTicking = useSelector((state) => state.timer.isTicking);
  const activeTimeStage = stageOptionsArray[activeStage];

  const consumeTime = () => {
    dispatch(timerActions.consumeTime());
  };

  const timeIsEndAction = () => {
    dispatch(timerActions.toggleTicking());
    dispatch(timerActions.resetConsumedTime());
    dispatch(timerActions.setActiveStage(0));
  };

  const updateTask = () => {
    dispatch(taskListActions.updateTask());
  };

  useEffect(() => {
    let intervalId;
    if (isTicking && consumedSeconds <= activeTimeStage) {
      console.log(isTicking);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
      intervalId = setInterval(() => {
        consumeTime();
      }, 1000);
    } else if (consumedSeconds > activeTimeStage) {
      console.log("update bbbbbbbbbbbbbbbb");
      timeIsEndAction();
      updateTask();
    }
    return () => clearInterval(intervalId); // to też się wywoła po setInterval
  }, [isTicking, consumedSeconds]);

  const counter = activeTimeStage - consumedSeconds;

  const convertTime = () => {
    let minutes = parseInt(counter / 60, 10);
    let seconds = parseInt(counter % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const outputTime = `${minutes}:${seconds}`;
    return outputTime;
  };

  return (
    <div className={classes.countdown}>
      <span>{convertTime(counter)}</span>
    </div>
  );
};

export default TimerCountdown;
