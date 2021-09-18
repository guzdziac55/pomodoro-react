import React, { useContext } from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import TaskListContext from "../../store/taskList-context";

const TasksList = () => {
  // po updacie Tasklisty to się wyrenderuje bo zmienił się state
  const tasksCtx = useContext(TaskListContext);
  console.log(tasksCtx);
  // jeśli empty array to wyświetl inny TODOWORKk title
  // const hasItems = cartCtx.items.length > 0;
  const tasksList = tasksCtx.tasks.map((task) => (
    <TaskItem
      active={task.id === tasksCtx.active ? true : false}
      key={task.id}
      taskData={{
        id: task.id,
        taskTitle: task.taskTitle,
        taskDone: task.taskDone,
        taskDoneNumber: task.taskDoneNumber,
        taskToDoNumber: task.taskToDoNumber,
      }}

      // id={task.id}
      // title={task.title}
      // done={task.done}
      // doneNum={task.doneNum}
      // pomodoro={task.pomodoro}
    />
  ));
  return <ul className={classes["tasks-list"]}>{tasksList}</ul>;
};

export default TasksList;
