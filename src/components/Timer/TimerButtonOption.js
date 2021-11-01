import React from "react";
import classes from "./TimerButtonOption.module.css";

import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timer-slice";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const TimerButtonOption = ({ timeOption, children, theme }) => {
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
    dispatch(timerActions.changeActiveStage(timeOption));
    dispatch(uiActions.changeTheme(theme));
  };

  const isActive = activeStage === timeOption;

  return (
    <button
      className={`${classes.button} ${isActive ? classes.active : ""}`}
      onClick={setActiveStageHandler}
    >
      <span>{children}</span>
    </button>
  );
};

export default TimerButtonOption;
