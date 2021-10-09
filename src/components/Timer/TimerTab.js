import React from "react";
import TimerButtonOption from "./TimerButtonOption";
import classes from "./TimerTab.module.css";

const TimerTab = (props) => {
  return (
    <div className={classes["timer-tab"]}>
      <TimerButtonOption timeOption={0}>Pomodoro</TimerButtonOption>
      <TimerButtonOption timeOption={1}>Short Break</TimerButtonOption>
      <TimerButtonOption timeOption={2}>Long Break</TimerButtonOption>
    </div>
  );
};

export default TimerTab;

// config slice można zmienić na obiekt
// {
//   pomodoro: 10        index obiektu ( time option)
//   shortBreak: 20
// }
