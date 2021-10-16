import React, { useState, useEffect, useRef } from "react";
import classes from "../TaskItem/TaskItem.module.css";
import IconPlus from "../../UI/icons/IconPlus";

import TaskForm from "./TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { taskListActions } from "../../../store/taskList-slice";

const TaskItem = (props) => {
  const dispatch = useDispatch();
  const formScrollRef = useRef(); // to też trzeba dać do hooka ze Scroolsmooth

  const { id, title, actPomodoro, estPomodoro, isDone } = props.task;

  const activeId = useSelector((state) => state.tasksList.activeTask);

  const [showEditForm, setShowEditForm] = useState(false);
  //toggle hook ?

  useEffect(() => {
    // change to reusable hook ==>> > > >
    // (2 args targetRef + StateHandleTrue )
    if (showEditForm)
      formScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, [showEditForm]);

  const toggleEditFormHandler = () => {
    setShowEditForm((prevState) => setShowEditForm(!prevState));
  };

  const setActiveTask = (e) => {
    if (e.target === e.currentTarget)
      dispatch(taskListActions.setActiveTask(id));
  };

  const handleToggleDoneTask = () => {
    dispatch(taskListActions.toggleDoneTask(id));
  };

  // Conditional class style:
  const activeClass = id === activeId ? classes.active : "";
  const doneClass = isDone ? classes.done : "";

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
          className={`${classes.task} ${activeClass}`}
          onClick={setActiveTask}
        >
          <span onClick={handleToggleDoneTask} className={classes.icon}>
            {/* solo Icons conditional Rendering Done // undone */}
            {/* ADD : DONE ICON // TOGGLEDONEICON */}
            <IconPlus className={classes.icon} />
          </span>

          <span className={`${classes.title} ${doneClass}`}>{title}</span>
          {/* TASK-INFO NUMBERS */}
          {/* est / act */}
          <div className={classes.pomodoroInfo}>
            <span className={classes.pomodoroEst}>{actPomodoro}</span>
            <span>/</span>
            <span className={classes.pomodoroAct}>{estPomodoro}</span>
          </div>

          {/* ICON SHOW EDIT FORM */}
          <span onClick={toggleEditFormHandler} className={classes.icon}>
            <IconPlus />
          </span>
        </li>
      )}
    </>
  );
};

export default TaskItem;

// const showIds = () => {
//   console.log(props.id);
// };

// CTX.EDITtASKITEM <== DOKONCZYC
// put values into

// showIds();

//  TO JEST TASK ITEM
// TYCH TASK ITEMÓW JEST TYLE ILE TASK ITEMOW Z STATE
// KAZDY Z NICH JEST INNYM SAMODZIELNYM KOMPONENTEM
// KAZDY MA WEW TE FUNKCJE CO TUTAJ

// E TARGET !== CURRENTtARGET
// ZROB SETSHOEDIT(FALSE)

// editingData={{
//   // addItem ctx handler dać tu albo przekazać z handlea
//   // zmienszy to długość łańcucha prosppsow
//   id: props.id,
//   taskTitle: props.title,
//   taskDone: props.taskDone

//   pomodoro: props.pomodoro,
// }}
