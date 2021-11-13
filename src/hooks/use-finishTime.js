import { useState } from "react";
import { useEffect } from "react";

// timeAdd => time to add in minutes ?
export const useFinishTime = (timeAdd) => {
  const [finishTime, setFinishTime] = useState(null);

  useEffect(() => {
    const currentTime = new Date();
    const calculatedTime = new Date(currentTime.getTime() + timeAdd * 60000);
    console.log("calculate time inside hook");
    console.log(calculatedTime);
    const hours =
      calculatedTime.getHours() < 10
        ? "0" + calculatedTime.getHours()
        : calculatedTime.getHours();
    const minutes =
      calculatedTime.getMinutes() < 10
        ? "0" + calculatedTime.getMinutes()
        : calculatedTime.getMinutes();
    // return `${hours}:${minutes}`;
    setFinishTime(`${hours}:${minutes}`);
  }, [timeAdd]);

  // timetoAdd argument => pomodoro  * time per pomodoro

  return { finishTime };
};
