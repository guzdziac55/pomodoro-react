import React, { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./auth.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { authLogin, authCreateAcc } from "../../store/auth-actions";

const Auth = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModelHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // expirationTime = czas z tokena np 3600
  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime(); // aktualna data w ms
    const adjExpirationTime = new Date(expirationTime).getTime(); // data wygasniecia w ms
    const remainingDuration = adjExpirationTime - currentTime; // czas do wygaśniecia w ms
    return remainingDuration;
  };

  // create 2 thunk functions or more with
  //  createAcc
  //  login / Logout   // add Thunk with dispatches function inside
  //  When Logout call logoutDispatch Action and, make LocalStorageRemove etc
  //  When Login // setLocalStorageState // calculateTime + make dispatch Login

  const createAcc = async (url, email, password) => {
    let logoutTimerId;
    setIsLoading(true);

    const sendRequest = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        setIsLoading(false);
        throw new Error(err.error.message);
      }
      return response;
    };

    try {
      const response = await sendRequest();
      const data = await response.json();

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      ); // czas przyszły wygasniecia tokena w postaci daty
      // local storage
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("expirationTime", data.expiresIn);

      const remainingTime = calculateRemainingTime(expirationTime);

      dispatch(authActions.login(data.idToken)); // make login

      logoutTimerId = setTimeout(
        () => dispatch(authActions.login()),
        remainingTime
      );
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    let url;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (isLogin) {
      dispatch(authLogin(enteredEmail, enteredPassword));

      // url =
      //   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ";
    } else {
      // url =
      dispatch(authCreateAcc(enteredEmail, enteredPassword));
      //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ";
    }
    // createAcc(url, enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.auth}>
      <form onSubmit={submitForm} className={classes.form}>
        <Input
          useRef={emailRef}
          label="email"
          input={{
            id: "email",
            type: "email",
            name: "email",
            placeholder: "type your email here",
          }}
        />
        <Input
          label="password"
          useRef={passwordRef}
          input={{
            id: "password",
            type: "password",
            name: "password",
            placeholder: "type your password here",
          }}
        />
        {!isLoading && <button>{isLogin ? "LOGIN" : "CREATE ACCOUNT"}</button>}
        {/* loading spinner later */}
        {isLoading && <p>Loading ...</p>}
        <button type="button" onClick={switchAuthModelHandler}>
          {isLogin ? "Create new Account" : "Login with existing account"}Submit
        </button>
      </form>
    </Card>
  );
};

export default Auth;
