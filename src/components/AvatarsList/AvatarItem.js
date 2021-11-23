import React from "react";
import classes from "./AvatarItem.module.css";

const AvatarItem = ({ url }) => {
  return (
    <div>
      <img className={classes.avatarItem} src={url}></img>
    </div>
  );
};

export default AvatarItem;
