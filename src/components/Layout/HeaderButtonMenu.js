import React from "react";
import classes from "./HeaderButtonMenu.module.css";

const HeaderButtonMenu = (props) => {
  return (
    <button className={classes.button}>
      <span className={classes.icon}>{props.icon}</span>
      <span>{props.title}</span>
    </button>
  );

  // return <button className={classes.button}>{props.children}</button>;
};

export default HeaderButtonMenu;
