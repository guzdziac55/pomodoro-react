import React, { useRef } from "react";
import Modal from "../UI/Modal";
import classes from "./SaveTemplateModal.module.css";
import Input from "../UI/Input";

const SaveTemplateModal = ({ onClose, formRef }) => {
  const nameRef = useRef();
  //   nameRef.focus();

  // nie może być pusty bo invalid
  const submitForm = (e) => {
    e.preventDefault();
    console.log("save project");
    //   const enteredEmail = emailRef.current.value;
    //   const enteredPassword = passwordRef.current.value;
    //   authLogin(enteredEmail, enteredPassword);

    //  dispatch action saveToTemplate //

    // Dodatkowy reducer który przechowuje rózne templaty
    // template zawiera
    // nazwę - z inputa
    // id - z góry !  sprwadzić jak id dostaje taskItem
    //  => wrzuca aktualny taskLIST do reducera z template => robi jego kopie
    // i nadaje mu id
  };

  return (
    <Modal>
      <form ref={formRef} onSubmit={submitForm}>
        <div className={classes.formMain}>
          <h1>Save your project template</h1>
          <div className={classes.nameController}>
            {/* <label id="name">Project Name</label> */}
            <input
              required="true"
              autoFocus="true"
              id="name"
              type="text"
              name="name"
              placeholder="insert project name"
              ref={nameRef}
            ></input>
          </div>
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

export default SaveTemplateModal;
