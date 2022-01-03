import React from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import { motion } from "framer-motion";

const variants2 = {
  visable: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const TasksList = ({ tasks }) => {
  const tasksList = tasks.map((task) => (
    <TaskItem
      key={task.id}
      taskData={{
        id: task.id,
        title: task.title,
        note: task.note,
        actPomodoro: task.actPomodoro,
        estPomodoro: task.estPomodoro,
        isDone: task.done,
      }}
    />
  ));

  return (
    <motion.ul
      className={classes.tasksList}
      variants={variants2}
      initial="hidden"
      animate="visable"
    >
      {tasksList}
    </motion.ul>
  );
};

export default React.memo(TasksList);
