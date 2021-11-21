import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./ProgressBar.module.css";
import { selectConsumedTime } from "../../store/timer-slice";
import { selectCurrentSeconds } from "../../store/timer-slice";
import { useEffect } from "react";

const ProgressBar = () => {
  const currentSeconds = useSelector(selectCurrentSeconds);
  const consumedSeconds = useSelector(selectConsumedTime);

  const [currentProgress, setCurrentProgress] = useState(consumedSeconds);

  useEffect(() => {
    const calculatedWidth = (consumedSeconds / currentSeconds) * 100;
    setCurrentProgress(calculatedWidth);
  }, [currentSeconds, consumedSeconds]);

  const progressStyle = {
    width: `${currentProgress}%`,
  };

  return (
    <div className={classes.progressContainer}>
      <div style={progressStyle} className={classes.progressBar}></div>
    </div>
  );
};

export default ProgressBar;
