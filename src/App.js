import React from "react";
import classes from "./App.module.css";
import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import {
  sendFirebaseTemplates,
  fetchFirebaseUserData,
  sendFirebaseTaskList,
  sendFirebaseSettings,
  sendFireBaseUserProfile,
} from "./store/thunks/taskList-actions";

import AppInfoSection from "./components/AppInfoSection/AppInfoSection";
import Footer from "./components/Footer/Footer";

import {
  selectTaskList,
  selectTemplateList,
  selectTemplateChanged,
  selectTaskListChanged,
} from "./store/taskList-slice";

import { selectConfig, selectConfigChanges } from "./store/config-slice";
import { selectUserProfile, selectProfieChanged } from "./store/profile-slice";

import { persistor } from ".";
import { selectCurrentUser } from "./store/auth-slice";
import { selectActiveStage } from "./store/timer-slice";
// firebase
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import { ToastContainer } from "react-toastify";

// import selectConfig
let isInitialTemplates = true;
let isInitialTask = true;
let isInitialSettings = true;
let isInitialProfile = true;

function App() {
  const dispatch = useDispatch();

  const taskList = useSelector(selectTaskList);
  const tasksTemplates = useSelector(selectTemplateList);
  // const taskList = createSelector(selectTaskList);

  // SPRAWDZIC SELEKTOR CZY DOBRZE NAPISANE CZY DOBRZE REAGUJĄ !

  const isTemplateChanged = useSelector(selectTemplateChanged);
  const isTaskChanged = useSelector(selectTaskListChanged);
  const isConfigChanged = useSelector(selectConfigChanges);
  const isProfileChanged = useSelector(selectProfieChanged);

  const configSettings = useSelector(selectConfig);
  // const configSettings = createSelector(selectConfig);

  const activeStage = useSelector(selectActiveStage);
  const currentUser = useSelector(selectCurrentUser);
  const userProfile = useSelector(selectUserProfile);

  // MAIN PROBLEM
  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];
  // isChanged is persistet intoLocalStorage ? !! its bad
  // pamięta po pierwszej zmienie że jest changed
  // nie wczytuje z localStorage kiedy użytkownik jest nie zalogowany !

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("ZMIANA W CURRENT USER ?");
      if (user) {
        dispatch(authActions.signUp(user));
        persistor.pause();
        console.log("ZALAGOWANY");
      } else {
        dispatch(authActions.logout());
        persistor.persist();
        console.log("WYLOGOWANY");
      }
    });
    return unsubscribe;
  }, [auth, dispatch]);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      dispatch(fetchFirebaseUserData(userId)); // redux thunk
    }
  }, [currentUser, dispatch]);

  // TO DZIAŁA OK PRZY INITIAL !! ! !!
  useEffect(() => {
    if (isInitialTask && currentUser) {
      isInitialTask = false;
      console.log("initial taskList");
      return;
    }
    if (currentUser && isTaskChanged) {
      console.log("send taskList bo loged i changed");
      const userId = currentUser.uid;
      dispatch(sendFirebaseTaskList(taskList, userId)); // array
    }
  }, [taskList, dispatch]);

  //////////////////////////////
  useEffect(() => {
    if (isInitialSettings && currentUser) {
      isInitialSettings = false;
      console.log("INITIAL SETTINGS !!!!");
      return;
    }
    if (currentUser && isConfigChanged) {
      const userId = currentUser.uid;
      console.log("send settings into firebase !!! ");
      // send settings slice but without configChanged
      dispatch(sendFirebaseSettings(configSettings, userId)); // obj
    }
  }, [configSettings, dispatch]);

  useEffect(() => {
    if (isInitialProfile && currentUser) {
      console.log("INITIAL PROFILE !!!!");

      isInitialProfile = false;
      return;
    }
    if (currentUser && isProfileChanged) {
      console.log(
        "wyslij dane POST user Data -- profile changed // i zalgoowany"
      );
      const userId = currentUser.uid;
      dispatch(sendFireBaseUserProfile(userProfile, userId));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    if (isInitialTemplates && currentUser) {
      console.log("INITIAL PROFILE !!!!");

      isInitialTemplates = false;
      return;
    }
    //  do poprawy na is TemplateChange !
    if (currentUser && isTemplateChanged) {
      console.log(
        "wyslij dane POST user Data -- profile changed // i zalgoowany"
      );
      const userId = currentUser.uid;
      dispatch(sendFirebaseTemplates(tasksTemplates, userId));
    }
  }, [tasksTemplates, dispatch]);

  const currentTheme = themeClasses[activeStage];

  return (
    <Fragment>
      <main className={`${classes.mainApp} ${classes[`${currentTheme}`]}`}>
        <Header></Header>
        <Outlet />
      </main>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppInfoSection />
              <Footer />
            </>
          }
        />
      </Routes>
      <ToastContainer
        autoClose={2000}
        position="bottom-center"
        hideProgressBar
      />
    </Fragment>
  );
}

export default App;
