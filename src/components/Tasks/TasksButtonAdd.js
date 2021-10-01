import React from "react";
import classes from "./TasksButtonAdd.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

// reusable button
const TasksButtonAdd = (props) => {
  const { toggleForm } = props;

  return (
    <button onClick={toggleForm} className={classes.button}>
      <span className={classes.icon}>{props.icon}</span>
      <span>{props.title}</span>
    </button>
  );
};

export default TasksButtonAdd;
