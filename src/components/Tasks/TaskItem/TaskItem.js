import React, { useContext } from "react";
import classes from "../TaskItem/TaskItem.module.css";
import IconPlus from "../../UI/icons/IconPlus";
import TaskListContext from "../../../store/taskList-context";
// import TaskListContext from "../../../store/taskList-context";

const TaskItem = (props) => {
  // tutaj zrobić handler z edycji
  const tasksCtx = useContext(TaskListContext);

  const setActiveTask = (e) => {
    console.log(e.target);
    tasksCtx.activeTask(props.id);
  };

  return (
    <li className={classes.task} onClick={setActiveTask}>
      <span className={classes.title}>{props.title}</span>
      <span className={classes.pomodoro}>{props.pomodoro}</span>
      <span className={classes.icon}>
        <IconPlus />
      </span>
    </li>
  );
};

export default TaskItem;
