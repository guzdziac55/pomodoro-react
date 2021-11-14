import React from "react";
import Timer from "../components/Timer/Timer";
import WorkingOn from "../components/WorkingOn/WorkingOn";
import Tasks from "../components/Tasks/Tasks";
import FinishCalculate from "../components/FinishCalculate/FinishCalculate";
import { useSelector } from "react-redux";
import classes from "./PomodoroApp.module.css";

const PomodoroApp = () => {
  // const notification = useSelector((state) => state.ui.notification);

  const taskList = useSelector((state) => state.tasksList.tasksList);
  const isEmptyTasks =
    taskList.length === 0 || taskList === false ? true : false;

  return (
    <div className={classes.pomodoroApp}>
      <Timer></Timer>
      <WorkingOn />
      <Tasks />
      {!isEmptyTasks && <FinishCalculate />}
    </div>
  );
};

export default PomodoroApp;
{
  /* put notification here */
}

// {/* {notification && (
//   <Notifications
//     status={notification.status} // state from ui Slice
//     title={notification.title} // state from ui Slice
//     error={notification.error} // state from ui Slice
//     isLoading={notification.isLoading}
//   />
