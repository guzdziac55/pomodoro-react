import React from "react";
import classes from "./Header.module.css";
import HeaderMenuTab from "./HeaderMenuTab";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Header = ({ onOpen }) => {
  return (
    <>
      <header className={classes.header}>
        <Link to="/app">
          {/* add icon here logo APP */}
          <h1>Pomodoro</h1>
        </Link>
        <HeaderMenuTab onOpen={onOpen} />
      </header>
    </>
  );
};

export default Header;
