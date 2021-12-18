import React, { useCallback } from "react";
import classes from "./TimerButtonStart.module.css";
import { MdSkipNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateTask } from "../../store/taskList-slice";
import {
  toggleTicking,
  calculateNewStage,
  selectActiveStage,
} from "../../store/timer-slice";
import { selectLongBrakInterval } from "../../store/config-slice";

const TimerButtonStart = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector((state) => state.timer.isTicking);
  const activeStage = useSelector(selectActiveStage);
  const longBreakInterval = useSelector(selectLongBrakInterval);

  const onClickToggleTicking = useCallback(() => {
    dispatch(toggleTicking());
  });

  const onClickSkipTimer = useCallback(() => {
    if (isTicking) {
      const alert = window.confirm(
        "Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)"
      );
      if (!alert) {
        return;
      }
    }

    // PUT UPDATE TASK AND CALCULATE NEW STAGE IN THUNK !
    dispatch(updateTask(activeStage));
    // use thunk here !

    // NEXT STAGE WITH CONFIG ! ! !
    dispatch(calculateNewStage(longBreakInterval)); // calculate next stage
  });

  const showSkipButton = isTicking ? classes.show : "";
  const startButtonClass = isTicking ? classes.active : "";

  return (
    <div>
      <button
        onClick={onClickToggleTicking}
        className={`${classes.buttonStart} ${startButtonClass}`}
      >
        START
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
