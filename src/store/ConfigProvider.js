import React, { useContext, useEffect, useState } from "react";
//  orginal pomodoro where config is putted after save
// local storage or DB
// https://softwareengineering.stackexchange.com/questions/219953/how-is-localstorage-different-from-indexeddb

//  PLAN FOR CONFIG:
//  load config
//  LOAD: geItem From Config if exist replace with config ??
// config hook ?
// if something change in config, save and setItem LocalStorage config.

// Always create full config obj in modal {}

const ConfigContext = React.createContext({});

// props.children     {children}
const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    stageSeconds: [1440, 300, 900],
  });

  const signIn = async ({ login, password }) => {
    try {
      const response = await axios.post("/login", {
        login,
        password,
      });
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      dispatchError("Invalid email or password");
    }
  };

  //   change config
  const changeConfig = (e) => {
    // pass obj with name into it and overWrite
    // np: stageSecounds: timenew
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  return (
    //    add modification functions here
    <ConfigContext.Provider value={{ config }}>
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
