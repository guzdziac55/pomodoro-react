import React from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import { motion } from "framer-motion";

const variants = {
  hidden: false,
  show: {
    transition: { staggerChildren: 5, duration: 0.2 },
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
      variants={variants}
      initial="hidden"
      animate="show"
    >
      {tasksList}
    </motion.ul>
  );
};

export default React.memo(TasksList);
