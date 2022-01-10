import React from "react";
import classes from "./InfoTwo.module.css";
import useYoffSet from "../../../hooks/use-YoffSet";
import { photos } from "../../../assets/images/images";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const variantImage = {
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

const variantInfo = {
  hidden: {
    opacity: 0,
    x: -100,
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

const InfoOne = () => {
  const controls = useAnimation();
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
          src={photos[1].image}
          className={classes.infoImg}
          alt="What is Pomofocus"
          style={{
            transform: `translateY(-${offSetY * 0.3 - 300}px)`,
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
          <h3>Is this app right for you?</h3>
          <h1 className={classes.infoHeader}>For whom ?</h1>
        </div>

        <div className={classes.infoContent}>
          <p className={classes.contentInitial}>
            If you are a person who has a problem with
            <strong> concentration</strong> or you want to control your time
            spent on performing a given activity.
          </p>
          <div className={classes.contentFull}>
            <p>
              This application is for you. Control the time and make the time
              spent in concentration a pleasure.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoOne;
