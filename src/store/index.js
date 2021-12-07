import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage !

import taskListSlice from "./taskList-slice";
import uiSlice from "./ui-slice";
import timerSlice from "./timer-slice";
import configSlice from "./config-slice";
import authSlice from "./auth-slice";
import profileSlice from "./profile-slice";

// OUT BLACKLIST !!!

const profilePersist = {
  key: "profile",
  storage,
  blacklist: ["profileChanged"],
};

const configPersist = {
  key: "config",
  storage,
  blacklist: ["configChanged"],
};

const taskListPersist = {
  key: "tasksList",
  storage,
  blacklist: ["taskListChanged"],
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["profile", "config", "tasksList"],
};

//  we can make other reducers outside and put here only less
//  blackListed and rest

const combinedReducers = combineReducers({
  ui: uiSlice.reducer,
  timer: timerSlice.reducer,
  auth: authSlice.reducer,
  // reducers for blackList
  tasksList: persistReducer(taskListPersist, taskListSlice.reducer),
  config: persistReducer(configPersist, configSlice.reducer),
  profile: persistReducer(profilePersist, profileSlice.reducer),
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state.tasksList.taskListChanged = false;
    state.config.configChanged = false;
    state.profile.profileChanged = false;
  }
  if (action.type === "auth/signUp") {
    state.tasksList.taskListChanged = false;
    state.config.configChanged = false;
    state.profile.profileChanged = false;
  }
  return combinedReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
