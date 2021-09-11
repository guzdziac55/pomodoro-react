import React from "react";
import classes from "./TaskFormButton.module.css";

const TaskFromButton = (props) => {
  return <button className={classes.button}>{props.children}</button>;
};

export default TaskFromButton;
