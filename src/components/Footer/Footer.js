import React from "react";
import classes from "./Footer.module.css";

import { GoMarkGithub } from "react-icons/go";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`${classes.container} ${classes.siteMap}`}>
        <a href="/app">Go to APP</a>
        {/* <a href="/outsidelink">Original App</a> */}
      </div>
      <div className={`${classes.container} ${classes.mediaLinks}`}>
        <div className={classes.iconContainer}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/guzdziac55/pomodoro-react"
          >
            <GoMarkGithub className={classes.icon} />
            <span className={classes.iconTitle}>GitHub</span>{" "}
          </a>
        </div>
      </div>
      <div className={`${classes.container} ${classes.author}`}>
        <p>
          Made by:
          <a
            href="https://github.com/guzdziac55"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={classes.authorTitle}> Dawid Guzik</span>
          </a>
        </p>
      </div>
      <div className={`${classes.container} ${classes.rights}`}></div>
    </footer>
  );
};

export default Footer;
