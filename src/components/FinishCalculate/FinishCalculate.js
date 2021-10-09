import React from "react";
import classes from "./FinishCalculate.module.css";
import { useStatistics } from "../../hooks/use-statistics";

// jest rerender ze względu na APP &&taskList.length i zmiane toogla

const FinishCalculate = () => {
  console.log("jestem wenątrz statistics");

  // calculate Data
  // hook that returns
  // done
  // to Do
  // finish Time end

  const { estTasks, actTasks, calculatedEndTime } = useStatistics();

  return (
    <div className={classes.statistics}>
      <div className={classes["statistics-details"]}>
        <span className={classes.label}>Est:</span>
        <span className={classes.data}>{estTasks}</span>
      </div>
      <div className={classes["statistics-details"]}>
        <span className={classes.label}>Act:</span>
        <span className={classes.data}>{actTasks}</span>
      </div>
      <div className={classes["statistics-details"]}>
        <span className={classes.label}>FINISH AT:</span>
        <span className={classes.data}>{calculatedEndTime}</span>
      </div>
    </div>
  );
};

// est <=== all to Do
// act <=== all done
// finishTime <=== calculate finish time // pomodoroConfig * allToDo
// + also calculate by endTime Date now

export default FinishCalculate;
