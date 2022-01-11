import React from "react";
import ResetPassword from "../components/auth/resetPassword";
import classes from "./ResetPasswordPage.module.css";
import LayoutComponent from "./LayoutComponent";

const ResetPasswordPage = () => {
  return (
    <LayoutComponent>
      <div className={classes.containerFull}>
        <ResetPassword />
      </div>
    </LayoutComponent>
  );

  return;
};

export default ResetPasswordPage;
