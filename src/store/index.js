import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage !
import { useDispatch } from "react-redux";
import taskListSlice from "./taskList-slice";
import uiSlice from "./ui-slice";
import timerSlice from "./timer-slice";
import configSlice from "./config-slice";
import authSlice from "./auth-slice";
import profileSlice from "./profile-slice";
import { persistor } from "..";
import setInitialChanges from "./thunks/initialChanges-actions";
import persistStore from "redux-persist/es/persistStore";
import { auth } from "../firebase";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

// OUT BLACKLIST !!!
// const dispatch = useDispatch();

const profilePersist = {
  key: "profile",
  storage,
  blacklist: ["profileChanged"],
};

// const dispatch = useDispatch();
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
  blacklist: [
    "configPersist",
    "config",
    "tasksList",
    "timer",
    // "taskListPersist",
  ],
};

//  we can make other reducers outside and put here only less
//  blackListed and rest

// it can be called App Reducer TOO
// const combinedReducers = combineReducers({
//   ui: uiSlice.reducer,
//   timer: timerSlice.reducer,
//   auth: authSlice.reducer,
//   profile: profileSlice.reducer,
//   tasksList: persistReducer(taskListPersist, taskListSlice.reducer),
//   config: persistReducer(configPersists, configSlice.reducer),
//   // profile: persistReducer(profilePersist, profileSlice.reducer),
// });

const userLoginReducer = combineReducers({
  ui: uiSlice.reducer,
  timer: timerSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  config: configSlice.reducer, // pobierz z initial
  tasksList: taskListSlice.reducer,
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

let storeRef = store;

export default store;
