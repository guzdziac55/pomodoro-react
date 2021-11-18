import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import store from "./store";
import { useSelector } from "react-redux";
import Login from "./components/auth/login";
import PomodoroApp from "./pages/PomodoroApp";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Profile from "./pages/Profile";
import ResetPassword from "./components/auth/resetPassword";
import SignUp from "./components/auth/signUp";
import selectCurrentUser from "./store/auth-slice";

let persistor = persistStore(store);

// to może być tylko w komponencie wywołane
const Routing = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<PomodoroApp />} />
        <Route path="app" element={<PomodoroApp />} />
        {currentUser && <Route path="profile" element={<Profile />} />}
        {!currentUser && <Route path="login" element={<Login />} />}
        <Route path="signup" element={<SignUp />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

// get selector with userLogin information that is login / or no
const RenderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routing />
        </PersistGate>
      </Provider>
    </BrowserRouter>,

    document.getElementById("root")
  );
};
RenderApp();
