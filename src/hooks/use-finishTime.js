import { useState } from "react";
import { useEffect } from "react";

export const useFinishTime = (timeAdd) => {
  const [finishTime, setFinishTime] = useState(null);

  useEffect(() => {
    const currentTime = new Date();
    const calculatedTime = new Date(currentTime.getTime() + timeAdd * 60000);

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

  return { finishTime };
};
