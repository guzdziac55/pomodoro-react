import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import TasksMenu from "./TasksMenu";
import TaskForm from "./TaskItem/TaskForm";
import TasksButtonAdd from "./TasksButtonAdd";
import TasksList from "./TasksList";
import { useClickOutside } from "../../hooks/use-clickOutside";
import { selectTaskList } from "../../store/taskList-slice";

const Tasks = () => {
  const tasks = useSelector(selectTaskList);
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
      <TasksMenu tasks={tasks} />
      <TasksList tasks={tasks} />
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
