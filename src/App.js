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
import { ToastContainer } from "react-toastify";

import usePersistControl from "./hooks/fetchHooks/use-persistControl";
import useFetchUserData from "./hooks/fetchHooks/use-fetchUserData";
import useSendTaskList from "./hooks/postHooks/use-sendTaskList";
import useSendSettings from "./hooks/postHooks/use-sendSettings";
import useSendUserProfile from "./hooks/postHooks/use-sendUserProfile";
import useSendTemplates from "./hooks/postHooks/use-sendTemplates";

function App() {
  const activeStage = useSelector(selectActiveStage);
  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];

  //  CONTROl initial data
  usePersistControl();
  useFetchUserData();
  useSendTaskList();
  useSendSettings();
  useSendUserProfile();
  useSendTemplates();

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
