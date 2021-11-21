import React from "react";
import classes from "./TimerCountdown.module.css";
import { useTimer } from "../../hooks/use-timer";

const TimerCountdown = () => {
  const convertedTimeout = useTimer();
  return (
    <>
      {/* in state we got minutes [ 1 , 2 , 6] */}
      {/* in settings we got minutes from state */}
      {/* in useTimer we need secound to calculate    consumed < current */}
      <span className={classes.countDown}>{convertedTimeout}</span>
    </>
  );
};

export default TimerCountdown;
