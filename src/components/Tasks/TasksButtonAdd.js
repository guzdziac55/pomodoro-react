import React from "react";
import classes from "./TasksButtonAdd.module.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const TasksButtonAdd = ({ onToggleForm, children }) => {
  return (
    <button onClick={onToggleForm} className={classes.addButton}>
      <MdOutlineAddCircleOutline className={classes.icon} />
      <span>{children}</span>
    </button>
  );
};

export default TasksButtonAdd;
