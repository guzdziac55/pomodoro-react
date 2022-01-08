import React from "react";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import classes from "./LayoutComponent.module.css";
import Header from "../components/Layout/Header";
import { ToastContainer } from "react-toastify";
import { selectActiveStage } from "../store/timer-slice";

const LayoutComponent = (props) => {
  const activeStage = useSelector(selectActiveStage);
  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];
  const currentTheme = themeClasses[activeStage];

  return (
    <Fragment>
      <main className={`${classes.mainApp} ${classes[`${currentTheme}`]}`}>
        <Header />
        {props.children}
      </main>

      <ToastContainer
        autoClose={2000}
        position="bottom-center"
        hideProgressBar
      />
    </Fragment>
  );
};

export default LayoutComponent;
