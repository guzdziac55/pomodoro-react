import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage !

import taskListSlice from "./taskList-slice";
import uiSlice from "./ui-slice";
import timerSlice from "./timer-slice";
import configSlice from "./config-slice";
import authSlice from "./auth-slice";
import profileSlice from "./profile-slice";

const taskListPersist = {
  key: "tasksList",
  storage,
  blacklist: ["taskListChanged"],
};

const configPersists = {
  key: "config",
  storage,
  blacklist: ["configChanged"],
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["configPersist", "config", "tasksList", "timer"],
};

const userLoginReducer = combineReducers({
  ui: uiSlice.reducer,
  timer: timerSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  tasksList: taskListSlice.reducer,
  config: configSlice.reducer,
});

const userLogoutReducer = combineReducers({
  ui: uiSlice.reducer,
  timer: timerSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  tasksList: persistReducer(taskListPersist, taskListSlice.reducer),
  config: persistReducer(configPersists, configSlice.reducer),
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    return userLogoutReducer(undefined, action);
  }

  if (action.type === "auth/signUp") {
    return userLoginReducer(undefined, action);
  }
  return userLogoutReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
