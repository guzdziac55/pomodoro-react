import React, { useRef, useEffect } from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import classes from "./Layout.module.css";
import "react-toastify/dist/ReactToastify.css";
import { selectActiveStage } from "../store/timer-slice";
import { createRef } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer";
import InfoSection from "../components/InfoSection/InfoSection";
import usePersistControl from "../hooks/fetchHooks/use-persistControl";
import useFetchUserData from "../hooks/fetchHooks/use-fetchUserData";
import useSendTaskList from "../hooks/postHooks/use-sendTaskList";
import useSendSettings from "../hooks/postHooks/use-sendSettings";
import useSendUserProfile from "../hooks/postHooks/use-sendUserProfile";
import useSendTemplates from "../hooks/postHooks/use-sendTemplates";

const Layout = () => {
  const activeStage = useSelector(selectActiveStage);
  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];
  const currentTheme = themeClasses[activeStage];

  const refInfo = createRef();
  console.log(refInfo);

  useEffect(() => {
    console.log(refInfo);
  }, []);

  usePersistControl();
  useFetchUserData();
  useSendTaskList();
  useSendSettings();
  useSendUserProfile();
  useSendTemplates();

  return (
    <Fragment>
      <main className={`${classes.mainApp} ${classes[`${currentTheme}`]}`}>
        <Header></Header>
        <Outlet />

        {/* ROUTES HERE  */}

        {/* wyciągnąć z main 100vh i dać do kazdego elementu w Outlecie ! */}
      </main>

      <ToastContainer
        autoClose={2000}
        position="bottom-center"
        hideProgressBar
      />
    </Fragment>
  );
};

export default Layout;

// <Routes>
// <Route
//   path="/"
//   element={
//     <>
//       {/* info section ref musi widzieć się z APP.PAge */}
//       <InfoSection ref={refInfo} />
//       <Footer />
//     </>
//   }
// />
// </Routes>
