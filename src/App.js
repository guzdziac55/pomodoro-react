import React from "react";
import classes from "./App.module.css";
import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";

import {
  fetchFirebaseUserData,
  sendFirebaseTaskList,
  sendFirebaseSettings,
} from "./store/thunks/taskList-actions";

import { useDispatch, useSelector } from "react-redux";
import { selectTaskList, selectTaskListChanged } from "./store/taskList-slice";
import { selectCurrentUser } from "./store/auth-slice";
import { selectConfig, selectConfigChanges } from "./store/config-slice";
import { selectActiveStage } from "./store/timer-slice";
// firebase
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import AppInfo from "./components/AppInfoSection/AppInfo";

let isInitialTask = true;
let isInitialSettings = true;

function App() {
  const dispatch = useDispatch();

  const taskList = useSelector(selectTaskList);
  const isTaskChanged = useSelector(selectTaskListChanged);
  const isConfigChanged = useSelector(selectConfigChanges);
  const configSettings = useSelector(selectConfig);
  const activeStage = useSelector(selectActiveStage);
  const currentUser = useSelector(selectCurrentUser);

  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];

  // MAIN PROBLEM
  // isChanged is persistet intoLocalStorage ? !! its bad
  // pamięta po pierwszej zmienie że jest changed

  // nie wczytuje z localStorage kiedy użytkownik jest nie zalogowany !

  useEffect(() => {
    console.log(isInitialTask);
    if (isInitialTask) {
      isInitialTask = false;
      return;
    }
    if (isTaskChanged && currentUser) {
      const userId = currentUser.uid;
      dispatch(sendFirebaseTaskList(taskList, userId)); // array
    }
  }, [taskList, dispatch]);

  // sendSettings // problem wysyła ten z initialStatu
  useEffect(() => {
    if (isInitialSettings) {
      isInitialSettings = false;
      return;
    }
    //  add isChanged to settings ! ! ! !
    if (isConfigChanged && currentUser) {
      console.log("CZY WYSYLAM");
      const userId = currentUser.uid;
      dispatch(sendFirebaseSettings(configSettings, userId)); // obj
    }
  }, [configSettings, dispatch]);

  // use Login / Logout // pobierz taskList i settings
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      dispatch(fetchFirebaseUserData(userId)); // redux thunk
    }
  }, [currentUser, dispatch]);

  // current User Change status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authActions.singUp(user));
      } else {
        dispatch(authActions.logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const currentTheme = themeClasses[activeStage];

  return (
    <Fragment>
      <main className={`${classes.mainApp} ${classes[`${currentTheme}`]}`}>
        <Header></Header>
        <Outlet />
      </main>

      <Routes>
        {/* info here !  */}
        <Route path="/" element={<AppInfo />} />
      </Routes>
    </Fragment>
  );
}

export default App;
