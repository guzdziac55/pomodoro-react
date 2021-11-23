import Card from "../UI/Card";
import React from "react";
import classes from "./ProfileForm.module.css";
import Input from "../UI/Input";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";

const ProfileForm = ({ formRef, onClose }) => {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    // send urlAvatar into fireBase
    // ProfileData with urlAvatar
  };

  return (
    <Modal>
      <form ref={formRef}>
        <div className={classes.formMain}>
          <p>form data inside !</p>
        </div>
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
