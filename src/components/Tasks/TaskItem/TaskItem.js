import React, { useState, useCallback, useEffect, useRef } from "react";
import TaskForm from "./TaskForm";
import classes from "../TaskItem/TaskItem.module.css";
import { MdDoneOutline, MdEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useClickOutside } from "../../../hooks/use-clickOutside";
import {
  selectActiveTask,
  setActiveTask,
  toggleDoneTask,
} from "../../../store/taskList-slice";
const TaskItem = ({
  taskData,
  taskData: { id, title, note, actPomodoro, estPomodoro, isDone },
}) => {
  const dispatch = useDispatch();
  const activeId = useSelector(selectActiveTask);
  const [openEdit, setOpenEdit] = useState(false);
  const editRef = useRef();

  // close when open // when not click on ref !
  useClickOutside(editRef, () => {
    if (openEdit) setOpenEdit(false);
  });

  // when cancel and when submit
  const toggleEditFormHandler = useCallback(() => {
    setOpenEdit((prevState) => setOpenEdit(!prevState));
  });

  const onClickSetActiveTask = useCallback((e) => {
    if (e.target === e.currentTarget || e.target.parentNode === e.currentTarget)
      dispatch(setActiveTask(id));
  });

  const onClickToggleDoneTask = useCallback(() => {
    dispatch(toggleDoneTask(id));
  });

  // styles done / active
  const itemIsActiveClass = id === activeId ? classes.active : "";
  const titleDoneClass = isDone ? classes.done : "";
  const iconDoneClass = isDone ? classes.done : "";

  return (
    <>
      {/* Edit Task */}
      {openEdit && (
        <TaskForm
          // ref={formScrollRef}
          onRef={editRef}
          onToggleForm={toggleEditFormHandler}
          taskData={taskData}
          editMode={true}
        ></TaskForm>
      )}
      {/* Show Task */}
      {!openEdit && (
        <li
          className={`${classes.task} ${itemIsActiveClass}`}
          onClick={onClickSetActiveTask}
        >
          <span onClick={onClickToggleDoneTask}>
            <MdDoneOutline className={`${classes.icon} ${iconDoneClass}`} />
          </span>

          <span className={`${classes.title} ${titleDoneClass}`}>{title}</span>

          <div className={classes.pomodoroInfo}>
            <span className={classes.pomodoroEst}>{actPomodoro}</span>
            <span>/</span>
            <span className={classes.pomodoroAct}>{estPomodoro}</span>
          </div>

          <span onClick={toggleEditFormHandler}>
            <MdEditNote className={classes.icon} />
          </span>
          <div className={classes.lineBreak}></div>
          {note && <p className={classes.noteItem}>{note}</p>}
        </li>
      )}
    </>
  );
};

export default React.memo(TaskItem);
