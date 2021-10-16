import React from "react";
import { Fragment } from "react";
import Timer from "../components/Timer/Timer";
import WorkingOn from "../components/WorkingOn/WorkingOn";
import Tasks from "../components/Tasks/Tasks";
import Notifications from "../components/UI/Notifications";
import FinishCalculate from "../components/FinishCalculate/FinishCalculate";
import { useSelector } from "react-redux";
import classes from "./PomodoroApp.module.css";

const PomodoroApp = () => {
  const notification = useSelector((state) => state.ui.notification);
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const isEmptyTasks =
    taskList.length === 0 || taskList === false ? true : false;

  return (
    // <Fragment>
    <div className={classes.pomodoroApp}>
      <Timer></Timer>
      <WorkingOn />
      <Tasks />
      {!isEmptyTasks && <FinishCalculate />}
      {notification && (
        <Notifications
          status={notification.status}
          title={notification.title}
          error={notification.error}
        />
      )}
    </div>

    // </Fragment>
  );
};

export default PomodoroApp;
