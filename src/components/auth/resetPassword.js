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
      {error && <p className={classes.error}>{error}</p>}

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
            <button className={classes.login}>Reset Password</button>
          )}
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

export default ResetPassword;
