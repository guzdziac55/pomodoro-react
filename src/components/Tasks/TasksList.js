import React from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";

const DUMMY_TASKS = [
  {
    id: "m1",
    title: "Read Book 1",
    description: "Finest fish and veggies",
  },
  {
    id: "m2",
    title: "Read Book 2",
    description: "A german specialty!",
  },
  {
    id: "m3",
    title: "Read Book 3",
    description: "American, raw, meaty",
  },
  {
    id: "m4",
    title: "Read Book 4",
    description: "Healthy...and green...",
  },
];

const TasksList = (props) => {
  const tasksList = DUMMY_TASKS.map((task) => (
    <TaskItem key={task.id} id={task.id} title={task.title} />
  ));

  return <ul className={classes["tasks-list"]}>{tasksList}</ul>;
};

export default TasksList;
