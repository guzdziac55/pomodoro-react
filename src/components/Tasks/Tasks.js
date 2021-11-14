import React, { useState, useRef, useEffect } from "react";
import TasksMenu from "./TasksMenu";
import TaskForm from "./TaskItem/TaskForm";
import TasksButtonAdd from "./TasksButtonAdd";

import TasksList from "./TasksList";

const Tasks = () => {
  const formScrollRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const toggleFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  // check this
  useEffect(() => {
    if (showForm)
      formScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
  }, [showForm]);

  return (
    <>
      <TasksMenu />
      <TasksList />
      {!showForm && (
        <TasksButtonAdd onToggleForm={toggleFormHandler}>
          Add Task
        </TasksButtonAdd>
      )}

      {showForm && (
        <TaskForm ref={formScrollRef} onToggleForm={toggleFormHandler} />
      )}
    </>
  );
};

export default Tasks;
