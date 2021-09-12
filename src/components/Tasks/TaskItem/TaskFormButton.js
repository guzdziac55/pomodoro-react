import React from "react";
import classes from "./TaskFormButton.module.css";

const TaskFromButton = (props) => {
  return <button type={props.type}>{props.children}</button>;
};

export default TaskFromButton;
