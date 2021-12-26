import React from "react";
import useActiveTask from "../../hooks/use-activeTask";
import classes from "./WorkingOn.module.css";
import { useSelector } from "react-redux";
import { selectPomodoroCount } from "../../store/timer-slice";

const WorkingOn = () => {
  const { activeTask } = useActiveTask();
  const pomodoroCnt = useSelector(selectPomodoroCount);

  return (
    <div className={classes.activeTask}>
      <span className={classes.pomodoroCount}>#{pomodoroCnt}</span>
      {activeTask && <span>{activeTask.title}</span>}
      {!activeTask && <span>Time to Focus!</span>}
    </div>
  );
};

export default WorkingOn;
