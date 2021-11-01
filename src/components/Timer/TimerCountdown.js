// import React, { useEffect, useContext } from "react";
import React from "react";
import classes from "./TimerCountdown.module.css";
import { useTimer } from "../../hooks/use-timer";

const TimerCountdown = () => {
  const convertedTimeout = useTimer();
  return (
    <>
      <span className={classes.countDown}>{convertedTimeout}</span>
    </>
  );
};

export default TimerCountdown;

//  to delate

// {
//   /* <span>{convertTime(counter)}</span> */
// }

// logika przeniesiona do hooka

// import { useState } from "react";
// import { timerActions } from "../../store/timer-slice";
// import { taskListActions } from "../../store/taskList-slice";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();
// const stageOptionsArray = useSelector((state) => state.config.stageOptions);

// const activeStage = useSelector((state) => state.timer.stage);
// const consumedSeconds = useSelector((state) => state.timer.consumedSeconds);
// const isTicking = useSelector((state) => state.timer.isTicking);
// const activeTimeStage = stageOptionsArray[activeStage];

// const consumeTime = () => {
//   dispatch(timerActions.consumeTime());
// };

// const timeIsEndAction = () => {
// dispatch(timerActions.toggleTicking()); // timeTop
//   dispatch(timerActions.setActiveStage()); // check how many pomodoros done
//   dispatch(timerActions.resetConsumedTime()); // reset timer
//   // and after that decide with option to use
// };

// const updateTask = () => {
//   dispatch(taskListActions.updateTask(activeStage));
// };

// useEffect(() => {
//   let intervalId;
//   if (isTicking && consumedSeconds <= activeTimeStage) {
//     intervalId = setInterval(() => {
//       consumeTime();
//     }, 1000);
//   } else if (consumedSeconds > activeTimeStage) {
//     // when times end
//     timeIsEndAction();
//     updateTask();
//   }
//   return () => clearInterval(intervalId); // to też się wywoła po setInterval
// }, [isTicking, consumedSeconds]);

// const counter = activeTimeStage - consumedSeconds;

// const convertTime = (time) => {
//   let minutes = parseInt(time / 60, 10);
//   let seconds = parseInt(time % 60, 10);
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;
//   const outputTime = `${minutes}:${seconds}`;
//   return outputTime;
// };
