import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const defaultConfigState = {
  configChanged: false,
  stageOptions: [25, 5, 20],
  autoBreak: false,
  autoPomodoros: true,
  longBreakInterval: 4,
  alarmSound: "notification1",
  viewModal: true,
};

const configSlice = createSlice({
  name: "config",
  initialState: {
    configChanged: false,
    stageOptions: [25, 5, 20],
    autoBreak: false,
    autoPomodoros: true,
    longBreakInterval: 4,
    alarmSound: "notification1",
    viewModal: true,
  },
  reducers: {
    // used when userLogin => we cant use changed here becouse useEffect
    // with update function profile will not work
    setConfig: (state, action) => {
      // state.configChanged = true;
      return action.payload;
    },

    setConfigChanged(state) {
      state.configChanged = true;
    },

    setConfigInitialChange(state, action) {
      state.configChanged = false;
    },
  },
});

//actions
export const { setConfig, setConfigChanged, setConfigInitialChange } =
  configSlice.actions;

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
