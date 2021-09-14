import React, { useContext } from "react";
import TaskListContext from "../../store/taskList-context";
import classes from "./WorkingOn.module.css";

const WorkingOn = (props) => {
  const { list } = useContext(TaskListContext);
  const { menu } = useContext(TaskListContext);
  console.log(list);
  console.log(menu);
  // const hasTasks = taskListContext.tasks.length > 0;
  // console.log(taskListContext);
  return (
    <div className={classes["working-on"]}>
      <span>Time to Work!</span>
      {/* {hasTasks && <span>Select task to DO!</span>} */}
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
