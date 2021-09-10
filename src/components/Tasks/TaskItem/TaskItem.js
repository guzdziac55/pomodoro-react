import React from "react";
import classes from "../TaskItem/TaskItem.module.css";
import IconPlus from "../../UI/icons/IconPlus";

const TaskItem = (props) => {
  return (
    <li className={classes.task}>
      <span className={classes.title}>{props.title}</span>
      <span className={classes.icon}>
        <IconPlus />
      </span>
    </li>
  );
};

export default TaskItem;
