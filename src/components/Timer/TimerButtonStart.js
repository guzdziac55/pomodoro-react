import React, { useCallback } from "react";
import classes from "./TimerButtonStart.module.css";
import { MdSkipNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { nextStageWithConfig } from "../../store/thunks/calculateNextStage-actions";
import { toggleTicking } from "../../store/timer-slice";

const buttonVariant = {
  // infinity animation // keyframe
  visable: {
    opacity: 1,
    scale: [1, 1.05, 1, 1.05],
    transition: { yoyo: Infinity, delay: 0.2 },
  },

  //  two variants when start is true, and start is false
  animate1: {},
  animate2: {},
};

//  add state Variant here or get state fron useSelect

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
      <motion.button
        variants={buttonVariant}
        initial="hidden"
        animate="visable"
        onClick={onClickToggleTicking}
        className={`${classes.buttonStart} ${startButtonClass}`}
      >
        {isTicking ? "STOP" : "START"}
      </motion.button>

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
