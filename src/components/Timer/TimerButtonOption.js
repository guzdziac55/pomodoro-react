import React from "react";
import classes from "./TimerButtonOption.module.css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getIsActiveOption } from "../../store/timer-slice";

const TimerButtonOption = ({
  timeOption,
  theme,
  onChangeTabOption,
  children,
}) => {
  const isActiveOption = useMemo(getIsActiveOption, []);
  const activeOption = useSelector((state) =>
    isActiveOption(state, timeOption)
  );

  return (
    <button
      className={`${classes.button} ${activeOption ? classes.active : ""}`}
      onClick={() => onChangeTabOption(timeOption, theme)}
    >
      <span>{children}</span>
    </button>
  );
};

// no need memo ?
export default React.memo(TimerButtonOption);
