import { createSlice } from "@reduxjs/toolkit";

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
    //

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

export const timerActions = timerSlice.actions;
export default timerSlice;
