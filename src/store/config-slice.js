import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const configSlice = createSlice({
  name: "config",
  initialState: {
    stageOptions: [10, 2, 3],
    viewModal: true,
    autoBreak: true,
    autoPomodoros: true,
    longBreakInterval: 4,
    // alarmSound
    soundVolume: 100,
    alarmRepeatTimes: 1,
  },
  reducers: {
    // {pomodoroTime: '1', shortBreak: '1', longBreak: '1'}

    updateConfig(state, action) {
      state.stageOptions[0] = +action.payload.pomodoroTime;
      state.stageOptions[1] = +action.payload.shortBreak;
      state.stageOptions[2] = +action.payload.longBreak;
      state.longBreakInterval = +action.payload.longBreakInterval;
      // close modal
      state.viewModal = false;
    },
  }, // reducers for update states
});

export const configActions = configSlice.actions;
export default configSlice;
