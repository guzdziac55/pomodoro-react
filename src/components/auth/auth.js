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

  // create 2 thunk functions or more with
  //  createAcc
  //  login / Logout   // add Thunk with dispatches function inside
  //  When Logout call logoutDispatch Action and, make LocalStorageRemove etc
  //  When Login // setLocalStorageState // calculateTime + make dispatch Login

  // login or Create ACC
  const submitForm = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (isLogin) {
      dispatch(authLogin(enteredEmail, enteredPassword)); // uruchomienie głównej funkcji
    } else {
      dispatch(authCreateAcc(enteredEmail, enteredPassword));
    }
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
