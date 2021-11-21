import React, { useState, useRef, useEffect } from "react";
import TasksMenu from "./TasksMenu";
import TaskForm from "./TaskItem/TaskForm";
import TasksButtonAdd from "./TasksButtonAdd";

import TasksList from "./TasksList";
import { useClickOutside } from "../../hooks/use-clickOutside";

const Tasks = () => {
  const [openNewTask, setNewTask] = useState(false);
  const newTaskRef = useRef();

  const toogleNewTaskForm = () => {
    setNewTask((prevState) => setNewTask(!prevState));
  };

  useClickOutside(newTaskRef, () => {
    if (openNewTask) setNewTask(false);
  });

  return (
    <>
      <TasksMenu />
      <TasksList />
      {!openNewTask && (
        <TasksButtonAdd onToggleForm={toogleNewTaskForm}>
          Add Task
        </TasksButtonAdd>
      )}

      {openNewTask && (
        <TaskForm onRef={newTaskRef} onToggleForm={toogleNewTaskForm} />
      )}
    </>
  );
};

export default Tasks;
