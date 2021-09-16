import React, { useEffect } from "react";
import classes from "./TimerCountdown.module.css";
import { useTimer } from "../../store/TimerProvider";
import { useConfig } from "../../store/ConfigProvider";

const TimerCountdown = (props) => {
  const { config } = useConfig();
  const { timer } = useTimer();

  const ctxTimeLeftStage = config.stageSeconds[timer.activeStage];
  const ctxConsumedSeconds = timer.consumeTime;
  const isTicking = timer.ticking;

  const { consumeTime } = useTimer();

  useEffect(() => {
    let intervalId;

    if (isTicking) {
      intervalId = setInterval(() => {
        const counter = ctxTimeLeftStage - ctxConsumedSeconds;
        let minutes = parseInt(counter / 60, 10);
        let seconds = parseInt(counter % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        const outputTime = `${minutes}:${seconds}`;

        consumeTime();
        return outputTime;
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTicking, ctxConsumedSeconds]);

  // [ isActive, consumedSecounds]   <// dependecties jeśli te dwie rzeczy się zmienia
  // to ma zrobić useEffect

  // const convertForTime = (data) => {
  //   const currTime = data; /// in secounds
  //   let minutes = parseInt(currTime / 60, 10);
  //   let seconds = parseInt(currTime % 60, 10);
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   seconds = seconds < 10 ? "0" + seconds : seconds;
  //   const outputTime = `${minutes}:${seconds}`;
  //   return outputTime;
  // };

  // const convertedTime = convertForTime(501);
  // console.log(convertedTime);

  // getTimeOption ?
  // later ConsumedSecounds

  // calculate Time Function  ==> Takes:
  //  consumedSecounds 0, 1, 2, 3, 4
  // ConfigTimerArr[stage] //  1500 secounds
  // bedzie liczyć różnice ?? ale nie zapisywac w state => w state będzie dodawał consumedSecounds

  return (
    <div className={classes.countdown}>
      <span>{outputTime}</span>
    </div>
  );
};

export default TimerCountdown;
