import React from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import { useSelector } from "react-redux";

const TasksList = () => {
  console.log("tasklist JS KIEDY SIĘ ŁADUJE 1111111");

  // save this useSelector in state when rerender by adding creatSelector
  const tasks = useSelector((state) => state.tasksList.tasksList);
  // const notification = useSelector((state) => state.ui.notification);

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

  return (
    <ul className={classes["tasks-list"]}>
      {/* {notification && notification.isLoading && <Spinner />} */}
      {/* <Spinner /> */}
      {tasksList}
    </ul>
  );
};

export default React.memo(TasksList);
