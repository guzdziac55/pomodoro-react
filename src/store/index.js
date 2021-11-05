import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage !

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

// config and middleware Ignore list + storage [ local, seasion etc.]
const persistConfig = {
  key: "root",
  storage,
};

// slices reducers
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    console.log("ma ten jebany logout ? ");
    state = undefined;
  }
  return combinedReducers(state, action);
};

// persistedReducer slicesReducers + config
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store = slicesReducers + config
const store = configureStore({
  reducer: persistedReducer, // root + persist config
});

// export store and use persistStore ( persistor )
export default store;
