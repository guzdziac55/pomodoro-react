import React from "react";
import classes from "./TimerButtonOption.module.css";

import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timer-slice";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
// zamineic propsy na destrukturyzacje obiektu { timeOption}
const TimerButtonOption = ({ timeOption, children, theme }) => {
  const selectedTheme = theme;
  const dispatch = useDispatch();
  const activeStage = useSelector((state) => state.timer.stage);
  const isTicking = useSelector((state) => state.timer.isTicking);

  const setActiveStageHandler = () => {
    if (isTicking) {
      const alert = window.confirm("pomodoro in progress wonna change ? ");
      if (!alert) {
        return;
      }
    }
    dispatch(timerActions.setActiveStage(timeOption));
  };

  const setTheme = (theme) => {
    dispatch(uiActions.changeTheme(theme));
  };

  const onClickWrapper = () => {
    setActiveStageHandler();
    setTheme(selectedTheme);
  };

  // przenieść logikę do Dispatch

  const isActive = activeStage === timeOption;

  return (
    <button
      className={`${classes.button} ${isActive ? classes.active : ""}`}
      onClick={onClickWrapper}
    >
      <span>{children}</span>
    </button>
  );
};

export default TimerButtonOption;
