import React from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdDone } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useAuthLogin } from "../../hooks/use-auth";

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
            <span>Login with Google</span>
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

          <button type="submit">
            <span>LOGIN</span>
          </button>

          <Link className={classes.forgotPass} to="/reset-password">
            <span>Forgot Password</span>
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
