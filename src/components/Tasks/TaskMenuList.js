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

  const handleDeleteDoneTasks = () => {
    tasksCtx.deleteDone();
  };

  const handleDeleteFinishedTasks = () => {
    tasksCtx.deleteFinished();
  };

  return (
    <div>
      <ul>
        {/* icon // li // Option 1 // functions delate all / done / finished */}
        <li onClick={handleDeleteAllTasks}>menu option 1 </li>
        <li>menu option 2 </li>
        <li>menu option 3 </li>
      </ul>
    </div>
  );
};

export default TaskMenuList;
