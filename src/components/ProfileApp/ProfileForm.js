import React, { useState } from "react";
import classes from "./ProfileForm.module.css";
import { selectUserAvatar } from "../../store/profile-slice";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import AvatarsList from "../AvatarsList/AvatarsList";

const ProfileForm = ({ formRef, onClose }) => {
  // const dispatch = useDispatch();
  // const avatarsList = ["images/avatar1.png", "images/avatar2.png"];
  const userAvatar = useSelector(selectUserAvatar);
  console.log("user avatar us ");
  console.log(userAvatar);
  const [openAvatars, setOpenAvatars] = useState(false);
  const [pickedAvatar, setPickedAvatar] = useState(userAvatar);

  const onPickAvatarHandler = (urlAvatar) => {
    console.log("avatar picker");
    setPickedAvatar(urlAvatar);
  };

  // when log in getUserUrl from firebase
  // put into slice => auth or somewhere userData
  // useSelector to pick this data from redux

  const submitForm = (e) => {
    e.preventDefault();

    //  save avatar into config storage and send into firebase
    // dispatch
    //
  };

  return (
    <Modal>
      <form onSubmit={submitForm} ref={formRef}>
        <div className={classes.formMain}>
          <div className={classes.formControlColumn}>
            <span className={classes.labelLarge}>Set user Avatar</span>

            <div className={classes.avatarPicker}>
              <img src={pickedAvatar} className={classes.userAvatar}></img>
              <button
                type="button"
                className={classes.circleButton}
                onClick={() => {
                  if (!openAvatars) setOpenAvatars(true);
                }}
              >
                <MdAddCircleOutline
                  className={classes.icon}
                ></MdAddCircleOutline>
              </button>
            </div>
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
