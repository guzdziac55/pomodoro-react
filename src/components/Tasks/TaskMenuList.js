import React from "react";
import classes from "./TaskMenuList.module.css";
import { useDispatch } from "react-redux";
import { taskListActions } from "../../store/taskList-slice";

const TaskMenuList = (props) => {
  const dispatch = useDispatch();

  const handleDeleteAllTasks = () => {
    console.log("delete al");
    dispatch(taskListActions.deleteAllTasks());
  };

  const handleDeleteFinishedTasks = () => {
    console.log("finished delete");
    dispatch(taskListActions.deleteFinishedTasks());
  };

  const handleDeleteDoneTasks = () => {
    dispatch(taskListActions.deleteDoneTasks());
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
