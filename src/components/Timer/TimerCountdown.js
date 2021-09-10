import React from "react";
import classes from "./TimerCountdown.module.css";

const TimerCountdown = (props) => {
  return (
    <div className={classes.countdown}>
      <span>25:00</span>
    </div>
  );
};

export default TimerCountdown;
