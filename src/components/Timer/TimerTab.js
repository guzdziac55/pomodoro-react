import React from "react";
import TimerButtonOption from "./TimerButtonOption";
import classes from "./TimerTab.module.css";
import { useConfig } from "../../store/ConfigProvider";
import { useSelector } from "react-redux";

// config jest tylko do odczytu // Tylko w Config.JS w formie będzie setStateConfig

const TimerTab = (props) => {
  return (
    <div className={classes["timer-tab"]}>
      <TimerButtonOption timeOption={0}>Pomodoro</TimerButtonOption>
      <TimerButtonOption timeOption={1}>Short Break</TimerButtonOption>
      <TimerButtonOption timeOption={2}>Long Break</TimerButtonOption>
    </div>
  );
};

//  pomysł
//  w state przechowywać active zależnie od zmiany klicku
// active będzie number od 1-3
// 3 opcje dispatch: dispatch Pomodoro, shortbrak i longbrak
// pomodoro:
// active: 1   <-- zmiana statu  // default state też na 1

// https://stackoverflow.com/questions/66053125/toggle-between-active-content-state
// w buttonie
// mozemy sprwadziać
// active={props.active===1}  true lub false - i pod to css

export default TimerTab;

//  można to przerobić na map
// {name: 'pomodoro' timeOption={1}}
// {name: 'pomodoro' timeOption={2}}
// {name: 'pomodoro' timeOption={3}}
