import React from "react";
import { useState } from "react";
import classes from "./InfoOne.module.css";
import { photos } from "../../../assets/images/images";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useYoffSet from "../../../hooks/use-YoffSet";

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

const InfoOne = ({ infoRef }) => {
  const controls = useAnimation(); // controll animation for start stop
  const [inView] = useInView();
  const { offSetY } = useYoffSet();

  useEffect(() => {
    if (inView) controls.start("visable");
  }, [inView, controls]);

  return (
    <div className={classes.infoSection}>
      {/* left */}
      {/* PARALAX IMAGE !  */}
      <motion.figure
        variants={variantImage}
        initial="hidden"
        animate={controls}
        className={classes.infoThumnail}
      >
        <img
          ref={infoRef}
          src={photos[0].image}
          style={{
            transform: `translateY(-${offSetY * 0.3}px)`,
          }}
          className={classes.infoImg}
          alt="What is Pomofocus"
        ></img>
      </motion.figure>
      {/* right */}
      <motion.div
        className={classes.infoDetails}
        variants={variantInfo}
        initial="hidden"
        animate={controls}
      >
        {/* PARALLAX HEADER */}
        <div className={classes.headerContainer}>
          <h3>More info about pomodoro</h3>
          <h1 className={classes.infoHeader}>
            What is <br /> Pomofocus?
          </h1>
        </div>

        {/* PARALLAX INFO CONTENT */}
        <div className={classes.infoContent}>
          <p className={classes.contentInitial}>
            <strong>Pomofocus</strong> is a customizable pomodoro timer that
            works on desktop & mobile browser.
          </p>
          <div className={classes.contentFull}>
            <p>
              This app is inspired by Pomodoro Technique which is a time
              management method developed by Francesco Cirillo.
            </p>
          </div>
          <a
            href="https://www.google.com/search?q=pomodoro+technique"
            className={classes.buttonLink}
          >
            More Info
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoOne;
