import React from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import { useSelector } from "react-redux";
import { selectTaskList } from "../../store/taskList-slice";

const TasksList = () => {
  const tasks = useSelector(selectTaskList);

  const tasksList = tasks.map((task) => (
    <TaskItem
      key={task.id}
      taskData={{
        id: task.id,
        title: task.title,
        actPomodoro: task.actPomodoro,
        estPomodoro: task.estPomodoro,
        isDone: task.done,
      }}
    />
  ));

  return <ul className={classes.tasksList}>{tasksList}</ul>;
};

export default React.memo(TasksList);

// {
//   // const notification = useSelector((state) => state.ui.notification);
//   /* {notification && notification.isLoading && <Spinner />} */
// }
// {
//   /* <Spinner /> */
// }
