import React, { useState } from "react";
import classes from "./ProfileForm.module.css";
import { selectUserAvatar } from "../../store/profile-slice";
import { MdAddCircleOutline, MdRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import { getRandomAvatar } from "../../store/thunks/avatar-actions";
import AvatarsList from "../Avatars/AvatarsList";
import { setAvatarUrl } from "../../store/profile-slice";

const ProfileForm = ({ formRef, onClose }) => {
  const dispatch = useDispatch();
  // const avatarsList = ["images/avatar1.png", "images/avatar2.png"];
  const userAvatar = useSelector(selectUserAvatar);

  const [openAvatars, setOpenAvatars] = useState(false);
  const [pickedAvatar, setPickedAvatar] = useState(userAvatar);
  const [userName, setUserName] = useState(""); // or load <== if exist in config select

  const onPickAvatarHandler = (urlAvatar) => {
    console.log("avatar picker");
    setPickedAvatar(urlAvatar);
  };

  // component and api call for random avatar
  // button with refresh avatar
  // wynik daj do setPicked i submit zatwierdza

  const getAvatar = () => {
    dispatch(getRandomAvatar());
  };

  //  TO GET RANDOM AVATAR WE SHOULD PASS RANDOM STRING INTO API CALL ?

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(setAvatarUrl(pickedAvatar));
    onClose();
  };

  return (
    <Modal>
      <form onSubmit={submitForm} ref={formRef}>
        <div className={classes.formMain}>
          <div className={classes.formControlColumn}>
            <span className={classes.labelLarge}>Set user Avatar</span>
            <input
              id="name"
              type="text"
              placeholder="Set your name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
            <div className={classes.avatarPicker}>
              <img
                src={`https://api.multiavatar.com/${userName}.png`}
                className={classes.userAvatar}
              ></img>

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
            <button
              type="button"
              className={classes.getAvatarButton}
              // onClick={getAvatar}
            >
              <MdRefresh className={classes.iconSmall}></MdRefresh>
            </button>
          </div>

          {/* <InputWrapper title="Profile Options" /> */}
        </div>
        {openAvatars && (
          <div>
            <AvatarsList onPickAvatar={onPickAvatarHandler}></AvatarsList>
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
