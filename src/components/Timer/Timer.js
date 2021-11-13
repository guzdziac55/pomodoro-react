import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./Timer.module.css";
import TimerTab from "./TimerTab";
import TimerCountdown from "./TimerCountdown";
import TimerButtonStart from "./TimerButtonStart";

// we can use selector here and put intoProps

const Timer = () => {
  return (
    <Card class={classes.timer}>
      {/* is ticking, activestage */}
      <TimerTab></TimerTab>
      {/* use timer = > currentTime, isTicking,consumedSecound, LongBreakInterval
      ActiveStage, currentOptuonStage */}
      <TimerCountdown />
      {/* currentTime, isTicking, longBreakInterval, activeStage */}
      <TimerButtonStart />
    </Card>
  );
};

export default Timer;
