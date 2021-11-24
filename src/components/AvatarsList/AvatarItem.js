import React from "react";
import classes from "./AvatarItem.module.css";

const AvatarItem = ({ url, onPickAvatar }) => {
  // on click wynieść handler submit do góry
  //  get url and save into profile firebase ? ? ? account

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
