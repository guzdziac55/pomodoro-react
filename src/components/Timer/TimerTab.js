import React from "react";
import TimerButtonOption from "./TimerButtonOption";
import classes from "./TimerTab.module.css";

const TimerTab = (props) => {
  return (
    <div className={classes["timer-tab"]}>
      <TimerButtonOption>Pomodoro</TimerButtonOption>
      <TimerButtonOption>Short Break</TimerButtonOption>
      <TimerButtonOption>Long Break</TimerButtonOption>
    </div>
  );
};

export default TimerTab;
