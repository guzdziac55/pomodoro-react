import React from "react";
import AvatarItem from "./AvatarItem";
import classes from "./AvatarsList.module.css";

const AvatarsList = () => {
  const avatarsURL = [
    "images/avatar1.png ",
    "images/avatar2.png",
    "images/avatar2.png",
    "images/avatar2.png",
    "images/avatar2.png",
    "images/avatar2.png",
    "images/avatar2.png",
    "images/avatar2.png",
  ];

  const avatarsList = avatarsURL.map((avatarUrl) => (
    <AvatarItem url={avatarUrl} />
  ));

  return <div className={classes.avatarsList}>{avatarsList}</div>;
};

export default AvatarsList;

// what should contains avatar component:

//  send StateHandler function // as props

// handler function with submit form after upp component
