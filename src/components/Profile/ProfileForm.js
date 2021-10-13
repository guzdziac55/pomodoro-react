import Card from "../UI/Card";
import React from "react";
import classes from "./ProfileForm.module.css";
import Input from "../UI/Input";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userToken = useSelector((state) => state.auth.token);
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const restartPassword = async (url, token, password) => {
    try {
      setIsLoading(true);

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: password,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error.message);
      }

      const data = response.json();
      history.replace("/");
    } catch (err) {
      alert(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("im handling submit bro");

    const enteredPassword = passwordRef.current.value;
    console.log(enteredPassword);
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ";

    restartPassword(url, userToken, enteredPassword);
  };

  return (
    <Card className={classes.auth}>
      <form onSubmit={submitHandler} className={classes.form}>
        <Input
          useRef={passwordRef}
          label="change Password"
          input={{
            id: "password",
            type: "password",
            name: "password",
            placeholder: "type your password here to restart",
          }}
        />

        {/* loading spinner later */}
        {isLoading && <p>Loading ...</p>}
        <button>change password</button>
      </form>
    </Card>
  );
};

export default ProfileForm;
