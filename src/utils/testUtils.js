import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import timerSlice from "../store/timer-slice";

const timerReducer = timerSlice.reducer;

const fakeTimerTickingTrue = {
  timer: {
    stage: 0,
    isTicking: true,
    pomodoroCnt: 0,
    consumedSeconds: 0,
  },
};
const fakeTimerTickingFalse = {
  timer: {
    stage: 0,
    isTicking: false,
    pomodoroCnt: 0,
    consumedSeconds: 0,
  },
};

function render(
  ui,
  {
    initialState,
    store = configureStore({
      reducer: { timer: timerReducer },
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render, fakeTimerTickingTrue, fakeTimerTickingFalse };
