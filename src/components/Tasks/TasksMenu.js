import React, { useState } from "react";
import classes from "./TasksMenu.module.css";
import { useDispatch } from "react-redux";
import {
  MdOutlineAutoDelete,
  MdDeleteForever,
  MdDoneAll,
  MdDeleteSweep,
  MdSave,
} from "react-icons/md";

import OutsideClickHandler from "react-outside-click-handler";
import {
  deleteAllTasks,
  deleteFinishedTasks,
  deleteDoneTasks,
} from "../../store/taskList-slice";

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

  // context menu actions
  const onClickDeleteAllTasks = () => {
    dispatch(deleteAllTasks());
    setShowTaskMenu(false);
  };

  const onClickDeleteFinishedTasks = () => {
    dispatch(deleteFinishedTasks());
    setShowTaskMenu(false);
  };

  const onClickDeleteDoneTasks = () => {
    dispatch(deleteDoneTasks());
    setShowTaskMenu(false);
  };

  return (
    <section className={classes.tasksMenu}>
      <span>Tasks</span>
      {/* outside click */}
      <OutsideClickHandler onOutsideClick={closeTaskMenu}>
        <div className={classes.options}>
          <button className={classes.button} onClick={toggleTaskMenu}>
            <MdOutlineAutoDelete className={classes.icon} />
          </button>

          {/* make another /  different context Menu component !  */}
          {showTaskMenu && (
            <ul className={classes.optionsList}>
              <li
                className={classes.listItem}
                onClick={onClickDeleteFinishedTasks}
              >
                <MdDeleteSweep className={classes.iconSmall} /> delete finished
              </li>
              <li className={classes.listItem} onClick={onClickDeleteDoneTasks}>
                <MdDoneAll className={classes.iconSmall} />
                delete done
              </li>
              <li className={classes.listItem} onClick={onClickDeleteDoneTasks}>
                <MdSave className={classes.iconSmall} />
                save as template
              </li>
              <hr className={classes.break}></hr>
              <li className={classes.listItem} onClick={onClickDeleteAllTasks}>
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
