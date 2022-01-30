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

// // framer motion not support path animations now
// const svgVariants = {
//   hidden: {
//     rotate: -180,
//   },
//   visable: {
//     rotate: 0,

//     transition: { duration: 2 },
//   },
// };

// const pathVariants = {
//   hidden: {
//     pathLength: 0,
//     opacity: 0,
//   },
//   visable: {
//     pathLength: 1,
//     opacity: 1,
//     transition: {
//       duration: 2,
//       ease: "easeInOut",
//     },
//   },
// };

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
