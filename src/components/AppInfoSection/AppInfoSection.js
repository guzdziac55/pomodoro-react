import React from "react";
import AboutApp from "./AboutApp/AboutApp";
import PomodoroTechnique from "./PomodoroTechnique/PomodoroTechnique";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import HowToUse from "./HowToUse/HowToUse";
import Features from "./Features/Features";

const AppInfoSection = () => {
  return (
    <>
      <HeaderInfo />
      <AboutApp />
      <PomodoroTechnique />
      <HowToUse />
      <Features />
    </>
  );
};

export default AppInfoSection;
