import React, { useEffect } from "react";

import Timer from "../components/Timer/Timer";
import WorkingOn from "../components/WorkingOn/WorkingOn";
import Tasks from "../components/Tasks/Tasks";
import FinishCalculate from "../components/FinishCalculate/FinishCalculate";
import classes from "./AppPage.module.css";
import ProgressBar from "./../components/ProgressBar/ProgressBar";
import TemplateList from "../components/TemplateList/TemplateList";
import KeyBinds from "../components/KeyBinds/KeyBinds";
import { useSelector } from "react-redux";

import { selectBindsEnable } from "../store/config-slice";
import { MdArrowCircleDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

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

const AppPage = () => {
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const bindsEnable = useSelector(selectBindsEnable);
  const isEmptyTasks =
    taskList.length === 0 || taskList === false ? true : false;

  const scrollToInfo = () => {};

  return (
    <>
      <div className={classes.appContainer}>
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

          {/* tips how to do it */}
          {/* on click scroll into page info */}
          {/*  create on click component from this  */}
          {/*  hide this div when passed away when scrolled */}
          {/*  trigger on scroll animations on pages */}

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
    </>
  );
};

export default AppPage;
