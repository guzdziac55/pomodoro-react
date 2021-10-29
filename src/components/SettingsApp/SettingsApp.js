import React from "react";
import classes from "./SettingsApp.module.css";
import Modal from "../UI/Modal";
import { useForm } from "react-hook-form";
import { connect } from "react-redux"; // example to save form into Store ? ?
import { useDispatch, useSelector } from "react-redux";
import { configActions } from "../../store/config-slice";
import { Select, Input, Switch } from "./Components";

const SettingsApp = (props) => {
  const dispatch = useDispatch();
  // redux default state ? ==> or userState
  const defaultConfigState = useSelector((state) => state.config);
  const { register, handleSubmit } = useForm({
    defaultValues: { ...defaultConfigState }, // default values from settings redux
  });

  // form on submit
  const onSubmit = (data) => {
    const { pomodoroTime, shortBreak, longBreak, ...dataRest } = data;
    const newConfigState = {
      ...dataRest,
      stageOptions: [+pomodoroTime, +shortBreak, +longBreak],
    };
    console.log(newConfigState);
    dispatch(configActions.setConfig(newConfigState));
  };

  return (
    <Modal onClose={props.onClose}>
      {/*  to jest props children dla naszego modala */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="pomodoroTime"
          title="Pomodoro Time"
          type="number"
          min="0"
          max="360"
          required
          defaultValue={defaultConfigState.stageOptions[0]}
        />
        <Input
          register={register}
          name="shortBreak"
          title="Short break"
          type="number"
          min="0"
          max="360"
          required
          defaultValue={defaultConfigState.stageOptions[1]}
        />
        <Input
          register={register}
          name="longBreak"
          title="Long break"
          type="number"
          min="0"
          max="360"
          required
          defaultValue={defaultConfigState.stageOptions[2]}
        />

        {/*  name obj register name  */}
        <Select
          name="alarmSound"
          options={["sound1", "sound2", "sound3"]}
          register={register}
          title="Alarm Sound"
        />

        {/* custom swtich */}

        <Switch
          register={register}
          name="autoBreak"
          title="Auto Break"
          type="checkbox"
          checked={
            defaultConfigState.autoBreak === true ? "checked" : undefined
          }
        />

        {/*  bottom menu */}

        <div className={classes.formMenu}>
          <button
            type="button"
            className={classes.btnCancel}
            // onClick={props.toggleForm}  // close modal
          >
            Cancel
          </button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

const HookForm = connect()(SettingsApp);

export default HookForm;
