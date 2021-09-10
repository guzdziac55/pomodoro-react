import React from "react";
import classes from "./WorkingOn.module.css";

const WorkingOn = (props) => {
  return (
    <div className={classes["working - on"]}>
      <span>Time to Work!</span>;<span>Working on!</span>;
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
