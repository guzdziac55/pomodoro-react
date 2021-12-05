import React from "react";
import classes from "./App.module.css";
import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchFirebaseUserData,
  sendFirebaseTaskList,
  sendFirebaseSettings,
  sendFireBaseUserProfile,
} from "./store/thunks/taskList-actions";

import { useDispatch, useSelector } from "react-redux";
import { selectTaskList, selectTaskListChanged } from "./store/taskList-slice";
import { selectCurrentUser } from "./store/auth-slice";
import { selectConfig, selectConfigChanges } from "./store/config-slice";
import { selectActiveStage } from "./store/timer-slice";
import {
  selectUserProfile,
  selectUserAvatar,
  selectProfieChanged,
} from "./store/profile-slice";
// firebase
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import AppInfo from "./components/AppInfoSection/AppInfo";
import Login from "./components/auth/login";

let isInitialTask = true;
let isInitialSettings = true;
let isInitialProfile = true;

function App() {
  const dispatch = useDispatch();

  const taskList = useSelector(selectTaskList);
  const isTaskChanged = useSelector(selectTaskListChanged);
  const isConfigChanged = useSelector(selectConfigChanges);
  const isProfileChanged = useSelector(selectProfieChanged);
  const configSettings = useSelector(selectConfig);
  const activeStage = useSelector(selectActiveStage);
  const currentUser = useSelector(selectCurrentUser);

  const userProfile = useSelector(selectUserProfile);
  // MAIN PROBLEM
  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];
  // isChanged is persistet intoLocalStorage ? !! its bad
  // pamięta po pierwszej zmienie że jest changed

  // nie wczytuje z localStorage kiedy użytkownik jest nie zalogowany !

  useEffect(() => {
    if (isInitialTask) {
      isInitialTask = false;
      return;
    }
    if (isTaskChanged && currentUser) {
      console.log("CZY CHCE WYSYŁAĆ TASKI");
      const userId = currentUser.uid;
      dispatch(sendFirebaseTaskList(taskList, userId)); // array
    }
  }, [taskList, dispatch]);

  useEffect(() => {
    if (isInitialSettings) {
      isInitialSettings = false;
      return;
    }
    if (isConfigChanged && currentUser) {
      const userId = currentUser.uid;
      dispatch(sendFirebaseSettings(configSettings, userId)); // obj
    }
  }, [configSettings, dispatch]);

  useEffect(() => {
    if (isInitialProfile) {
      isInitialProfile = false;
      return;
    }
    if (isProfileChanged && currentUser) {
      const userId = currentUser.uid;
      dispatch(sendFireBaseUserProfile(userProfile, userId));
    }
  }, [userProfile, dispatch]);

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
        <ToastContainer
          autoClose={2000}
          position="bottom-center"
          hideProgressBar
        />
      </main>
      <Routes>
        <Route path="/" element={<AppInfo />} />
      </Routes>
    </Fragment>
  );
}

export default App;
