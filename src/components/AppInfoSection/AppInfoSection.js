import React from "react";
import AboutApp from "./AboutApp/AboutApp";
import PomodoroTechnique from "./PomodoroTechnique/PomodoroTechnique";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import HowToUse from "./HowToUse/HowToUse";
import Features from "./Features/Features";
import classes from "./AppInfoSection.module.css";

const AppInfoSection = () => {
  return (
    <div className={classes.appInfoContainer}>
      <HeaderInfo />
      <AboutApp />
      <PomodoroTechnique />
      <HowToUse />
      <Features />
    </div>
  );
};

export default AppInfoSection;
