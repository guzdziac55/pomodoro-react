import React from "react";
import Card from "../UI/Card";
import { motion } from "framer-motion";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdDone } from "react-icons/md";
import { useAuthResetPassword } from "../../hooks/use-auth";

const titeVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visable: {
    opacity: 1,
    y: 0,
  },
};

const buttonVariant = {
  hidden: {
    opacity: 0,
  },
  visable: {
    opacity: 1,
  },
};

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
      <motion.h1
        className={classes.header}
        variants={titeVariant}
        initial="hidden"
        animate="visable"
      >
        Reset Password
      </motion.h1>
      {/* <h1 className={classes.header}>Reset Password</h1> */}
      {error && <p className={classes.error}>{error}</p>}

      <Card className={classes.auth}>
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
            <motion.button
              className={classes.login}
              type="submit"
              variants={buttonVariant}
              initial="hidden"
              animate="visable"
            >
              <span>Sign up with email</span>
            </motion.button>
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
