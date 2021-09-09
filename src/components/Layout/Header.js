import React from "react";
import classes from "./Header.module.css";
import HeaderMenuTab from "./HeaderMenuTab";

const Header = (props) => {
  // fragment
  return (
    <>
      <header className={classes.header}>
        <h1>Pomodoro</h1>
        <HeaderMenuTab />
      </header>
    </>
  );
};

export default Header;
