import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    stageOptions: [10, 2, 3],
    autoBreak: false, // switch [ checkboox]
    autoPomodoros: true, // switch
    longBreakInterval: 4,
    alarmSound: "sound1",
    viewModal: true,

    // soundVolume: 100,
    // alarmRepeatTimes: 1,
  },
  reducers: {
    setConfig(state, action) {
      return action.payload;
    },

    // check that setConfig work with fetched data
    // replaceConfig(state,action){

    // }
  },
});

export const configActions = configSlice.actions;
export default configSlice;
