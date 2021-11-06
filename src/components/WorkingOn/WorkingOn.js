import React from "react";
import useActiveTask from "../../hooks/use-activeTask";
import classes from "./WorkingOn.module.css";
import { useSelector } from "react-redux";

const WorkingOn = () => {
  const { activeTask } = useActiveTask();
  const pomodoroCnt = useSelector((state) => state.timer.pomodoroCnt);

  return (
    <div className={classes.activeTask}>
      <span className={classes.pomodoroCount}>#{pomodoroCnt}</span>
      {/*  jeśli jest lub nie ma go na liście */}
      {activeTask && <span>{activeTask.title}</span>}
      {!activeTask && <span>Time to Focus!</span>}
    </div>
  );
};

export default WorkingOn;
