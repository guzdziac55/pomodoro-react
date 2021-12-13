import React, { useRef } from "react";
import { addTaskTemplate } from "../../store/taskList-slice";
import Modal from "../UI/Modal";
import classes from "./SaveTemplateModal.module.css";
import { useDispatch } from "react-redux";

const SaveTemplateModal = ({ onClose, formRef }) => {
  const nameRef = useRef();
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const templateName = nameRef.current.value;
    dispatch(addTaskTemplate(templateName));
    // onClose();
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
