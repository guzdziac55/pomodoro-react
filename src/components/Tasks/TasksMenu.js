import React from "react";
import classes from "./TasksMenu.module.css";
import TasksButtonMenu from "./TasksButtonMenu";
import IconLogin from "../Layout/IconLogin";
const TasksMenu = () => {
  return (
    <section className={classes["tasks-menu"]}>
      <span>Tasks</span>
      <TasksButtonMenu icon={<IconLogin />} />
      {/* <span className={classes.break}></span> */}
    </section>
  );
};

export default TasksMenu;
