import React from "react";
import classes from "./HeaderButtonMenu.module.css";

const HeaderButtonMenu = (props) => {
  return (
    <button className={classes.button}>
      <span>{props.icon}</span>
      <span>{props.title}</span>
    </button>
  );
};

export default HeaderButtonMenu;
