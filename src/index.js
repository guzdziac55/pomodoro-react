import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import store from "./store";
import Login from "./components/auth/login";
import PomodoroApp from "./pages/PomodoroApp";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Profile from "./pages/Profile";
import ResetPassword from "./components/auth/resetPassword";
import SignUp from "./components/auth/signUp";
import Header from "./components/Layout/Header";
import AppPage from "./pages/AppPage";
import AppInfo from "./components/AppInfoSection/AppInfo";

let persistor = persistStore(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<App />}>
            {/* nested */}
            <Route path="/" element={<PomodoroApp />} />
            <Route path="app" element={<PomodoroApp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
