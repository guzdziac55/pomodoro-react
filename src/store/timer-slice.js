import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    stage: 0,
    isTicking: false,
    pomodoroCnt: 1,
    longBreakInterval: 2,
    consumedSeconds: 0,

    // staged Dones => after 4 staged go to short break
    //
  },
  reducers: {
    setActiveStage(state, action) {
      state.isTicking = false;
      state.consumedSeconds = 0;
      if (!action.payload && action.payload !== 0) {
        let nextStage;
        if (state.stage === 0) {
          state.pomodoroCnt++;
          nextStage = state.pomodoroCnt % state.longBreakInterval == 0 ? 2 : 1;
        } else {
          nextStage = 0;
        }
        state.stage = nextStage;
        return;
      }
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
