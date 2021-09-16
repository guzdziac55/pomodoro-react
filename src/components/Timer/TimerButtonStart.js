import React from "react";
import classes from "./TimerButtonStart.module.css";
import { useTimer } from "../../store/TimerProvider";
const TimerButtonStart = () => {
  const { toggleTicking } = useTimer();

  const handleTicking = () => {
    toggleTicking();
  };

  return (
    <button onClick={handleTicking} className={classes["button-start"]}>
      START
    </button>
  );
};

export default TimerButtonStart;
