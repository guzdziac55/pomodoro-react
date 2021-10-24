import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./signUp.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAuthCreateAcc } from "../../hooks/use-auth";

const SignUp = () => {
  const { isLoading, error, authCreateAcc } = useAuthCreateAcc();

  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const submitForm = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    authCreateAcc(enteredEmail, enteredPassword);
    console.log(JSON.stringify(currentUser));
  };

  return (
    <>
      <Link to="/">
        <span className={classes.headerButton}>
          <MdDone className={classes.headerIcon} /> Pomodoro
        </span>
      </Link>

      <h1 className={classes.header}>Create Account</h1>
      <p>error is: {error}</p>
      <Card class={classes.auth}>
        <form onSubmit={submitForm} className={classes.form}>
          <button type="button" class={classes.googleLogin}>
            SignUp with Google
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
              minLength: "7",
              placeholder: "",
            }}
          />
          {!isLoading && (
            <button className={classes.login}>
              Sign up with email
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
        <span className={classes.createLabel}>Already have an account?</span>
        <Link to="/login">
          <span className={classes.createAccount}>Create account</span>
        </Link>
      </div>
    </>
  );
};

// forgot password ==> link to ==> Route wwww./reset-password
// create new Account ==> link to ==> Route wwww./signup

export default SignUp;

// create 2 thunk functions or more with
//  createAcc
//  login / Logout   // add Thunk with dispatches function inside
//  When Logout call logoutDispatch Action and, make LocalStorageRemove etc
//  When Login // setLocalStorageState // calculateTime + make dispatch Login
