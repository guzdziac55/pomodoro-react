import React from "react";
import TimerButtonOption from "./TimerButtonOption";
import classes from "./TimerTab.module.css";

// propsy potrzebne ?
const TimerTab = (props) => {
  return (
    <div className={classes["timer-tab"]}>
      <TimerButtonOption theme={"pomodoroTheme"} timeOption={0}>
        Pomodoro
      </TimerButtonOption>
      <TimerButtonOption theme={"shortBreakTheme"} timeOption={1}>
        Short Break
      </TimerButtonOption>
      <TimerButtonOption theme={"longBreakTheme"} timeOption={2}>
        Long Break
      </TimerButtonOption>
    </div>
  );
};

export default TimerTab;

// config slice można zmienić na obiekt
// {
//   pomodoro: 10        index obiektu ( time option)
//   shortBreak: 20
// }
