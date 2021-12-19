import React from "react";
import Timer from "../components/Timer/Timer";
import WorkingOn from "../components/WorkingOn/WorkingOn";
import Tasks from "../components/Tasks/Tasks";
import FinishCalculate from "../components/FinishCalculate/FinishCalculate";
import classes from "./PomodoroApp.module.css";
import ProgressBar from "./../components/ProgressBar/ProgressBar";
import TemplateList from "../components/TemplateList/TemplateList";
import KeyBinds from "../components/KeyBinds/KeyBinds";

import { useSelector } from "react-redux";
import { selectBindsEnable } from "../store/config-slice";
const PomodoroApp = () => {
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const bindsEnable = useSelector(selectBindsEnable);

  const isEmptyTasks =
    taskList.length === 0 || taskList === false ? true : false;
  return (
    <>
      <div className={classes.appContainer}>
        <div className={classes.templateApp}>
          <TemplateList />
        </div>

        <div className={classes.pomodoroApp}>
          <ProgressBar></ProgressBar>
          <Timer></Timer>
          <WorkingOn />
          <Tasks />
          {!isEmptyTasks && <FinishCalculate />}
        </div>
        <div className={classes.keyBindApp}>{bindsEnable && <KeyBinds />}</div>
      </div>
    </>
  );
};

export default PomodoroApp;
