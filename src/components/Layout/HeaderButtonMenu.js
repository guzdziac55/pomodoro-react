import React from "react";
import classes from "./HeaderButtonMenu.module.css";

const HeaderButtonMenu = (props) => {
  return <button className={classes.button}>{props.children}</button>;
};

export default HeaderButtonMenu;
