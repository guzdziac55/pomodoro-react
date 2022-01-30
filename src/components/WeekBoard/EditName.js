import React from "react";
import classes from "./EditName.module.css";

const EditName = () => {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="type task name"
          className={classes.nameInput}
        ></input>
        <button
          onClick={() => {
            console.log("call function name");
          }}
          className={classes.nameConfirm}
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default EditName;
