import React from "react";
import classes from "./TasksMenu.module.css";
import TasksButtonMenu from "./TasksButtonMenu";
import IconLogin from "../Layout/IconLogin";
const TasksMenu = () => {
  return (
    <section className={classes["tasks-menu"]}>
      <span>Tasks</span>
      <TasksButtonMenu icon={<IconLogin />} />
    </section>
  );
};

export default TasksMenu;
