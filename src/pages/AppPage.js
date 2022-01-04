import React from "react";
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

const AppPage = () => {
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const bindsEnable = useSelector(selectBindsEnable);

  const isEmptyTasks =
    taskList.length === 0 || taskList === false ? true : false;

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
          <AnimatePresence exitBeforeEnter>
            {/* our animation presence conditional */}
            {!isEmptyTasks && <FinishCalculate />}
          </AnimatePresence>
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
