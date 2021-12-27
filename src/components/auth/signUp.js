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

      <Card className={classes.auth}>
        <form onSubmit={submitForm} className={classes.form}>
          <button
            type="button"
            onClick={() => {
              window.alert("this function currently not working yet ! ");
            }}
            class={classes.btnGoogleLogin}
          >
            <FcGoogle />
            <span>Sign up with Google</span>
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
          <button>
            <span>Sign up with email</span>
          </button>
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

export default SignUp;
