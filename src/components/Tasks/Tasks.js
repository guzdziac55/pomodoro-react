import React, { useState, useContext, useRef, useEffect } from "react";
import TasksMenu from "./TasksMenu";
import TaskForm from "./TaskItem/TaskForm";
import TasksButtonAdd from "./TasksButtonAdd";
import IconPlus from "../UI/icons/IconPlus";
import TasksList from "./TasksList";

const Tasks = () => {
  const newTaskForm = useRef();

  const [showForm, setShowForm] = useState(false);
  const toggleFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  useEffect(() => {
    if (showForm) newTaskForm.current.scrollIntoView();
  }, [showForm]);

  return (
    <>
      <TasksMenu />
      <TasksList />
      {!showForm && (
        <TasksButtonAdd
          toggleForm={toggleFormHandler}
          title={"Add Task"}
          icon={<IconPlus />}
        />
      )}
      {showForm && (
        <TaskForm ref={newTaskForm} toggleForm={toggleFormHandler} />
      )}
    </>
  );
};

export default Tasks;
