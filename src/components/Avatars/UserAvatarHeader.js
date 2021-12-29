import React from "react";
import classes from "./UserAvatarHeader.module.css";
import { useSelector } from "react-redux";
import { selectUserAvatar } from "../../store/profile-slice";
import { generateAvatarURL } from "../../utils/helperFunctions";

const UserAvatarHeader = ({ onClick }) => {
  const userAvatar = useSelector(selectUserAvatar);

  return (
    <div onClick={onClick} className={classes.avatarContainer}>
      <img
        alt="avatar"
        className={classes.avatar}
        src={generateAvatarURL(userAvatar)}
      ></img>
    </div>
  );
};

export default UserAvatarHeader;
