import React from "react";
import WeekBoard from "../components/WeekBoard/WeekBoard";
import classes from "./WeekBoardPage.module.css";
import LayoutComponent from "./LayoutComponent";

const WeekBoardPage = () => {
  return (
    <LayoutComponent>
      <div className={classes.containerFull}>
        <WeekBoard />
      </div>
    </LayoutComponent>
  );
};

export default WeekBoardPage;
