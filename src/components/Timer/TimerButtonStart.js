import React, { useEffect, useState } from "react";
import classes from "./TimerButtonStart.module.css";
import { MdSkipNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { nextStageWithConfig } from "../../store/thunks/calculateNextStage-actions";
import { toggleTicking } from "../../store/timer-slice";

const variantInitial = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visable: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", mass: 0.4, ease: "easeOut", duration: 3 },
  },
};

const variantStart = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visable: {
    y: 0,
    opacity: 1,
    scale: [1, 1.05, 1, 1.05, 1],
    transition: { repeat: Infinity, type: "yoyo", duration: 3 },
  },
};

const variantStop = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visable: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

const skipVariantHide = {
  hidden: {
    opacity: 0,
  },
  visable: {
    opacity: 0,
    x: -40,
  },
  transition: { duration: 0.2 },
};

const skipVariantShow = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visable: {
    opacity: 1,
    x: 10,
    transition: { duration: 5, type: "spring", mass: 0.2 },
  },
};

const textVariant = {
  hidden: {
    opacity: 0,
  },
  visable: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};

const TimerButtonStart = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector((state) => state.timer.isTicking);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setInitial(false);
  }, []);

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

  const startButtonClass = isTicking ? classes.active : "";
  let startVariant;

  const checkVariant = () => {
    if (initial) return variantInitial;
    if (!initial && !isTicking) return variantStart;
    if (!initial && isTicking) return variantStop;
  };

  return (
    <div>
      <motion.button
        variants={checkVariant()}
        initial="hidden"
        animate="visable"
        onClick={onClickToggleTicking}
        className={`${classes.buttonStart} ${startButtonClass}`}
      >
        <motion.span variants={textVariant}>
          {isTicking ? "STOP" : "START"}
        </motion.span>
      </motion.button>

      <motion.button
        onClick={onClickSkipTimer}
        className={`${classes.button}`}
        variants={isTicking ? skipVariantShow : skipVariantHide}
        initial="hidden"
        animate="visable"
      >
        <MdSkipNext className={classes.icon}></MdSkipNext>
      </motion.button>
    </div>
  );
};

export default React.memo(TimerButtonStart);
