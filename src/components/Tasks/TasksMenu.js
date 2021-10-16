import React, { useState } from "react";
import classes from "./TasksMenu.module.css";
import IconLogin from "../Layout/IconLogin";
import { taskListActions } from "../../store/taskList-slice";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

const TasksMenu = () => {
  const dispatch = useDispatch();
  const [showTaskMenu, setShowTaskMenu] = useState(true);

  TasksMenu.handleClickOutside = () => setShowTaskMenu(false);

  const toggleTaskMenu = () => {
    setShowTaskMenu((state) => !state);
  };

  const closeTaskMenu = () => {
    if (showTaskMenu) setShowTaskMenu(false);
  };

  const handleDeleteAllTasks = () => {
    dispatch(taskListActions.deleteAllTasks());
    setShowTaskMenu(false);
  };

  const handleDeleteFinishedTasks = () => {
    dispatch(taskListActions.deleteFinishedTasks());
    setShowTaskMenu(false);
  };

  const handleDeleteDoneTasks = () => {
    dispatch(taskListActions.deleteDoneTasks());
    setShowTaskMenu(false);
  };

  return (
    <section className={classes["tasks-menu"]}>
      <span>Tasks</span>
      {/* // to może być osobnym komponentem  */}
      <OutsideClickHandler onOutsideClick={closeTaskMenu}>
        <div className={classes.options}>
          <button onClick={toggleTaskMenu} className={classes.button}>
            <span className={classes.icon}>
              {/*  add custom icon with all styles */}
              <IconLogin />
            </span>
          </button>
          {showTaskMenu && (
            <ul className={classes.optionsList}>
              <li className={classes.listItem} onClick={handleDeleteAllTasks}>
                <IconLogin />
                DELETE_ALL
              </li>
              <li onClick={handleDeleteFinishedTasks}>DELETE_FINISHED </li>
              <li onClick={handleDeleteDoneTasks}>DELETE_DONE </li>
            </ul>

            // custom component List Item = atr props.children
            // robiłby za wrappera W środku dojebać iconLogin + span
          )}
        </div>
      </OutsideClickHandler>
    </section>
  );
};

export default TasksMenu;
