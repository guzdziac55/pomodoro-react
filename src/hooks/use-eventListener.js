import { useRef, useEffect } from "react";

export const useEventListener = (eventType, callback, element = window) => {
  const callBackRef = useRef(callback);
  useEffect(() => {
    callBackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e) => callBackRef.current(e);
    element.addEventListener(eventType, handler, true);

    return () => {
      element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};

// mamy dwie funkcje == > outside click
// oraz hideBTN => setOpen(false)

// btnNote.addEventListener("click",(e)=>{

// })
