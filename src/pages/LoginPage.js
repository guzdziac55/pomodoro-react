import React from "react";
import Login from "../components/auth/login";
import LayoutComponent from "./LayoutComponent";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <LayoutComponent>
      <div className={classes.containerFull}>
        <Login></Login>
      </div>
    </LayoutComponent>
  );
};

export default LoginPage;
