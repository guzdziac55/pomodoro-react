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
