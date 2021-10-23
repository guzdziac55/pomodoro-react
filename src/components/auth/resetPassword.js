import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { MdDone } from "react-icons/md";
import { authLogin, authCreateAcc } from "../../store/auth-actions";
import { fireBaseResetPassword } from "../../store/auth-actions";
const ResetPassword = () => {
  const dispatch = useDispatch();

  // const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  // const switchAuthModelHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };

  //  validation -- musi mieć @
  // password musi mieć minimum 6 lub 9 znaków

  // login or Create ACC
  const submitForm = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    fireBaseResetPassword(enteredEmail);
    // dispatch(authLogin(enteredEmail, enteredPassword));
  };

  return (
    <>
      <Link to="/">
        <span className={classes.headerButton}>
          <MdDone className={classes.headerIcon} /> Pomodoro
        </span>
      </Link>

      <h1 className={classes.header}> Reset Password</h1>
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
    </>
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
