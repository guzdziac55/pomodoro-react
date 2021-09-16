import React, { useContext } from "react";
import Card from "../UI/Card";
import classes from "./Timer.module.css";
import TimerTab from "./TimerTab";
import TimerCountdown from "./TimerCountdown";
import TimerButtonStart from "./TimerButtonStart";
// import { useTimer } from "../../store/TimerProvider";
// import WorkingOn from "../WorkingOn/WorkingOn";
// import Timer Tab
// import Timer Coundrown
// import Timmer ButtonStart

// const { timer } = useTimer();

// const timerStart = (data) => {
//   // data => currentSecounds time
//   const currTime = data; /// in secounds
//   let minutes = parseInt(currTime / 60, 10);
//   let seconds = parseInt(currTime % 60, 10);
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;
//   const outputTime = `${minutes}:${seconds}`;
//   return outputTime;
// };

// const convertedTime = timerStart(501);
// console.log(convertedTime);

const Timer = (props) => {
  return (
    <Card class={classes.timer}>
      <TimerTab></TimerTab>
      <TimerCountdown />
      {/*  Timer state:
        actualTime from 0 - config[0] time   // 
      */}
      <TimerButtonStart />

      {/* main button Start */}
    </Card>
  ); // to jest zamiast diva
};

export default Timer;
