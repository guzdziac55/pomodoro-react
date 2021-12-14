import React from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";

const TasksList = ({ tasks }) => {
  const tasksList = tasks.map((task) => (
    <TaskItem
      key={task.id}
      taskData={{
        id: task.id,
        title: task.title,
        note: task.note,
        actPomodoro: task.actPomodoro,
        estPomodoro: task.estPomodoro,
        isDone: task.done,
      }}
    />
  ));

  return <ul className={classes.tasksList}>{tasksList}</ul>;
};

export default React.memo(TasksList);
