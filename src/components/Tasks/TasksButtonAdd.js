import React, { useEffect } from "react";
import classes from "./TasksButtonAdd.module.css";

// reusable button
const TasksButtonAdd = (props) => {
  const handleButtonShowForm = () => {
    props.onShowForm();
  };

  return (
    <button onClick={handleButtonShowForm} className={classes.button}>
      <span className={classes.icon}>{props.icon}</span>
      <span>{props.title}</span>
    </button>
  );
};

export default TasksButtonAdd;
