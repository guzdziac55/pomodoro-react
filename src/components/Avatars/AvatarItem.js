import React from "react";
import classes from "./AvatarItem.module.css";

const AvatarItem = ({ url, onPickAvatar }) => {
  return (
    <div>
      <img
        className={classes.avatarItem}
        onClick={() => {
          onPickAvatar(url);
        }}
        src={url}
      ></img>
    </div>
  );
};

export default AvatarItem;
