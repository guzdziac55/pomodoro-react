import React from "react";
import classes from "./TimerButtonOption.module.css";
import { useConfig } from "../../store/ConfigProvider";
import { useTimer } from "../../store/TimerProvider";

const TimerButtonOption = (props) => {
  const { config } = useConfig();
  const timeOptionsArr = config.stageSeconds;

  const { setActiveStage } = useTimer();

  const handleChangeStage = () => {
    setActiveStage(props.timeOption);
  };

  // const setActiveTimeStage = () => {
  //   setStage(props.timeOption);
  // };

  return (
    <button className={classes.button} onClick={handleChangeStage}>
      <span>{props.children}</span>
      <span>{timeOptionsArr[props.timeOption]}</span>
    </button>
  );
};

export default TimerButtonOption;
