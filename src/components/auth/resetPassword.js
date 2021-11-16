import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdDone } from "react-icons/md";
import { useAuthResetPassword } from "../../hooks/use-auth";

const ResetPassword = () => {
  const { isLoading, error, authResetPassword } = useAuthResetPassword();

  const emailRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    authResetPassword(enteredEmail);
  };

  return (
    <div className={classes.container}>
      <Link to="/">
        <span className={classes.headerButton}>
          <MdDone className={classes.headerIcon} /> Pomodoro
        </span>
      </Link>

      <h1 className={classes.header}> Reset Password</h1>
      <p>{error}</p>
      <Card class={classes.auth}>
        <form onSubmit={submitForm} className={classes.form}>
          <Input
            useRef={emailRef}
            label="EMAIL"
            input={{
              id: "email",
              type: "email",
              name: "email",
              placeholder: "example@mail.com",
            }}
          />

          {!isLoading && (
            <button className={classes.login}>
              Reset Password
              {/* {isLogin ? "LOGIN" : "CREATE ACCOUNT"} */}
            </button>
          )}
          {/* loading spinner later */}
          {/* {isLoading && <p>Loading ...</p>}
        <button type="button" onClick={switchAuthModelHandler}>
          {isLogin ? "Create new Account" : "Login with existing account"}Submit
        </button> */}
        </form>
      </Card>
      <div className={classes.createWrapper}>
        <span className={classes.createLabel}>Try other methods?</span>
        <Link to="/login">
          <span className={classes.createAccount}>Login</span>
        </Link>
      </div>
    </div>
  );
};

// forgot password ==> link to ==> Route wwww./reset-password
// create new Account ==> link to ==> Route wwww./signup

export default ResetPassword;

// create 2 thunk functions or more with
//  createAcc
//  login / Logout   // add Thunk with dispatches function inside
//  When Logout call logoutDispatch Action and, make LocalStorageRemove etc
//  When Login // setLocalStorageState // calculateTime + make dispatch Login

/////
// if (isLogin) {
//   dispatch(authLogin(enteredEmail, enteredPassword)); // uruchomienie głównej funkcji
// } else {
//   dispatch(authCreateAcc(enteredEmail, enteredPassword));
// }
