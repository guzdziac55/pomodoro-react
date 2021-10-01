import React from "react";
import classes from "./TimerButtonOption.module.css";
import { useConfig } from "../../store/ConfigProvider";
import { useTimer } from "../../store/TimerProvider";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timer-slice";
import { useSelector } from "react-redux";
// zamineic propsy na destrukturyzacje obiektu { timeOption}
const TimerButtonOption = (props) => {
  const { timeOption } = props;

  const dispatch = useDispatch();
  const activeStage = useSelector((state) => state.timer.stage);
  console.log(activeStage);

  const setActiveStageHandler = () => {
    dispatch(timerActions.setActiveStage(timeOption));
  };

  return (
    <button className={classes.button} onClick={setActiveStageHandler}>
      <span>{props.children}</span>
    </button>
  );
};

export default TimerButtonOption;
