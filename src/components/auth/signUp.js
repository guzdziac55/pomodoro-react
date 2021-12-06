import React from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./signUp.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdDone } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useAuthCreateAcc } from "../../hooks/use-auth";

const SignUp = () => {
  const { isLoading, error, authCreateAcc } = useAuthCreateAcc();

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    authCreateAcc(enteredEmail, enteredPassword);
  };

  return (
    <div className={classes.container}>
      <Link to="/">
        <span className={classes.headerButton}>
          <MdDone className={classes.headerIcon} /> Pomodoro
        </span>
      </Link>

      <h1 className={classes.header}>Create Account</h1>
      {error && <p className={classes.error}>{error}</p>}

      <Card class={classes.auth}>
        <form onSubmit={submitForm} className={classes.form}>
          <button
            type="button"
            onClick={() => {
              window.alert("this function currently not working yet ! ");
            }}
            class={classes.btnGoogleLogin}
          >
            <FcGoogle />
            Sign up with Google
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
          <button>Sign up with email</button>
        </form>
      </Card>
      <div className={classes.createWrapper}>
        <span className={classes.createLabel}>Already have an account?</span>
        <Link to="/login">
          <span className={classes.createAccount}>Go to Login</span>
        </Link>
      </div>
    </div>
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
