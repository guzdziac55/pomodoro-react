import React from "react";
import classes from "./Components.module.css";

export const InputWrapper = ({ title, children }) => {
  return (
    <>
      <span className={classes.labelLarge}>{title}</span>
      <div className={classes.columnWrapper}>{children}</div>
    </>
  );
};

export const InputColumn = ({ register, name, title, ...rest }) => {
  return (
    <div className={classes.formControlColumn}>
      <span className={classes.labelSmall}>{title}</span>
      <input className={classes.input} {...register(name)} {...rest} />
    </div>
  );
};

export const InputRow = ({ register, name, title, ...rest }) => {
  return (
    <div className={classes.formControlRow}>
      <span className={classes.labelLarge}>{title}</span>
      <input className={classes.inputSmall} {...register(name)} {...rest} />
    </div>
  );
};

export const Select = ({ register, options, name, title, ...rest }) => {
  return (
    <div className={classes.formControlRow}>
      <span className={classes.labelLarge}>{title}</span>
      <select className={classes.selectControl} {...register(name)} {...rest}>
        {options.map((value) => (
          <option className={classes.option} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Switch = ({ register, name, title, ...rest }) => {
  return (
    <div className={classes.formControlRow}>
      <label className={classes.labelLarge}>{title}</label>
      <label className={classes.switch}>
        <input className={classes.checkbox} {...register(name)} {...rest} />
        <span className={classes.slider}></span>
      </label>
    </div>
  );
};
