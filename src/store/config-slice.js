import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
const configSlice = createSlice({
  name: "config",
  initialState: {
    stageOptions: [10, 2, 3],
    autoBreak: false, // switch [ checkboox]
    autoPomodoros: true, // switch
    longBreakInterval: 4,
    alarmSound: "sound1",
    viewModal: true,
  },
  reducers: {
    setConfig(state, action) {
      return action.payload; //Zamiast tego, aby zastąpić istniejący stan, należy bezpośrednio zwrócić nową wartość:
    },
  },
});

//actions
export const { setConfig } = configSlice.actions;

export const selectLongInterval = (state) => state.config.longBreakInterval;
export const selectStageOptions = (state) => state.config.stageOptions;

export const selectPomodoroOptionTime = createSelector(
  (state) => state.config.stageOptions,
  (options) => options[0]
);

// create selector ponieważ jest to tablica ?
// export const selectStageOptions = createSelector(
//   (state) => state.config.stageOptions,
//   (options) => options
// );

// export const selectStageOptions = createSelector(
//   (state) => state.config.stageOptions,
//   (state) => state.timer.stage,
//   (options, stage) => options[stage]
// );

//thunks
// ..
// toDelete
export const configActions = configSlice.actions;
// slice change into export reducers !
export default configSlice;
