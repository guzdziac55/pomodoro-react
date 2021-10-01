// import slices
import { configureStore } from "@reduxjs/toolkit";
import taskListSlice from "./taskList-slice";
import uiSlice from "./ui-slice";
import timerSlice from "./timer-slice";
import configSlice from "./config-slice";

const store = configureStore({
  reducer: {
    tasksList: taskListSlice.reducer, // to jest po to żeby dostać się do stejtu z TaskListSlice
    ui: uiSlice.reducer,
    timer: timerSlice.reducer,
    config: configSlice.reducer,
  },
});

export default store;
