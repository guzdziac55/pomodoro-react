import React, { useContext, useState } from "react";

//  orginal pomodoro where config is putted after save
// local storage or DB
// https://softwareengineering.stackexchange.com/questions/219953/how-is-localstorage-different-from-indexeddb

//  PLAN FOR CONFIG:
//  load config
//  LOAD: geItem From Config if exist replace with config ??
// config hook ?
// if something change in config, save and setItem LocalStorage config.

// Always create full config obj in modal {}

// coś jak userAuth w useEffect

// ConfigContext.provider
const ConfigContext = React.createContext({});

// props.children     {children}
const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    stageSeconds: [2, 10, 10],
    // config attributes
  });

  return (
    //    add modification functions here
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

// wexportuj hooka customowego: jest on funckja
export const useConfig = () => {
  const config = useContext(ConfigContext);
  if (!config) {
    throw Error("configneeds to be used inside config");
  }
  return config;
};

export default ConfigProvider;

// //   change config
// const changeConfig = (e) => {
//   // pass obj with name into it and overWrite
//   // np: stageSecounds: timenew
//   setConfig({ ...config, [e.target.name]: e.target.value });
// };
