import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    stageOptions: [10, 2, 3],
    autoBreak: true, // switch [ checkboox]
    autoPomodoros: true, // switch
    longBreakInterval: 4,
    alarmSound: "sound1",
    viewModal: true,
    //
    // soundVolume: 100,
    // alarmRepeatTimes: 1,
  },
  reducers: {
    // {pomodoroTime: '1', shortBreak: '1', longBreak: '1'}

    setConfig(state, action) {
      return action.payload;
      // return {
      //   ...state,
      //   ...action.payload,
      // };
    },

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
