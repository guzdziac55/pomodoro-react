import React from "react";
import classes from "./FinishCalculate.module.css";
import { useSelector } from "react-redux";
import { selectPomodoroOption } from "../../store/config-slice";
import {
  selectNumberDonePomodoro,
  selectNumberToDoTasks,
} from "../../store/taskList-slice";
import { useFinishTime } from "../../hooks/use-finishTime";
import { createSelector } from "reselect";

//in Minutes
const selectPomTimeToAdd = createSelector(
  selectPomodoroOption,
  selectNumberToDoTasks,
  (pomodoroOption, tasksNumber) => pomodoroOption * tasksNumber
);

const FinishCalculate = () => {
  console.log(
    "FINISH CALCULATE COMPONENT !!!!!!!!!!!!!!!!!!!FINISH CALCULATE COMPONENT !!!!!!!!!!!!!!!!!!!"
  );
  const toDoTasks = useSelector(selectNumberToDoTasks);
  const donePomodoro = useSelector(selectNumberDonePomodoro);
  const timeToAdd = useSelector(selectPomTimeToAdd);
  // check later with normal function => sprawdzić czy spowoduje ponowne wyrenderowanie
  //komponentu z nornamlną funkcją
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
