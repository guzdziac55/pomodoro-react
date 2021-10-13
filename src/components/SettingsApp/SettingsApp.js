import React from "react";
import classes from "./SettingsApp.module.css";
import Modal from "../UI/Modal";
import { useForm } from "react-hook-form";
import { connect } from "react-redux"; // example to save form into Store ? ?
import { useDispatch, useSelector } from "react-redux";
import { configActions } from "../../store/config-slice";
// import configAc

const Input = ({ type, label, register, required, ...inputProps }) => (
  <>
    <label>{label}</label>
    <input type={type} {...register(label, { required, ...inputProps })} />
  </>
);

// // select
const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>

    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

// main component

const SettingsApp = (props) => {
  const defaultConfigState = useSelector((state) => state.config);
  console.log(defaultConfigState);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { ...defaultConfigState },
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(configActions.updateConfig(data));
  };

  return (
    //  hide when click backDrop
    <Modal onClose={props.onClose}>
      {/*  to jest props children dla naszego modala */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="number"
          label="pomodoroTime"
          min="0"
          max="360"
          register={register}
          required
        />
        <Input
          type="number"
          label="shortBreak"
          min="0"
          max="360"
          register={register}
          required
        />
        <div className={classes["form-control"]}> </div>
        <Input
          type="number"
          label="longBreak"
          min="0"
          max="360"
          register={register}
          required
        />

        <input type="submit" />
      </form>
    </Modal>
  );
};

const HookForm = connect()(SettingsApp);

export default HookForm;
