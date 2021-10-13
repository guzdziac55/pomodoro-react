import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderButtonMenu.module.css";

const HeaderButtonMenu = (props) => {
  return (
    <button onClick={props.onShow} className={classes.button}>
      <span className={classes.icon}>{props.icon}</span>
      <span>{props.children}</span>
    </button>
  );
};

export default HeaderButtonMenu;
