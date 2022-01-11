import React, { useState, useEffect } from "react";
import classes from "./InfoSection.module.css";
import InfoOne from "./InfoOne/InfoOne";
import InfoTwo from "./InfoTwo/InfoTwo";
import InfoThree from "./InfoThree/InfoThree";

const InfoSection = ({ infoRef }) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offsetY]);

  return (
    <div className={classes.infoMain}>
      <section className={classes.infoContainer}>
        <InfoOne infoRef={infoRef}></InfoOne>
        <InfoTwo />
        <InfoThree />
      </section>
    </div>
  );
};

export default InfoSection;
