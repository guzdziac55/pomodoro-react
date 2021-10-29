import React from "react";
// import { useForm } from "react-hook-form";
import classes from "./Components.module.css";

export const Input = ({ register, name, title, ...rest }) => {
  return (
    <div className={classes.inputControl}>
      <label className={classes.label}>{title}</label>
      <input className={classes.input} {...register(name)} {...rest} />
    </div>
  );
};

//   <Input name="firstName" />   <== użycie

export const Select = ({ register, options, name, title, ...rest }) => {
  return (
    <div className={classes.inputControl}>
      <label className={classes.label}>{title}</label>
      <select
        className={classes.select}
        className={classes.selectControl}
        {...register(name)}
        {...rest}
      >
        {options.map((value) => (
          <option className={classes.option} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

//checkbox
export const Switch = ({ register, name, title, ...rest }) => {
  return (
    <div className={classes.inputControl}>
      <label className={classes.label}>{title}</label>
      <input className={classes.input} {...register(name)} {...rest} />
    </div>
  );
};
