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
      return action.payload; //Zamiast tego, aby zastąpić istniejący stan, należy bezpośrednio zwrócić nową wartość:
    },

    // check that setConfig work with fetched data
    // replaceConfig(state,action){

    // }
  },
});

export const { setConfig } = configSlice.actions;

export const getTimeOptions = (state) => state.config.stageOptions;

export const configActions = configSlice.actions;
export default configSlice;
