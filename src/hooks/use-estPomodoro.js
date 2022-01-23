import { useState } from "react";

const useEstPomodoro = (init, min = 1, max = 9) => {
  const [currentEstPomodoro, setEstPomodoro] = useState(init);

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
