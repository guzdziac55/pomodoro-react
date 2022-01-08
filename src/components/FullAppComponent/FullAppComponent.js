import React from "react";
import classes from "./FullAppComponent.module.css";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { selectBindsEnable } from "../../store/config-slice";
import { MdArrowCircleDown } from "react-icons/md";

import Timer from "../Timer/Timer";
import WorkingOn from "../WorkingOn/WorkingOn";
import Tasks from "../Tasks/Tasks";
import FinishCalculate from "../FinishCalculate/FinishCalculate";
import ProgressBar from "./../ProgressBar/ProgressBar";
import TemplateList from "../TemplateList/TemplateList";
import KeyBinds from "../KeyBinds/KeyBinds";

const templateVariants = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visable: {
    x: 0,
    opacity: [0.2, 1],
    transition: {
      type: "spring",
      mass: "0.4",
      duration: 2,
    },
  },
};

const bindsVariants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visable: {
    x: 0,
    opacity: [0.2, 1],
    transition: {
      type: "spring",
      mass: "0.4",
      duration: 2,
    },
  },
};

const scrollVariants = {
  hidden: {
    opacity: 0,
  },
  visable: {
    opacity: [1, 0.5, 1],
    scale: [1, 1.03, 1],
    transition: { type: "yoyo", repeat: "Infinity" },
  },
};

const FullAppComponent = () => {
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const bindsEnable = useSelector(selectBindsEnable);
  const isEmptyTasks =
    taskList.length === 0 || taskList === false ? true : false;

  const scrollToInfo = () => {};

  return (
    <div className={classes.container}>
      <motion.div
        className={classes.templateApp}
        variants={templateVariants}
        initial="hidden"
        animate="visable"
      >
        <TemplateList />
      </motion.div>

      <div className={classes.pomodoroApp}>
        <ProgressBar></ProgressBar>
        <Timer></Timer>
        <WorkingOn />
        <Tasks />
        {!isEmptyTasks && <FinishCalculate />}
        {isEmptyTasks && (
          <motion.div
            variants={scrollVariants}
            initial="hidden"
            animate="visable"
            className={classes.scrollTo}
          >
            <MdArrowCircleDown
              onClick={scrollToInfo}
              className={classes.scrollToIcon}
            />
          </motion.div>
        )}
      </div>

      <motion.div
        className={classes.keyBindApp}
        variants={bindsVariants}
        initial="hidden"
        animate="visable"
      >
        {bindsEnable && <KeyBinds />}
      </motion.div>
    </div>
  );
};

export default FullAppComponent;
