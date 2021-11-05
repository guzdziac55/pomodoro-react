import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    stage: 0,
    isTicking: false,
    pomodoroCnt: 0,
    consumedSeconds: 0,
  },
  reducers: {
    calculateNewStage(state, action) {
      const longBreakInterval = action.payload;
      state.isTicking = false;
      state.consumedSeconds = 0;
      if (state.stage === 0) {
        state.pomodoroCnt++;
        state.stage = state.pomodoroCnt % longBreakInterval == 0 ? 2 : 1;
      } else {
        state.stage = 0;
      }
    },

    changeActiveStage(state, action) {
      state.isTicking = false;
      state.consumedSeconds = 0;
      state.stage = action.payload;
    },

    toggleTicking(state) {
      state.isTicking = !state.isTicking;
    },

    consumeTime(state) {
      state.consumedSeconds = state.consumedSeconds + 1;
    },

    resetConsumedTime(state) {
      state.consumedSeconds = 0;
    },
  },
});

// REMEMBER TO EXPORT ACTIONS WITH
//  export const {action1, action2,action3} = {...tasklist.actions}

// actions selectors

export const getActiveTimeStage = (state) => state.timer.stage;

// logic with props from component
export const getIsActiveOption = () =>
  createSelector(
    (state) => state.timer.stage,
    (_, timeOption) => timeOption,
    (stage, timeOption) => stage === timeOption
  );

export const timerActions = timerSlice.actions;
export default timerSlice;
