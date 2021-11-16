import React from "react";
import classes from "./App.module.css";
import HookForm from "./components/SettingsApp/SettingsApp";
import { Fragment, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";

import {
  fetchFirebaseUserData,
  sendFirebaseTaskList,
  sendFirebaseSettings,
} from "./store/thunks/taskList-actions";

// store
import { useDispatch, useSelector } from "react-redux";

// Pages
// import PomodoroApp from "./pages/PomodoroApp";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import SignUpPage from "./pages/SignUp";
// import ResetPassword from "./pages/ResetPassword";

import { selectTaskList, selectIsChanged } from "./store/taskList-slice";
import { selectCurrentUser } from "./store/auth-slice";
import { selectConfig } from "./store/config-slice";
import { selectActiveStage } from "./store/timer-slice";
// firebase
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import PomodoroApp from "./pages/PomodoroApp";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const taskList = useSelector(selectTaskList);
  const isChanged = useSelector(selectIsChanged);
  // check that currentUser works like loggedIn ?
  const isLogged = useSelector((state) => state.auth.isLogged);
  const configSettings = useSelector(selectConfig);
  const activeStage = useSelector(selectActiveStage);
  const currentUser = useSelector(selectCurrentUser);

  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];
  const [settingsShow, setSettingsShow] = useState(false);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isChanged && currentUser) {
      const userId = currentUser.uid;
      dispatch(sendFirebaseTaskList(taskList, userId)); // array
    }
  }, [taskList, dispatch]);

  // sendSettings
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isChanged && currentUser) {
      const userId = currentUser.uid;
      dispatch(sendFirebaseSettings(configSettings, userId)); // obj
    }
  }, [configSettings, dispatch]);

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
        dispatch(authActions.singUp(user)); // <=== akcja ze slice auth // przypisane tokena
      } else {
        dispatch(authActions.logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const handleSettingsShow = () => {
    setSettingsShow(true);
  };

  const handleSettingsHide = () => {
    setSettingsShow(false);
  };

  // getCurrentTheme
  const currentTheme = themeClasses[activeStage];

  return (
    <Fragment>
      {settingsShow && <HookForm onCloseSettings={handleSettingsHide} />}
      <main className={`${classes.mainApp} ${classes[`${currentTheme}`]}`}>
        <Header onShow={handleSettingsShow}></Header>
        <Outlet />
      </main>
    </Fragment>
  );
}

export default App;

// <Route path="/" exact>
// <Header onShow={handleSettingsShow}></Header>
// <PomodoroApp />
// </Route>

// <Route path="/app">
// <Header onShow={handleSettingsShow}></Header>
// <PomodoroApp />
// </Route>

// {!isLogged && (
// <Route path="/login">
//   <Header onShow={handleSettingsShow}></Header>
//   <Login />
// </Route>
// )}

// {!isLogged && (
// <Route path="/signup">
//   <Header onShow={handleSettingsShow}></Header>
//   <SignUpPage></SignUpPage>
// </Route>
// )}
// {!isLogged && (
// <Route path="/reset-password">
//   <Header onShow={handleSettingsShow}></Header>
//   <ResetPassword></ResetPassword>
// </Route>
// )}

// {!isLogged && (
// <Route path="/profile">
//   {/*  is useSelector Is logged in
//   //  render Provile */}
//   {/* in !loggedin redirect do /Auth / opcja rejestracji / logowania */}
//   <Header onShow={handleSettingsShow}></Header>
//   <Profile />
// </Route>
// )}
// {/* jesli path inna niż wszystko to redirect na główną  */}

// <Route path="*">
// <Redirect to="/" />
// </Route>
