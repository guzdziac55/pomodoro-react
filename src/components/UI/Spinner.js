import classes from "./Spinner.module.css";
import React, { Component } from "react";

export const Spinner = () => {
  return (
    <>
      <div className={classes.container}>
        <span className={classes.ring}>Loading</span>
      </div>
    </>
  );
};
