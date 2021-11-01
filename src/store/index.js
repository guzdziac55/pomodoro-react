import { configureStore, combineReducers } from "@reduxjs/toolkit";
// reducer Lists
import taskListSlice from "./taskList-slice";
import uiSlice from "./ui-slice";
import timerSlice from "./timer-slice";
import configSlice from "./config-slice";
import authSlice from "./auth-slice";

const combinedReducers = combineReducers({
  tasksList: taskListSlice.reducer,
  ui: uiSlice.reducer,
  timer: timerSlice.reducer,
  config: configSlice.reducer,
  auth: authSlice.reducer,
});

// default state after logout
const rootReducer = (state, action) => {
  if (action.type === "auth/log out") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
