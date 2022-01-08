import React from "react";
import classes from "./InfoSection.module.css";
import InfoOne from "./InfoOne/InfoOne";
import InfoTwo from "./InfoTwo/InfoTwo";
import InfoThree from "./InfoThree/InfoThree";
import { useRef } from "react";
// return all sections here !  Big component
const InfoSection = (infoRef) => {
  return (
    <div className={classes.infoMain}>
      <section className={classes.infoContainer}>
        <InfoOne ref={infoRef}></InfoOne>
        <InfoTwo></InfoTwo>
        <InfoThree></InfoThree>
      </section>
    </div>
  );
};

export default InfoSection;
