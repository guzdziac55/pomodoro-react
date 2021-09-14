import React, { useState } from "react";
import classes from "./TasksMenu.module.css";
import TasksButtonMenu from "./TasksButtonMenu";
import IconLogin from "../Layout/IconLogin";
import TaskMenuList from "./TaskMenuList";

const TasksMenu = () => {
  const [showTaskMenu, setShowTaskMenu] = useState(true);

  const handleShowTaskMenu = () => {
    setShowTaskMenu((state) => !state);
  };

  return (
    <section className={classes["tasks-menu"]}>
      <span>Tasks</span>
      <TasksButtonMenu
        onHandleTaskMenu={handleShowTaskMenu}
        icon={<IconLogin />}
      />
      {showTaskMenu && <TaskMenuList />}
    </section>
  );
};

export default TasksMenu;
