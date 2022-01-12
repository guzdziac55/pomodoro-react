import React from "react";
import TimerButtonOption from "./TimerButtonOption";
import classes from "./TimerTab.module.css";

import { selectIsTicking } from "../../store/timer-slice";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveStage } from "../../store/timer-slice";
import { changeTheme } from "../../store/ui-slice";

const TimerTab = () => {
  const isTicking = useSelector(selectIsTicking);
  const dispatch = useDispatch();

  const handleClickChangeOption = (timeOption, theme) => {
    if (isTicking) {
      const alert = window.confirm("pomodoro in progress wonna change ? ");
      if (!alert) {
        return;
      }
    }
    dispatch(changeActiveStage(timeOption));
    dispatch(changeTheme(theme));
  };

  return (
    <div className={classes.timerTab}>
      <TimerButtonOption
        theme={"pomodoroTheme"}
        timeOption={0}
        onChangeTabOption={handleClickChangeOption}
      >
        Pomodoro
      </TimerButtonOption>
      <TimerButtonOption
        theme={"shortBreakTheme"}
        timeOption={1}
        onChangeTabOption={handleClickChangeOption}
      >
        Short Break
      </TimerButtonOption>
      <TimerButtonOption
        theme={"longBreakTheme"}
        timeOption={2}
        onChangeTabOption={handleClickChangeOption}
      >
        Long Break
      </TimerButtonOption>
    </div>
  );
};

export default TimerTab;
