import React from "react";
import classes from "./FinishCalculate.module.css";
import { useSelector } from "react-redux";
import { selectPomodoroOptionTime } from "../../store/config-slice";
import {
  selectNumberDonePomodoro,
  selectNumberToDoTasks,
} from "../../store/taskList-slice";
import { useFinishTime } from "../../hooks/use-finishTime";
import { createSelector } from "reselect";

//in Minutes
const selectPomTimeToAdd = createSelector(
  selectPomodoroOptionTime,
  selectNumberToDoTasks,
  (pomodoroOption, tasksNumber) => pomodoroOption * tasksNumber
);

// TO DO HERE:
// check later with normal function => sprawdzić czy spowoduje ponowne wyrenderowanie
//  komponentu z nornamlną funkcją

const FinishCalculate = () => {
  const toDoTasks = useSelector(selectNumberToDoTasks);
  const donePomodoro = useSelector(selectNumberDonePomodoro);
  const timeToAdd = useSelector(selectPomTimeToAdd);
  const { finishTime } = useFinishTime(timeToAdd);

  return (
    <div className={classes.statistics}>
      <div className={classes["statistics-details"]}>
        <span className={classes.label}>Est:</span>
        <span className={classes.data}>{toDoTasks}</span>
      </div>
      <div className={classes["statistics-details"]}>
        <span className={classes.label}>Act:</span>
        <span className={classes.data}>{donePomodoro}</span>
      </div>
      <div className={classes["statistics-details"]}>
        <span className={classes.label}>FINISH AT:</span>
        <span className={classes.data}>{finishTime}</span>
      </div>
    </div>
  );
};

export default React.memo(FinishCalculate);
