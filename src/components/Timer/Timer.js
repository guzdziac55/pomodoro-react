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
      <TimerTab></TimerTab>
      {/* here we need play sound */}
      <TimerCountdown />
      <TimerButtonStart />
    </Card>
  );
};

export default Timer;
