import React, { PureComponent } from "react";
import Card from "../UI/Card";
import classes from "./Timer.module.css";
import TimerTab from "./TimerTab";
import TimerCountdown from "./TimerCountdown";
import TimerButtonStart from "./TimerButtonStart";
import WorkingOn from "../WorkingOn/WorkingOn";
// import Timer Tab
// import Timer Coundrown
// import Timmer ButtonStart

const Timer = (props) => {
  // whole timer component
  return (
    <>
      <Card class={classes.timer}>
        <TimerTab></TimerTab>
        <TimerCountdown />
        <TimerButtonStart />

        {/* main button Start */}
      </Card>
    </>
  ); // to jest zamiast diva
};

export default Timer;
