import React from "react";
import classes from "./TasksList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectTaskList } from "../../store/taskList-slice";

const variants = {
  hidden: false,
  show: {
    transition: { staggerChildren: 5, duration: 0.2 },
  },
};

const TasksList = () => {
  const tasks = useSelector(selectTaskList);

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
