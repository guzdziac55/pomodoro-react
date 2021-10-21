import React from "react";
import { useState } from "react";

const useEstPomodoro = (initial = 1) => {
  const [currentEstPomodoro, setEstPomodoro] = useState(initial);

  const addEstPomodoro = () => {
    setEstPomodoro((prevAct) => prevAct + 1);
  };

  const removeEstPomodoro = () => {
    setEstPomodoro((prevAct) => prevAct - 1);
  };

  return [
    currentEstPomodoro,
    addEstPomodoro,
    removeEstPomodoro,
    setEstPomodoro,
  ];
};
export default useEstPomodoro;
