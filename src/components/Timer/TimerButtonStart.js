import React, { useEffect, useState } from "react";
import classes from "./TimerButtonStart.module.css";
import { MdSkipNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { nextStageWithConfig } from "../../store/thunks/calculateNextStage-actions";
import { toggleTicking } from "../../store/timer-slice";

const buttonVariant1 = {
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

const buttonVariant2 = {
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

//  many variants: = > >  > > > > >
//  more then 2
//  we can use Switch statement on useState with conditionals
//  change actual Variant in switch or conditional statement

const TimerButtonStart = () => {
  const dispatch = useDispatch();
  const isTicking = useSelector((state) => state.timer.isTicking);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setInitial(false);
  }, []);

  console.log("initial status:");
  console.log(initial);

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
        variants={initial ? buttonVariant1 : buttonVariant2}
        initial="hidden"
        animate="visable"
        s
        onClick={onClickToggleTicking}
        className={`${classes.buttonStart} ${startButtonClass}`}
      >
        <motion.span variants={textVariant}>
          {isTicking ? "STOP" : "START"}
        </motion.span>
        {/* {isTicking ? "STOP" : "START"} */}
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
