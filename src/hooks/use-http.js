import React, { useCallback } from "react";
import { useState } from "react";
import { set } from "react-hook-form";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka

  const sendRequest = useCallback(
    async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed"); // throw to the frist catch
        }
        0;
        const data = await response.json(); // make obj from strin
        if (applyData) {
          applyData(data); // callback execute data
          // np transformTasks and putinto UseState ! "? "
        }
      } catch (err) {
        setError(err.message || "Something goes wrong");
      }
      setIsLoading(false);
    },
    [] // tu był reuqest config ale przenieslimy go z extermal
  ); // też jest obiektem i funkcja
  //
  //
  // za każdym razem jest to inny obiekt i inna funkcja //
  // musimy znaleźć źródło gdzie jest wstawiana

  // we need to return specyfic sendRequest
  //   we put configData into HOOK, and hook will return for us specyfic function
  return { isLoading, error, sendRequest };
};
export default useHttp;

//  returning specyfic function from hook ?
//  is that HighOrderFunction ? Check it next ?!?!?!?!

// return error , set
//  states
//  is loading
//  error
//  tasks ? too specific
