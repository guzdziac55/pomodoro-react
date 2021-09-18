import React, { useContext, useState } from "react";

const TimerContext = React.createContext({});

// props.children     {children}

// ...config, setConfig( 10 )

const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState({
    activeStage: 0,
    ticking: false,
    consumedSeconds: 0,
  });

  const setActiveStage = (option) => {
    setTimer((prevOptions) => {
      return { ...prevOptions, activeStage: option };
    });
  };

  //start Stop toogle
  const toggleTicking = () => {
    setTimer((prevOptions) => {
      return { ...prevOptions, ticking: !timer.ticking };
    });
  };

  const consumeTime = () => {
    setTimer((prevOptions) => {
      return { ...prevOptions, consumedSeconds: timer.consumedSeconds + 1 };
    });
  };

  const resetConsumeTime = () => {
    setTimer((prevOptions) => {
      return { ...prevOptions, consumedSeconds: 0 };
    });
  };

  return (
    //    add modification functions here

    // sprawdzić czy da siętak value={{ state:timer, dispatch: akcje}}

    <TimerContext.Provider
      value={{
        timer,
        setActiveStage,
        toggleTicking,
        consumeTime,
        resetConsumeTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// wexportuj hooka customowego: jest on funckja
export const useTimer = () => {
  const timer = useContext(TimerContext);
  if (!timer) {
    throw Error("configneeds to be used inside config");
  }
  return timer;
};

export default TimerProvider;
