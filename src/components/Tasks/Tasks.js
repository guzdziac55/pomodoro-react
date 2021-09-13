import React, { useState, useContext, useRef, useEffect } from "react";
import TasksMenu from "./TasksMenu";

import TasksButtonAdd from "./TasksButtonAdd";
import IconPlus from "../UI/icons/IconPlus";
import TasksList from "./TasksList";
import TaskForm from "./TaskItem/TaskForm";

const Tasks = (props) => {
  // const tasksCtx = useContext(TaskListContext);
  const [showForm, setShowForm] = useState();
  const formNewTaskRed = useRef();

  const handlerExecuteScroll = () => {
    formNewTaskRed.current.scrollIntoView();
  };

  useEffect(() => {
    if (showForm) handlerExecuteScroll();
  }, [showForm]);

  const handlerShowForm = () => {
    setShowForm(true);
  };

  const handlerCancelForm = () => {
    setShowForm(false);
  };

  // const addNewTaskHandler = (taskName, pomodoro) => {
  //   const id = Math.floor(new Date().valueOf() * Math.random());
  //   tasksCtx.addTask({
  //     id: id,
  //     title: taskName,
  //     pomodoro: pomodoro,
  //   }); // spakowane w obiekt
  // };

  return (
    <>
      <TasksMenu />
      <TasksList />
      {!showForm && (
        <TasksButtonAdd
          onShowForm={handlerShowForm}
          title={"Add Task"}
          icon={<IconPlus />}
        />
      )}

      {showForm && (
        <TaskForm
          editMode={false}
          ref={formNewTaskRed}
          onCancel={handlerCancelForm}
        />
      )}
    </>
  );
};

export default Tasks;

// operations on TaskList
// dispatch actions Task : delate, edit , addNew, toggleActiveTask

// operations on CurrentTime
// set from tab select ( 3 types )
// start
// stop // cancel/reset
// end => when current time === 0 < 0 => activetask update
