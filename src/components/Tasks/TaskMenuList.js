import React, { useContext } from "react";
import TaskListContext from "../../store/taskList-context";
import classes from "./TaskMenuList.module.css";

const TaskMenuList = (props) => {
  // menu options function
  // delate all tasks ctx tasklidk   ctx action dellateALL

  const tasksCtx = useContext(TaskListContext);

  const handleDeleteAllTasks = () => {
    tasksCtx.deleteAll();
  };

  const handleDeleteFinishedTasks = () => {
    tasksCtx.deleteFinished();
  };

  const handleDeleteDoneTasks = () => {
    tasksCtx.deleteDone();
  };

  return (
    <div>
      <ul>
        {/* icon // li // Option 1 // functions delate all / done / finished */}
        <li onClick={handleDeleteAllTasks}>DELETE_ALL </li>
        <li onClick={handleDeleteFinishedTasks}>DELETE_FINISHED </li>
        <li onClick={handleDeleteDoneTasks}>DELETE_DONE </li>
      </ul>
    </div>
  );
};

export default TaskMenuList;
