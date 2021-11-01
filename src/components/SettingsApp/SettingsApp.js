import React from "react";
import classes from "./SettingsApp.module.css";
import Modal from "../UI/Modal";
import { useForm } from "react-hook-form";
import { connect } from "react-redux"; // example to save form into Store ? ?
import { useDispatch, useSelector } from "react-redux";
import { configActions } from "../../store/config-slice";
import {
  Select,
  InputColumn,
  InputRow,
  Switch,
  InputWrapper,
} from "./Components";

const SettingsApp = (props) => {
  const dispatch = useDispatch();

  const defaultConfigState = useSelector((state) => state.config);
  const { register, handleSubmit } = useForm({
    defaultValues: { ...defaultConfigState }, // default values from settings redux
  });

  const closeSettingsWindow = () => {
    props.onClose();
  };

  // form on submit
  const onSubmit = (data) => {
    const { pomodoroTime, shortBreak, longBreak, ...dataRest } = data;
    const newConfigState = {
      ...dataRest,
      stageOptions: [+pomodoroTime, +shortBreak, +longBreak],
    };
    console.log(newConfigState);
    dispatch(configActions.setConfig(newConfigState));
    closeSettingsWindow();
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formMain}>
          <InputWrapper title="Time Options">
            <InputColumn
              register={register}
              name="pomodoroTime"
              title="Pomodoro time"
              type="number"
              min="0"
              max="360"
              required
              defaultValue={defaultConfigState.stageOptions[0]}
            />
            <InputColumn
              register={register}
              name="shortBreak"
              title="Short break time"
              type="number"
              min="0"
              max="360"
              required
              defaultValue={defaultConfigState.stageOptions[1]}
            />
            <InputColumn
              register={register}
              name="longBreak"
              title="Long break time"
              type="number"
              min="0"
              max="360"
              required
              defaultValue={defaultConfigState.stageOptions[2]}
            />
          </InputWrapper>

          <Select
            name="alarmSound"
            options={["sound1", "sound2", "sound3"]}
            register={register}
            title="Alarm Sound"
          />

          <Switch
            register={register}
            name="autoBreak"
            title="Auto Break"
            type="checkbox"
            defaultChecked={
              defaultConfigState.autoBreak === true ? true : false
            }
          />

          <Switch
            register={register}
            name="autoPomodoros"
            title="Auto Pomodoros"
            type="checkbox"
            defaultChecked={
              defaultConfigState.autoPomodoros === true ? true : false
            }
          />

          <InputRow
            register={register}
            name="longBreakInterval"
            title="Long break interval"
            type="number"
            min="0"
            max="10"
            required
            defaultValue={defaultConfigState.longBreakInterval}
          />

          {/*  bottom menu */}
        </div>
        <div className={classes.formMenu}>
          <button
            type="button"
            className={classes.btnCancel}
            onClick={closeSettingsWindow}
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
