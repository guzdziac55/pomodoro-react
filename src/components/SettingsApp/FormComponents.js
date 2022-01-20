import React from "react";
import classes from "./FormComponents.module.css";
import { MdOutlineNotificationsNone } from "react-icons/md";

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

export const SelectNotification = ({
  register,
  options,
  name,
  title,
  playSound,
  ...rest
}) => {
  return (
    <div className={[classes.formControlRow, classes.controlGap].join(" ")}>
      <span className={classes.labelLarge}>{title}</span>
      <div className={classes.select}>
        <select {...register(name)} {...rest}>
          {options.map((value) => (
            <option className={classes.option} value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <button className={classes.buttonSound} type="button" onClick={playSound}>
        <MdOutlineNotificationsNone
          className={classes.icon}
        ></MdOutlineNotificationsNone>
      </button>
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
