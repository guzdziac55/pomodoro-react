import React from "react";
import classes from "./TimerButtonOption.module.css";

const TimerButtonOption = (props) => {
  return (
    <button className={classes.button}>
      {/* specyfic style span when active ?  */}
      <span>{props.children}</span>
    </button>
  );
};

// w przypadku jednego button -> toggle       props.active

// w komponencie if props.active && {classes dodaj specjalną klase}

export default TimerButtonOption;
