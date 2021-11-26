import React from "react";
import classes from "./Settings.module.css";
import Modal from "../UI/Modal";
import { useForm } from "react-hook-form";
import { connect } from "react-redux"; // example to save form into Store ? ?
import { useDispatch, useSelector } from "react-redux";

import { setConfig, setConfigChanged } from "../../store/config-slice";
import {
  Select,
  InputColumn,
  InputRow,
  Switch,
  InputWrapper,
} from "./FormComponents";

import { notifications } from "../../assets/notifications/notifications";

const Settings = (props) => {
  const onClose = props.onClose;
  const ref = props.formRef;
  const dispatch = useDispatch();
  const defaultConfigState = useSelector((state) => state.config);
  const { register, handleSubmit } = useForm({
    defaultValues: { ...defaultConfigState }, // default values from settings redux
  });

  // const noti = notifications.map((notification) => notification.name);

  // form on submit
  const onSubmit = (data) => {
    const { pomodoroTime, shortBreak, longBreak, ...dataRest } = data;
    const newConfigState = {
      ...dataRest,
      stageOptions: [+pomodoroTime, +shortBreak, +longBreak],
    };
    // replace From form config
    dispatch(setConfig(newConfigState));
    dispatch(setConfigChanged());
    onClose();
  };

  return (
    <Modal>
      <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
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
            options={notifications.map((notification) => notification.name)}
            register={register}
            title="Alarm Sound"
            // options={notificationOptions}
            // options={() => {
            //   const noti = notifications.map((notification) => {
            //     console.log("inside map");
            //     return notification.name;
            //   });
            //   return noti;
            // }}
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
          <button type="button" className={classes.btnCancel} onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

const SettingsForm = connect()(Settings);

export default SettingsForm;
