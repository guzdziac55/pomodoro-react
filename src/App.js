import React from "react";
import classes from "./App.module.css";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import AppInfoSection from "./components/AppInfoSection/AppInfoSection";
import Footer from "./components/Footer/Footer";

import { selectActiveStage } from "./store/timer-slice";
// firebase
import { ToastContainer } from "react-toastify";

// CUSTOM HOOKS PERSIST AND FETCH
import usePersistControl from "./hooks/fetchHooks/use-persistControl";
import useFetchUserData from "./hooks/fetchHooks/use-fetchUserData";
import useSendTaskList from "./hooks/postHooks/use-sendTaskList";
import useSendSettings from "./hooks/postHooks/use-sendSettings";
import useSendUserProfile from "./hooks/postHooks/use-sendUserProfile";
import useSendTemplates from "./hooks/postHooks/use-sendTemplates";

function App() {
  const activeStage = useSelector(selectActiveStage);
  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];

  // HOOKS FETCH CONTROL
  usePersistControl();
  useFetchUserData();
  useSendTaskList();
  useSendSettings();
  useSendUserProfile();
  useSendTemplates();

  //  let fetches stay in APP.JS
  //  but route with outled below into Layout.js

  // PUT THEME CHANGE INTO REDUX ?
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

// useEffect(() => {
//   if (currentUser) {
//     const userId = currentUser.uid;
//     dispatch(fetchFirebaseUserData(userId));
//   }
// }, [currentUser, dispatch]);

// useEffect(() => {
//   if (isInitialTask && currentUser) {
//     isInitialTask = false;
//     return;
//   }
//   if (currentUser && isTaskChanged) {
//     const userId = currentUser.uid;
//     dispatch(sendFirebaseTaskList(taskList, userId)); // array
//   }
// }, [taskList, dispatch]);

// useEffect(() => {
//   if (isInitialSettings && currentUser) {
//     isInitialSettings = false;
//     console.log("INITIAL SETTINGS !!!!");
//     return;
//   }
//   if (currentUser && isConfigChanged) {
//     const userId = currentUser.uid;
//     console.log("send settings into firebase !!! ");
//     // send settings slice but without configChanged
//     dispatch(sendFirebaseSettings(configSettings, userId)); // obj
//   }
// }, [configSettings, dispatch]);

// useEffect(() => {
//   if (isInitialProfile && currentUser) {
//     console.log("INITIAL PROFILE !!!!");

//     isInitialProfile = false;
//     return;
//   }
//   if (currentUser && isProfileChanged) {
//     console.log(
//       "wyslij dane POST user Data -- profile changed // i zalgoowany"
//     );
//     const userId = currentUser.uid;
//     dispatch(sendFireBaseUserProfile(userProfile, userId));
//   }
// }, [userProfile, dispatch]);

// useEffect(() => {
//   if (isInitialTemplates && currentUser) {
//     isInitialTemplates = false;
//     return;
//   }
//   //  do poprawy na is TemplateChange !
//   if (currentUser && isTemplateChanged) {
//     console.log(
//       "wyslij dane POST user Data -- profile changed // i zalgoowany"
//     );
//     const userId = currentUser.uid;
//     dispatch(sendFirebaseTemplates(tasksTemplates, userId));
//   }
// }, [tasksTemplates, dispatch]);
