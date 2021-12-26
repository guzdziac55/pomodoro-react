import React from "react";
import classes from "./Features.module.css";

const Features = () => {
  return (
    <section id="" className={classes.container}>
      <h2>Features</h2>
      <ul>
        <li>
          <strong>Responsive design</strong> that works with desktop and mobile.
        </li>
        <li>
          <strong>Color transition</strong> to switch moods between work time
          and rest time.
        </li>
        <li>
          <strong>Audio notification </strong> at the end of a timer period.
        </li>
        <li>
          <strong>Customizable timer</strong> intervals to suit your preference.
        </li>
      </ul>
    </section>
  );
};

export default Features;
