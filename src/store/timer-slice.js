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
      const config = action.payload;
      const longBreakInterval = config.longBreakInterval;
      const autoBreak = config.autoBreak;
      const autoPomodoros = config.autoPomodoros;

      state.consumedSeconds = 0;
      if (state.stage === 0) {
        state.pomodoroCnt++;
        state.stage = state.pomodoroCnt % longBreakInterval == 0 ? 2 : 1;
        state.isTicking = autoBreak ? true : false;
      } else {
        state.stage = 0;
        state.isTicking = autoPomodoros ? true : false;
      }
    },

    changeActiveStage(state, action) {
      if (state.isTicking) {
        const alert = window.confirm(
          "Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)"
        );
        if (!alert) {
          return;
        }
      }
      state.isTicking = false;
      state.consumedSeconds = 0;
      state.stage = action.payload;
    },

    toggleTicking(state) {
      state.isTicking = !state.isTicking;
    },

    consumeTime(state) {
      console.log("wywolane ? ");
      state.consumedSeconds = state.consumedSeconds + 1;
    },

    resetConsumedTime(state) {
      state.consumedSeconds = 0;
    },
  },
});

export const timerActions = timerSlice.actions;

// actions
export const {
  calculateNewStage,
  changeActiveStage,
  toggleTicking,
  consumeTime,
  resetConsumedTime,
} = timerSlice.actions;

// selectors
export const selectActiveStage = (state) => state.timer.stage;
export const selectIsTicking = (state) => state.timer.isTicking;
export const selectPomodoroCount = (state) => state.timer.pomodoroCnt;
export const selectConsumedTime = (state) => state.timer.consumedSeconds;

export const selectCurrentTime = createSelector(
  (state) => state.timer.stage,
  (state) => state.config.stageOptions,
  (stage, options) => options[stage]
);
export const selectCurrentSeconds = createSelector(
  (state) => state.timer.stage,
  (state) => state.config.stageOptions,
  (stage, options) => options[stage] // * 60
);

// logic with props from component
export const getIsActiveOption = () =>
  createSelector(
    (state) => state.timer.stage,
    (_, timeOption) => timeOption,
    (stage, timeOption) => stage === timeOption
  );

export default timerSlice;
