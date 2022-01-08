import React from "react";
import classes from "./Header.module.css";
import HeaderMenuTab from "./HeaderMenuTab";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const headerVariants = {
  hidden: {
    y: -100,
    opacity: 1,
  },
  visable: {
    opacity: 1,
    y: 0,
  },
};

const Header = ({ onOpen }) => {
  return (
    <>
      <header
        variants={headerVariants}
        initial="hidden"
        animate="visable"
        className={classes.header}
      >
        <Link to="/app">
          <h1>Pomodoro</h1>
        </Link>

        <HeaderMenuTab onOpen={onOpen} />
      </header>
    </>
  );
};

export default Header;
