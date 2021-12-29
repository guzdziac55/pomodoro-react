import React from "react";
import Card from "../UI/Card";
import classes from "./Timer.module.css";
import TimerTab from "./TimerTab";
import TimerCountdown from "./TimerCountdown";
import TimerButtonStart from "./TimerButtonStart";

const Timer = () => {
  return (
    <Card className={classes.timer}>
      <TimerTab></TimerTab>

      <TimerCountdown />
      <TimerButtonStart />
    </Card>
  );
};

export default Timer;
