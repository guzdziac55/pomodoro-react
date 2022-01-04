import React, { useState } from "react";
import classes from "./TimerCountdown.module.css";
import { motion, AnimatePresence } from "framer-motion";

import { useTimer } from "../../hooks/use-timer";

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visable: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const TimerCountdown = () => {
  //  callback !
  const convertedTimeout = useTimer();

  return (
    <AnimatePresence exitBeforeEnter>
      <>
        <motion.span
          key={convertedTimeout}
          variants={variants}
          className={classes.countDown}
          initial="hidden"
          animate="visable"
          exit="exit"
        >
          {convertedTimeout}
        </motion.span>
      </>
    </AnimatePresence>
  );
};

export default TimerCountdown;
