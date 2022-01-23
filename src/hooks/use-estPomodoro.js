import { useState } from "react";

const useEstPomodoro = (initial = 1, min = 1, max = 10) => {
  const [currentEstPomodoro, setEstPomodoro] = useState(initial);

  const addEstPomodoro = () => {
    if (currentEstPomodoro >= max) return;
    setEstPomodoro((prevAct) => prevAct + 1);
  };

  const removeEstPomodoro = () => {
    if (currentEstPomodoro <= min) return;
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
