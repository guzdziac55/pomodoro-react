import React from "react";
import classes from "./InfoThree.module.css";
import { photos } from "../../../assets/images/images";
import { motion, useAnimation } from "framer-motion";
import useYoffSet from "../../../hooks/use-YoffSet";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const variantImage = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visable: {
    opacity: 1,
    x: 1,
    transition: {
      duration: 1,
      delay: 1,
    },
  },
};

const variantInfo = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visable: {
    opacity: 1,
    x: 1,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
};

const InfoThree = () => {
  const controls = useAnimation(); // controll animation for start stop
  const [ref, inView] = useInView();
  const { offSetY } = useYoffSet();

  useEffect(() => {
    if (inView) controls.start("visable");
  }, [inView, controls]);

  return (
    <div ref={ref} className={classes.infoSection}>
      {/* left */}
      <motion.figure
        variants={variantImage}
        initial="hidden"
        animate={controls}
        className={classes.infoThumnail}
      >
        <img
          src={photos[2].image}
          className={classes.infoImg}
          alt="What is Pomofocus"
          style={{
            transform: `translateY(-${offSetY * 0.3 - 600}px)`,
          }}
        ></img>
      </motion.figure>
      {/* right */}
      <motion.div
        className={classes.infoDetails}
        variants={variantInfo}
        initial="hidden"
        animate={controls}
      >
        <div className={classes.headerContainer}>
          <h3>More info about pomodoro</h3>
          <h1 className={classes.infoHeader}>
            What is <br /> Pomofocus?
          </h1>
        </div>
        {/* before tag line with content ' '  */}

        <div className={classes.infoContent}>
          <p className={classes.contentInitial}>
            Pomofocus is a customizable pomodoro timer that works on desktop &
            mobile browser.
          </p>
          <div className={classes.contentFull}>
            <p>
              This app is inspired by Pomodoro Technique which is a time
              management method developed by Francesco Cirillo.
            </p>
          </div>
          <button className={classes.infoButton}>More Info</button>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoThree;
