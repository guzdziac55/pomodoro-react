import React from "react";
import classes from "./TimerButtonOption.module.css";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timer-slice";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import { getIsActiveOption } from "../../store/timer-slice";

const TimerButtonOption = ({ timeOption, children, theme }) => {
  const dispatch = useDispatch();
  // const selectActiveStage = useSelector((state) => state.timer.stage);
  const isTicking = useSelector((state) => state.timer.isTicking);

  const IsActiveOption = useMemo(getIsActiveOption, []);

  const activeOption = useSelector((state) =>
    IsActiveOption(state, timeOption)
  );

  const setActiveStageHandler = () => {
    if (isTicking) {
      const alert = window.confirm("pomodoro in progress wonna change ? ");
      if (!alert) {
        return;
      }
    }
    dispatch(timerActions.changeActiveStage(timeOption)); // from props
    dispatch(uiActions.changeTheme(theme)); // from props
  };
  // time option from props
  return (
    <button
      className={`${classes.button} ${activeOption ? classes.active : ""}`}
      onClick={setActiveStageHandler} // when click on tab option
    >
      <span>{children}</span>
    </button>
  );
};

export default React.memo(TimerButtonOption);

// time option  [0,1,2]

// config.timeOptions[arg]
