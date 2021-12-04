import { useCallback } from "react";
import { useState } from "react";

export const useCheckImage = () => {
  const [imageExist, setImageExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const checkImage = useCallback((url) => {
    setIsLoading(true);
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
      let status = request.status;
      if (request.status == 200) {
        console.log("istnieje");
        setImageExist(true);
      } else {
        // toastify !
        console.log("brak obrazka");
        setImageExist(false);
      }
      setIsLoading(false);
    };
  }, []);
  return [imageExist, isLoading, checkImage];
};
