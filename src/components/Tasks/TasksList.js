import React, { useContext } from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import TaskListContext from "../../store/taskList-context";

const TasksList = () => {
  const tasksCtx = useContext(TaskListContext);
  const tasksList = tasksCtx.tasks.map((task) => (
    <TaskItem
      active={task.id === tasksCtx.active ? true : false}
      key={task.id}
      id={task.id}
      title={task.title}
      pomodoro={task.pomodoro}
    />
  ));
  return <ul className={classes["tasks-list"]}>{tasksList}</ul>;
};

export default TasksList;
