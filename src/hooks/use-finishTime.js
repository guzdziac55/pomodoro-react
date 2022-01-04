import { useState, useEffect, useCallback } from "react";

// three rerenders becouse of initial state from redux / localStorage / firebase

export const useFinishTime = (timeAdd) => {
  const [finishTime, setFinishTime] = useState(null);

  const calculateFinishTime = useCallback(() => {
    const currentTime = new Date();
    const calculatedTime = new Date(currentTime.getTime() + timeAdd * 60000);

    console.log("RUNNING USE FINISH TIME =---------");
    // cl nie działa na zmiany !!
    const hours =
      calculatedTime.getHours() < 10
        ? "0" + calculatedTime.getHours()
        : calculatedTime.getHours();
    const minutes =
      calculatedTime.getMinutes() < 10
        ? "0" + calculatedTime.getMinutes()
        : calculatedTime.getMinutes();

    setFinishTime(`${hours}:${minutes}`);
  }, [timeAdd]);

  useEffect(() => {
    calculateFinishTime();
  }, [calculateFinishTime]);

  return { finishTime };
};
