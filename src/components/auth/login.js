import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { MdDone } from "react-icons/md";
import { authLogin, authCreateAcc } from "../../store/auth-actions";
import { fireBaseLoginACC2 } from "../../store/auth-actions";
import { useSelector } from "react-redux";
import Notifications from "../UI/Notifications";

const Login = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

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
    const enteredPassword = passwordRef.current.value;
    // fireBaseLoginACC(enteredEmail, enteredPassword);
    dispatch(fireBaseLoginACC2(enteredEmail, enteredPassword));

    // dispatch(authLogin(enteredEmail, enteredPassword));
  };

  return (
    <>
      <Link to="/">
        <span className={classes.headerButton}>
          <MdDone className={classes.headerIcon} /> Pomodoro
        </span>
      </Link>

      <h1 className={classes.header}>Login</h1>
      {notification && (
        <Notifications
          status={notification.status} // state from ui Slice
          title={notification.title} // state from ui Slice
          error={notification.error} // state from ui Slice
          isLoading={notification.isLoading}
        />
      )}
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
    </>
  );
};

// forgot password ==> link to ==> Route wwww./reset-password
// create new Account ==> link to ==> Route wwww./signup

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
