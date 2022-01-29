import React from "react";
import classes from "./TextArea.module.css";

import { handleOnFocus } from "../../utils/helperFunctions";

const TextArea = ({ onAction, onChange, value, className }) => {
  const handleKeyDown = (e, callback) => {
    if (e.keyCode === 13) callback();
  };

  return (
    <textarea
      className={classes.textArea}
      value={value}
      onChange={(e) => onChange(e)}
      onBlur={onAction} // dispatch with action.payload
      onKeyDown={(e) => handleKeyDown(e, onAction)} // dispatch witch action payload
      onFocus={handleOnFocus}
      autoFocus={true}
      rows="5"
      cols="22"
      placeholder="type name here"
      maxlength="50"
    ></textarea>
  );
};

export default TextArea;
