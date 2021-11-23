import React, { useState } from "react";
import classes from "./ProfileForm.module.css";

import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { InputWrapper } from "../SettingsApp/FormComponents";
import Modal from "../UI/Modal";
import AvatarsList from "../AvatarsList/AvatarsList";

const ProfileForm = ({ formRef, onClose }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [openAvatars, setOpenAvatars] = useState(false);
  //  pick avatar in another modal window ? ? ? ?
  const avatarsList = ["images/avatar1.png", "images/avatar2.png"];
  //  or

  // upload by local ==> trudniejsze

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    //  save avatar url into Redux => send url avatar into firebase
  };

  return (
    <Modal>
      <form ref={formRef}>
        <div className={classes.formMain}>
          <div className={classes.formControlColumn}>
            <span className={classes.labelLarge}>Set user Avatar</span>
            <button
              type="button"
              className={classes.circleButton}
              onClick={() => {
                if (!openAvatars) setOpenAvatars(true);
              }}
            >
              <MdAddCircleOutline className={classes.icon}></MdAddCircleOutline>
            </button>
          </div>

          {/* <InputWrapper title="Profile Options" /> */}
        </div>
        {openAvatars && (
          <div>
            <AvatarsList></AvatarsList>
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
