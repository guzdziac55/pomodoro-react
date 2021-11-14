import React, { useState, useCallback, useEffect, useRef } from "react";
import classes from "../TaskItem/TaskItem.module.css";
import { MdDoneOutline, MdEditNote } from "react-icons/md";

import TaskForm from "./TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { taskListActions } from "../../../store/taskList-slice";

const TaskItem = (props) => {
  const dispatch = useDispatch();
  const formScrollRef = useRef();

  // problem w każdym tego używam
  const { id, title, actPomodoro, estPomodoro, isDone } = props.task;
  const activeId = useSelector((state) => state.tasksList.activeTask);

  // to jest w każdym elemencie listy ! => może powinno być jedno na całą listę
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (showEditForm)
      formScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, [showEditForm]);

  const toggleEditFormHandler = useCallback(() => {
    setShowEditForm((prevState) => setShowEditForm(!prevState));
  });

  const setActiveTask = useCallback((e) => {
    if (e.target === e.currentTarget || e.target.parentNode === e.currentTarget)
      dispatch(taskListActions.setActiveTask(id));
  });

  const handleToggleDoneTask = useCallback(() => {
    dispatch(taskListActions.toggleDoneTask(id));
  });

  // is Li item Active ?
  const itemIsActiveClass = id === activeId ? classes.active : "";
  const titleDoneClass = isDone ? classes.done : "";
  const iconDoneClass = isDone ? classes.done : "";

  return (
    <>
      {/* Edit Task */}
      {showEditForm && (
        <TaskForm
          ref={formScrollRef}
          toggleForm={toggleEditFormHandler}
          taskData={{ id, title, estPomodoro }}
          editMode={true}
        ></TaskForm>
      )}
      {/* Show Task */}
      {!showEditForm && (
        <li
          className={`${classes.task} ${itemIsActiveClass}`}
          onClick={setActiveTask}
        >
          <span onClick={handleToggleDoneTask}>
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
