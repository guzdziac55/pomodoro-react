import React from "react";
import classes from "./TimerButtonStart.module.css";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timer-slice";

const TimerButtonStart = () => {
  const dispatch = useDispatch();

  // const { toggleTicking } = useTimer();

  const toggleTicking = () => {
    dispatch(timerActions.toggleTicking());
  };

  return (
    <button onClick={toggleTicking} className={classes["button-start"]}>
      START
    </button>
  );
};

export default TimerButtonStart;
