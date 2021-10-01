import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    stage: 0,
    isTicking: false,
    consumedSeconds: 0,
  },
  reducers: {
    setActiveStage(state, action) {
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
