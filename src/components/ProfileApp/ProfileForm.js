import React, { useEffect, useState } from "react";
import classes from "./ProfileForm.module.css";

import { MdAddCircleOutline, MdRefresh } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import { useCheckImage } from "../../hooks/use-checkImage";
import {
  selectUserName,
  selectUserAvatar,
  setAvatarUrl,
  setUserName,
} from "../../store/profile-slice";

const ProfileForm = ({ formRef, onClose }) => {
  const dispatch = useDispatch();

  const initialName = useSelector(selectUserName);
  const initialAvatar = useSelector(selectUserAvatar);

  const [openAvatars, setOpenAvatars] = useState(false);
  const [name, setName] = useState(initialName); // or load <== if exist in config select
  const [avatarId, setAvatarId] = useState(initialAvatar);

  const [imageExist, checkImage] = useCheckImage();

  const getRandomAvatar = () => {
    const randomAvatar = Math.random().toString(36).substr(2, 5);
    checkImage(`https://api.multiavatar.com/${randomAvatar}.png`);
    if (imageExist) setAvatarId(randomAvatar);
  };

  const getAvatarFromName = () => {
    checkImage(`https://api.multiavatar.com/${name}.png`);
    if (imageExist) setAvatarId(name);
  };

  useEffect(() => {
    checkImage(`https://api.multiavatar.com/${initialName}.png`);
  }, []);

  const submitForm = (e) => {
    dispatch(setUserName(name));
    dispatch(setAvatarUrl(avatarId));
    onClose();
  };

  return (
    <Modal>
      <form onSubmit={submitForm} ref={formRef}>
        <div className={classes.formMain}>
          <div className={classes.formControlColumn}>
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
                className={classes.nameSubmit}
                onClick={getAvatarFromName}
                type="button"
              >
                getAvatar
              </button>
            </div>

            {imageExist && (
              <div className={classes.avatarPicker}>
                <div className={classes.avatarContainer}>
                  <img
                    src={`https://api.multiavatar.com/${avatarId}.png`}
                    className={classes.avatarImg}
                  ></img>
                </div>

                <button
                  type="button"
                  className={classes.circleButton}
                  onClick={() => {
                    if (!openAvatars) setOpenAvatars(true);
                  }}
                >
                  <MdAddCircleOutline
                    className={classes.iconBig}
                  ></MdAddCircleOutline>
                </button>
              </div>
            )}
            {!imageExist && <p> cannot get avatar // too many api calls </p>}
            {/*  or Call function !  */}
            <button
              type="button"
              className={classes.getAvatarButton}
              onClick={getRandomAvatar}
            >
              random
              <MdRefresh className={classes.iconSmall}></MdRefresh>
            </button>
          </div>

          {/* <InputWrapper title="Profile Options" /> */}
        </div>
        {openAvatars && (
          <div>
            {/* <AvatarsList onPickAvatar={onPickAvatarHandler}></AvatarsList> */}
          </div>
        )}
        {/* AVATAR LIST HERE !  */}

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
