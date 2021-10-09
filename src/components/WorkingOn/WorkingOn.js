import React from "react";
import useActiveTask from "../../hooks/use-activeTask";
import classes from "./WorkingOn.module.css";
import { useSelector } from "react-redux";

const WorkingOn = (props) => {
  const { activeTask } = useActiveTask();
  const pomodoroCnt = useSelector((state) => state.timer.pomodoroCnt);

  return (
    <div className={classes["working-on"]}>
      {/* //  można zrobić osobny komponent Info */}
      <span>#{pomodoroCnt}</span>
      {activeTask && <span>{activeTask.title}</span>}
      {!activeTask && <span>Time to Focus!</span>}
    </div>
  );
};

export default WorkingOn;

// if Active  true ==>
// jesli nie ma active to render timetowork
// jesli jest active to renderuj
// working on:
// props.task.Active ==> lub przekaż active przez context
// ctx.activeTask name

// !activeTask ? 'time to work:
