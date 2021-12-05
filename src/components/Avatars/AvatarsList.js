import React from "react";
import AvatarItem from "./AvatarItem";
import classes from "./AvatarsList.module.css";
import { avatars } from "../../assets/avatars/avatars";

const AvatarsList = ({ onPickAvatar }) => {
  const avatarsList = avatars.map((avatar) => (
    <AvatarItem url={avatar.url} onPickAvatar={onPickAvatar} />
  ));

  return <div className={classes.avatarsList}>{avatarsList}</div>;
};

export default AvatarsList;
