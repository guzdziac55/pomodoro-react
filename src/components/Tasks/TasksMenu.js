import React, { useState } from "react";
import classes from "./TasksMenu.module.css";
import { taskListActions } from "../../store/taskList-slice";
import { useDispatch } from "react-redux";
import {
  MdOutlineAutoDelete,
  MdDeleteForever, // delete finished
  MdDoneAll, // delete done
  MdDeleteSweep, // delete all
  MdSave,
} from "react-icons/md";

import OutsideClickHandler from "react-outside-click-handler";

const TasksMenu = () => {
  const dispatch = useDispatch();
  const [showTaskMenu, setShowTaskMenu] = useState(false);

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
    <section className={classes.tasksMenu}>
      <span>Tasks</span>
      <OutsideClickHandler onOutsideClick={closeTaskMenu}>
        <div className={classes.options}>
          <button className={classes.button}>
            <MdOutlineAutoDelete
              onClick={toggleTaskMenu}
              className={classes.icon}
            />
          </button>

          {showTaskMenu && (
            <ul className={classes.optionsList}>
              <li
                className={classes.listItem}
                onClick={handleDeleteFinishedTasks}
              >
                <MdDeleteSweep className={classes.iconSmall} /> delete finished
              </li>
              <li className={classes.listItem} onClick={handleDeleteDoneTasks}>
                <MdDoneAll className={classes.iconSmall} />
                delete done
              </li>
              <li className={classes.listItem} onClick={handleDeleteDoneTasks}>
                <MdSave className={classes.iconSmall} />
                save as template
              </li>
              <hr className={classes.break}></hr>
              <li className={classes.listItem} onClick={handleDeleteAllTasks}>
                <MdDeleteForever className={classes.iconSmall} />
                delete all
              </li>
            </ul>
          )}
        </div>
      </OutsideClickHandler>
    </section>
  );
};

export default TasksMenu;
