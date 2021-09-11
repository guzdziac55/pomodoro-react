import React from "react";
import classes from "./TasksButtonAdd.module.css";

// reusable button
const TasksButtonAdd = (props) => {
  return (
    <button onClick={props.onShowForm} className={classes.button}>
      <span className={classes.icon}>{props.icon}</span>
      <span>{props.title}</span>
    </button>
  );
};

export default TasksButtonAdd;
