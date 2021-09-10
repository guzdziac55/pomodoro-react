import React from "react";
import classes from "./TasksButtonMenu.module.css";

const TasksButtonMenu = (props) => {
  // on clickLAter => function with props
  return (
    <button className={classes.button}>
      <span className={classes.icon}>{props.icon}</span>
    </button>
  );
};

export default TasksButtonMenu;
