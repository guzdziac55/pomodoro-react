import React, { useEffect, useContext } from "react";
import classes from "./TimerCountdown.module.css";
import { useTimer } from "../../store/TimerProvider";
import { useConfig } from "../../store/ConfigProvider";
import TaskListContext from "../../store/taskList-context";

const TimerCountdown = () => {
  // popracować nad destrukturyzacją // żeby lepiej to obraż
  // sprwadzić czy te useconfig i useTimer to są hooki czy co kurwa
  const { config } = useConfig();
  const { timer } = useTimer();

  const ctxTimeLeftStage = config.stageSeconds[timer.activeStage];
  const ctxConsumedSeconds = timer.consumedSeconds;
  const isTicking = timer.ticking;

  const { consumeTime, setActiveStage, toggleTicking, resetConsumeTime } =
    useTimer();

  const tasksCtx = useContext(TaskListContext);

  // za każdym razem jak jest re render komponentu odpal useEffect, dodatkowo
  // odpal gdy dependencties się zmieniają

  //blog.logrocket.com/pitfalls-of-overusing-react-context/

  // przestaic config provier zeby tylko header mial do niego dostep

  useEffect(() => {
    let intervalId;
    if (isTicking && ctxConsumedSeconds <= ctxTimeLeftStage) {
      console.log("aa");
      intervalId = setInterval(() => {
        consumeTime();
      }, 1000);
    } else if (ctxConsumedSeconds > ctxTimeLeftStage) {
      console.log("update active item");

      // te 3 funkcje wrzucić do reducera !
      toggleTicking();
      resetConsumeTime();
      setActiveStage(1);
      tasksCtx.updateTask();

      // fial : ==> dispatch taskUpdate: task pomodoro + 1
      // ===> dispatch TimeEnd:  nextStage time 0

      // consumedTime 0
      // Stage [ 1 ]
      // taskUpdate     dispatch(TaskUpdate)

      // lepszy byłby chyba reducer porównywanie kilka statów.
    }
    return () => clearInterval(intervalId); // to też się wywoła po setInterval
  }, [isTicking, ctxConsumedSeconds]);

  const convertTime = () => {
    let minutes = parseInt(counter / 60, 10);
    let seconds = parseInt(counter % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const outputTime = `${minutes}:${seconds}`;
    return outputTime;
  };

  const counter = ctxTimeLeftStage - ctxConsumedSeconds;

  return (
    <div className={classes.countdown}>
      <span>{convertTime(counter)}</span>
    </div>
  );
};

export default TimerCountdown;
