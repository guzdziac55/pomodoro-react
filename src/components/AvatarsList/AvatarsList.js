import React from "react";
import AvatarItem from "./AvatarItem";
import classes from "./AvatarsList.module.css";

const AvatarsList = ({ onPickAvatar }) => {
  const avatarsURL = ["images/avatar1.png", "images/avatar2.png"];

  const avatarsList = avatarsURL.map((avatarUrl) => (
    <AvatarItem url={avatarUrl} onPickAvatar={onPickAvatar} />
  ));

  return <div className={classes.avatarsList}>{avatarsList}</div>;
};

export default AvatarsList;
