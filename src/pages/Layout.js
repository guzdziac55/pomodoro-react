import React from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import classes from "./Layout.module.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Layout/Header";
import AppInfoSection from "./components/AppInfoSection/AppInfoSection";
import Footer from "./components/Footer/Footer";
import InfoSection from "../components/InfoSection/InfoSection";

const Layout = () => {
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
              <InfoSection />
              {/* <AppInfoSection /> */}
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
};

export default Layout;
