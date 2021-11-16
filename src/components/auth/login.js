import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdDone } from "react-icons/md";
import { useAuthLogin } from "../../hooks/use-auth";

// we dont need dispach Thunks here  //  we have userAuth observer
// login or Create ACC

const Login = () => {
  const { isLoading, error, authLogin } = useAuthLogin();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    authLogin(enteredEmail, enteredPassword);
  };

  return (
    <div className={classes.container}>
      <Link to="/">
        <span className={classes.headerButton}>
          <MdDone className={classes.headerIcon} /> Pomodoro
        </span>
      </Link>

      <h1 className={classes.header}>Login</h1>
      <p>error is: {error}</p>
      <Card class={classes.auth}>
        <form onSubmit={submitForm} className={classes.form}>
          <button type="button" class={classes.googleLogin}>
            Login with Google
          </button>
          <span class={classes.break}>or</span>
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
          <Input
            label="PASSWORD"
            useRef={passwordRef}
            input={{
              id: "password",
              type: "password",
              name: "password",
              placeholder: "",
            }}
          />
          {!isLoading && (
            <button className={classes.login}>
              LOGIN
              {/* {isLogin ? "LOGIN" : "CREATE ACCOUNT"} */}
            </button>
          )}
          {/* loading spinner later */}
          {/* {isLoading && <p>Loading ...</p>}
        <button type="button" onClick={switchAuthModelHandler}>
          {isLogin ? "Create new Account" : "Login with existing account"}Submit
        </button> */}
          <Link to="/reset-password">
            <span className={classes.forgotPass}>Forgot Password</span>
          </Link>
        </form>
      </Card>
      <div className={classes.createWrapper}>
        <span className={classes.createLabel}>Do not have an account?</span>
        <Link to="/signup">
          <span className={classes.createAccount}>Create account</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;

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
