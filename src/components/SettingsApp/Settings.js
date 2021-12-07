import React from "react";
import classes from "./Settings.module.css";
import Modal from "../UI/Modal";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { connect } from "react-redux"; // example to save form into Store ? ?
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "../../assets/notifications/notifications";
import useSound from "use-sound";
import { toast } from "react-toastify";

import {
  setConfig,
  setConfigChanged,
  selectAlarmSound,
} from "../../store/config-slice";
import {
  SelectNotification,
  InputColumn,
  InputRow,
  Switch,
  InputWrapper,
} from "./FormComponents";

import { findNotification } from "../../hooks/findNotification";

const Settings = (props) => {
  const dispatch = useDispatch();
  const onClose = props.onClose;
  const ref = props.formRef;

  // hook chyba nie działający

  const defaultConfigState = useSelector((state) => state.config);
  const initialSelectNotification = useSelector(selectAlarmSound);
  const [notification, setNotification] = useState(initialSelectNotification);
  const [play] = useSound(findNotification(notification));

  const { register, handleSubmit } = useForm({
    defaultValues: { ...defaultConfigState }, // default values from settings redux
  });
  const notificationsOption = notifications.map(
    (notification) => notification.name
  );

  const onSubmit = (data) => {
    const { pomodoroTime, shortBreak, longBreak, configChanged, ...dataRest } =
      data;
    const newConfigState = {
      ...dataRest,
      stageOptions: [+pomodoroTime, +shortBreak, +longBreak],
    };
    console.log("settings data");
    console.log(data);
    // to powinien być thunk ? = > bo po zrobieniu setConfig będzie widział zmiane
    // ale jej nie wyśle bo nie będzie config changed
    dispatch(setConfig(newConfigState));
    dispatch(setConfigChanged());
    toast.success("Settings saved");
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

          <SelectNotification
            name="alarmSound"
            options={notificationsOption}
            playSound={play}
            register={register}
            title="Alarm Sound"
            onChange={(e) => {
              setNotification(e.target.value);
            }}
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
