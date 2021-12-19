import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const persistor = persistStore(store);
//  app page move it into better folder structure Pages !
const App = React.lazy(() => import("./App"));
const PomodoroApp = React.lazy(() => import("./pages/PomodoroApp"));
const Login = React.lazy(() => import("./components/auth/login"));
const SignUp = React.lazy(() => import("./components/auth/signUp"));
const ResetPassword = React.lazy(() =>
  import("./components/auth/resetPassword")
);

// persistor.pause();
const Routing = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Suspense fallback={<p>LOADING...</p>}>
      <Routes>
        {/* OR spinner here !  */}
        <Route path="/" element={<App />}>
          <Route path="/" element={<PomodoroApp />} />
          <Route path="app" element={<PomodoroApp />} />
          {/* {currentUser && <Route path="profile" element={<Profile />} />} */}
          {!currentUser && <Route path="login" element={<Login />} />}
          <Route path="signup" element={<SignUp />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  );
};

const RenderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routing />
          <ToastContainer
            autoClose={2000}
            position="bottom-center"
            hideProgressBar
          />
        </PersistGate>
      </Provider>
    </BrowserRouter>,

    document.getElementById("root")
  );
};
RenderApp();
