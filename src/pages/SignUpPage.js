import React from "react";
import SignUp from "../components/auth/signUp";
import classes from "./SignUpPage.module.css";
import LayoutComponent from "./LayoutComponent";

const SignUpPage = () => {
  return (
    <LayoutComponent>
      <div className={classes.containerFull}>
        <SignUp></SignUp>
      </div>
    </LayoutComponent>
  );
};

export default SignUpPage;
