import React, { useCallback } from "react";
import classes from "./TimerButtonStart.module.css";
import { MdSkipNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { nextStageWithConfig } from "../../store/thunks/calculateNextStage-actions";
import { toggleTicking } from "../../store/timer-slice";

const TimerButtonStart = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector((state) => state.timer.isTicking);

  const onClickToggleTicking = () => {
    dispatch(toggleTicking());
  };

  const onClickSkipTimer = () => {
    if (isTicking) {
      const alert = window.confirm(
        "Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)"
      );
      if (!alert) {
        return;
      }
    }
    dispatch(nextStageWithConfig());
  };

  const showSkipButton = isTicking ? classes.show : "";
  const startButtonClass = isTicking ? classes.active : "";

  return (
    <div>
      <button
        onClick={onClickToggleTicking}
        className={`${classes.buttonStart} ${startButtonClass}`}
      >
        {isTicking ? "STOP" : "START"}
      </button>

      <button
        onClick={onClickSkipTimer}
        className={`${classes.button} ${showSkipButton}`}
      >
        <MdSkipNext className={classes.icon}></MdSkipNext>
      </button>
    </div>
  );
};

export default React.memo(TimerButtonStart);
