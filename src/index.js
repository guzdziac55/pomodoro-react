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

let persistor = persistStore(store);
// get selector with userLogin information that is login / or no

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<App />}>
            {/* nested */}
            {/* to jest komponent wiec można go renderować dalej jako
            conditional state 
            
            {user.isLogin && (Route ... etc)}
            */}
            <Route path="/" element={<PomodoroApp />} />
            <Route path="app" element={<PomodoroApp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route
            path="*"
            //  or redirect the user !
            // Redirect To '/'  => global app
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
