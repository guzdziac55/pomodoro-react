import React from "react";
import classes from "./EditName.module.css";

const EditName = () => {
  // props callback ?

  // toogle show / hide it
  // click outside for hide ?
  // click ok for accept and hide /// call function

  // validation with empty spaces // etc  ? ? ? ?
  // cancel  when click outside
  // hide when click outside when it is not current item => ref problem like in taskList

  // put after click ok name from text input into current edited object

  //  INNY POMYSŁ  => EDIT MODE ?
  //  to types of show taskItem => normal and with editmode //

  // problem with drag drop when item is editing ?

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
