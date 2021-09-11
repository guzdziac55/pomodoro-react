import React, { useState, useContext } from "react";
import TasksMenu from "./TasksMenu";
import classes from "./Tasks.module.css";
import TasksButtonAdd from "./TasksButtonAdd";
import IconPlus from "../UI/icons/IconPlus";
import TasksList from "./TasksList";
import TaskForm from "./TaskItem/TaskForm";
import TaskListContext from "../../store/taskList-context";

const Tasks = (props) => {
  const tasksCtx = useContext(TaskListContext);
  const [showForm, setShowForm] = useState(false);

  const handlerShowForm = () => {
    setShowForm(!showForm);
  };

  const addNewTaskHandler = (taskName, pomodoro) => {
    const id = Math.floor(new Date().valueOf() * Math.random());
    tasksCtx.addTask({
      id: id,
      title: taskName,
      pomodoro: pomodoro,
    });
  };

  return (
    <>
      <TasksMenu />
      <TasksList />
      <TasksButtonAdd
        onShowForm={handlerShowForm}
        title={"Add Task"}
        icon={<IconPlus />}
      />
      {showForm && <TaskForm onAddNewTask={addNewTaskHandler} />}
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
