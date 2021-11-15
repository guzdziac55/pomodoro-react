import React, { useState, useCallback, useEffect, useRef } from "react";
import TaskForm from "./TaskForm";
import classes from "../TaskItem/TaskItem.module.css";
import { MdDoneOutline, MdEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveTask,
  setActiveTask,
  toggleDoneTask,
} from "../../../store/taskList-slice";
const TaskItem = ({
  taskData,
  taskData: { id, title, actPomodoro, estPomodoro, isDone },
}) => {
  const dispatch = useDispatch();
  const formScrollRef = useRef();

  const activeId = useSelector(selectActiveTask);
  const [showEditForm, setShowEditForm] = useState(false);

  // custom hook ?
  useEffect(() => {
    if (showEditForm) {
      console.log("do poprawy");
      // formScrollRef.current.scrollIntoView({
      //   behavior: "smooth",
      //   // block: "end",
    }
    // });
  }, [showEditForm]);

  //check that callback is usefull here ?
  const toggleEditFormHandler = useCallback(() => {
    setShowEditForm((prevState) => setShowEditForm(!prevState));
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
      {showEditForm && (
        <TaskForm
          ref={formScrollRef}
          onToggleForm={toggleEditFormHandler}
          taskData={taskData}
          editMode={true}
        ></TaskForm>
      )}
      {/* Show Task */}
      {!showEditForm && (
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

          {/*    */}
          <span onClick={toggleEditFormHandler} className={classes.icon}>
            <MdEditNote className={classes.icon} />
          </span>
        </li>
      )}
    </>
  );
};

export default React.memo(TaskItem);
