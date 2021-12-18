import React from "react";
import classes from "./KeyBinds.module.css";
// import toogleTicking from "./../../store/timer-slice";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch } from "react-redux";
import { toggleTicking, changeActiveStage } from "./../../store/timer-slice";
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

  // thunk next stage
  useHotkeys("alt+a", () => dispatch(toggleTicking()));
  // stop / start timer
  useHotkeys("alt+s", () => dispatch(toggleTicking()));

  return (
    <div className={classes.bindsContainer}>
      <button className={classes.button}>P</button>
      <button className={classes.button}>B</button>
      <button className={classes.button}>L</button>
      <button className={`${classes.button} ${classes.longButton}`}>
        SPACE
      </button>
    </div>
  );
};

export default KeyBinds;
