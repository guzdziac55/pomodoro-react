import React, { useContext } from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import { useSelector } from "react-redux";

const TasksList = () => {
  const tasks = useSelector((state) => state.tasksList.tasksList);
  console.log("tasks");
  console.log(tasks);
  const tasksList = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={{
        id: task.id,
        title: task.title,
        actPomodoro: task.actPomodoro,
        estPomodoro: task.estPomodoro,
        isDone: task.done,
      }}
    />
  ));
  return <ul className={classes["tasks-list"]}>{tasksList}</ul>;
};

export default TasksList;
