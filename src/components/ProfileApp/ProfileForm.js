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
import { randomString } from "../../utils/helperFunctions";

const ProfileForm = ({ formRef, onClose }) => {
  const dispatch = useDispatch();

  const initialName = useSelector(selectUserName);
  const initialAvatar = useSelector(selectUserAvatar);

  const [name, setName] = useState(initialName);
  const [isLoading, imageExist, avatarId, checkImage] = useCheckImage();

  useEffect(() => {
    checkImage("default");
  }, []);

  const getRandomAvatar = () => {
    const random = randomString();
    checkImage(random);
  };

  const confirmAvatar = () => {
    dispatch(setAvatarUrl(avatarId));
  };

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
                onClick={() => {
                  checkImage(name);
                }}
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
