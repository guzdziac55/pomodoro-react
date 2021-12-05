import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { toast } from "react-toastify";

export const defaultConfigState = {
  configChanged: false,
  stageOptions: [25, 5, 20],
  autoBreak: false, // switch [ checkboox]
  autoPomodoros: true, // switch
  longBreakInterval: 4,
  alarmSound: "notification1",
  viewModal: true,
};

const configSlice = createSlice({
  name: "config",
  initialState: {
    configChanged: false,
    stageOptions: [25, 5, 20],
    autoBreak: false, // switch [ checkboox]
    autoPomodoros: true, // switch
    longBreakInterval: 4,
    alarmSound: "notification1",
    viewModal: true,
  },
  reducers: {
    setConfig: (state, action) => {
      return action.payload;
    },
    setConfigChanged(state) {
      state.configChanged = true;
    },
  },
});

//actions
export const { setConfig, setConfigChanged } = configSlice.actions;

//selectors
export const selectConfig = (state) => state.config;
export const selectLongBrakInterval = (state) => state.config.longBreakInterval;
export const selectStageOptions = (state) => state.config.stageOptions;
export const selectConfigChanges = (state) => state.config.configChanged;
export const selectAlarmSound = (state) => state.config.alarmSound;

export const selectPomodoroOptionTime = createSelector(
  (state) => state.config.stageOptions,
  (options) => options[0]
);

export const configActions = configSlice.actions;
export default configSlice;
