import React, { useEffect, useState } from "react";
import classes from "./ProfileForm.module.css";

import { MdRefresh } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import { useCheckImage } from "../../hooks/use-checkImage";
import {
  selectUserName,
  selectUserAvatar,
  setAvatarUrl,
  setUserName,
} from "../../store/profile-slice";
import { generateAvatarURL } from "../../store/constants/app.constants";

const ProfileForm = ({ formRef, onClose }) => {
  const dispatch = useDispatch();

  const initialName = useSelector(selectUserName);
  const initialAvatar = useSelector(selectUserAvatar);

  // perpered for more avatars load => get api key for more
  // const [openAvatars, setOpenAvatars] = useState(false);
  const [name, setName] = useState(initialName);
  const [avatarId, setAvatarId] = useState(initialAvatar);

  const [imageExist, isLoading, checkImage] = useCheckImage();

  const getAvatarFromName = () => {
    checkImage(`https://api.multiavatar.com/${name}.png`);
    if (imageExist) setAvatarId(name);
  };

  const getRandomAvatar = () => {
    const randomAvatar = Math.random().toString(36).substr(2, 5);
    checkImage(`https://api.multiavatar.com/${randomAvatar}.png`);
    if (imageExist) setAvatarId(randomAvatar);
  };

  const confirmAvatar = () => {
    dispatch(setAvatarUrl(avatarId));
  };

  useEffect(() => {
    checkImage(`https://api.multiavatar.com/${initialName}.png`);
  }, []);

  const submitForm = () => {
    dispatch(setUserName(name));
    onClose();
  };

  const isLoadingClass = isLoading ? classes.hidden : classes.show;

  return (
    <Modal>
      <form onSubmit={submitForm} ref={formRef}>
        <div className={classes.formMain}>
          {/* CURRENT AVATAR SHOW */}
          <h1>Hello {initialName}</h1>
          <div className={classes.formControlColumn}>
            <div className={classes.avatarContainer}>
              <img
                src={generateAvatarURL(initialAvatar)}
                className={classes.avatarImg}
              ></img>
            </div>

            {/* AVATAR GENERATOR BY NAME  */}
            <span className={classes.labelLarge}>Set user Avatar</span>
            <div className={classes.nameContainer}>
              <input
                id="name"
                className={classes.nameInput}
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Set your name to draw avatar"
              ></input>

              <button
                className={`${classes.nameSubmit} ${isLoadingClass}`}
                onClick={getAvatarFromName}
                type="button"
              >
                getAvatar
              </button>
            </div>

            {/* AVATAR GENERATOR RANDOM */}
            {imageExist && (
              <div className={classes.avatarPicker}>
                <div className={classes.rollAvatarContainer}>
                  <img
                    src={generateAvatarURL(avatarId)}
                    className={classes.avatarImg}
                  ></img>
                </div>

                <button
                  type="button"
                  className={`${classes.getAvatarButton} ${isLoadingClass}`}
                  onClick={getRandomAvatar}
                >
                  <MdRefresh className={classes.iconSmall}></MdRefresh>
                </button>
                <button
                  type="button"
                  onClick={confirmAvatar}
                  className={isLoadingClass}
                >
                  ok
                </button>
              </div>
            )}
            {!imageExist && <p> cannot get avatar // too many api calls </p>}
          </div>
        </div>
        {/* {openAvatars && <div></div>} */}
        <div className={classes.formMenu}>
          <button type="button" className={classes.btnCancel} onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileForm;
