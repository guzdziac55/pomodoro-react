import React from "react";
import classes from "./KeyBinds.module.css";
// import toogleTicking from "./../../store/timer-slice";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch } from "react-redux";
import { toggleTicking, changeActiveStage } from "./../../store/timer-slice";
import { nextStageWithConfig } from "../../store/thunks/calculateNextStage-actions";
// keys need to be listen in option
// like in game:
// Click => pomodoro listen key => modal with listener option
//  - user types key
//  - save key + hotkey ASCI into array => set what event it can be

const KeyBinds = () => {
  const dispatch = useDispatch();

  useHotkeys("p", () => dispatch(changeActiveStage(0)));
  useHotkeys("b", () => dispatch(changeActiveStage(1)));
  useHotkeys("l", () => dispatch(changeActiveStage(2)));

  useHotkeys("alt+s", () => dispatch(toggleTicking()));
  // thunk next stage
  useHotkeys("alt+a", () => dispatch(nextStageWithConfig()));
  // stop / start timer

  return (
    <div className={classes.bindsContainer}>
      <h1>KEY BINDS</h1>
      <div className={classes.buttonContainer}>
        <button className={classes.button}>P</button>
        <span>- set pomodoro stage</span>
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.button}>B</button>
        <span>- set short break stage</span>
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.button}>L</button>
        <span>- set long break stage</span>
      </div>
      <div className={classes.buttonContainer}>
        <button className={`${classes.button} ${classes.longButton}`}>
          ALT + S
        </button>
        <span>- set start/stop timer</span>
      </div>
      <div className={classes.buttonContainer}>
        <button className={`${classes.button} ${classes.longButton}`}>
          ALT + A
        </button>
        <span>- go to next stage</span>
      </div>
    </div>
  );
};

export default KeyBinds;
