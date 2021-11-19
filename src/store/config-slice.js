import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const defaultState = {
  configChanged: false,
  stageOptions: [25, 5, 20],
  autoBreak: false, // switch [ checkboox]
  autoPomodoros: true, // switch
  longBreakInterval: 4,
  alarmSound: "sound1",
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
    alarmSound: "sound1",
    viewModal: true,
  },
  reducers: {
    setConfig: (state, action) => {
      // state.changed = true;
      return action.payload; //Zamiast tego, aby zastąpić istniejący stan, należy bezpośrednio zwrócić nową wartość:
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

export const selectPomodoroOptionTime = createSelector(
  (state) => state.config.stageOptions,
  (options) => options[0]
);

export const configActions = configSlice.actions;
export default configSlice;
