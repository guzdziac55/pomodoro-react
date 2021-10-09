import React, { useState, useContext, useRef, useEffect } from "react";
import TasksMenu from "./TasksMenu";
import TaskForm from "./TaskItem/TaskForm";
import TasksButtonAdd from "./TasksButtonAdd";
import IconPlus from "../UI/icons/IconPlus";
import TasksList from "./TasksList";

const Tasks = () => {
  const formScrollRef = useRef();

  const [showForm, setShowForm] = useState(false);

  const toggleFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

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
        <TasksButtonAdd
          toggleForm={toggleFormHandler}
          title={"Add Task"}
          icon={<IconPlus />}
        />
      )}
      {showForm && (
        <TaskForm ref={formScrollRef} toggleForm={toggleFormHandler} />
      )}
    </>
  );
};

export default Tasks;
