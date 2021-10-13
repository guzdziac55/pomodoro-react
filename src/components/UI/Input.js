import React from "react";
import classes from "./Input.module.css";

// trzeba dawać {}
const Input = React.forwardRef((props) => {
  const invalid = !props.valid ? classes.error : "";

  return (
    <div className={classes.input}>
      <label
        className={`${classes.label}`}
        // className={!props.valid ? classes.error : classes.label}
        htmlFor={props.input.id}
      >
        {props.label}
      </label>
      <input
        ref={props.useRef}
        value={props.input.value}
        className={`${invalid}`}
        {...props.input}
      ></input>
    </div>
  );
});

export default Input;
// uwaga
// {
//   /*  user ref in input to get value */
// }
