import React from "react";
import TasksMenu from "./TasksMenu";
import classes from "./Tasks.module.css";
import TasksButtonAdd from "./TasksButtonAdd";
import IconPlus from "../UI/icons/IconPlus";
import TasksList from "./TasksList";
import TaskForm from "./TaskItem/TaskForm";

const Tasks = (props) => {
  return (
    <>
      <TasksMenu />
      <TasksList />
      <TasksButtonAdd title={"Add Task"} icon={<IconPlus />} />
      <TaskForm />
    </>
  );
};

export default Tasks;
