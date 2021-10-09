import React from "react";
import classes from "./Header.module.css";
import HeaderMenuTab from "./HeaderMenuTab";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>Pomodoro</h1>
      <HeaderMenuTab onShow={props.onShow} />
    </header>
  );
};

export default Header;
