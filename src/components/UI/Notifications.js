import React from "react";
import classes from "./Notifications.module.css";
import { Spinner } from "./Spinner";
const Notifications = (props) => {
  let specialClasses = "";

  // dynamic add classes of success / errors
  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "succes") {
    specialClasses = classes.succes;
  }

  const cssClasses = `${classes.notifications} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      {props.isLoading && <Spinner />}
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notifications;
