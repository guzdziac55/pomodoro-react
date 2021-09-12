import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const invalid = !props.valid ? classes.error : "";
  console.log(invalid);
  return (
    <div className={classes.input}>
      <label
        className={`${classes.label}`}
        // className={!props.valid ? classes.error : classes.label}
        htmlFor={props.input.id}
      >
        {props.label}
      </label>
      <input className={`${invalid}`} ref={ref} {...props.input}></input>
    </div>
  );
});

export default Input;
// uwaga
// {
//   /*  user ref in input to get value */
// }
