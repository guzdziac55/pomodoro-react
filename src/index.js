import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import App from "./App";
import RouterConfig from "./pages/routers/RouterConfig";

export const persistor = persistStore(store);

const RenderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* put routerconfig inside aPP .js */}
            {/* <RouterConfig /> */}
            <App />
            <ToastContainer
              autoClose={2000}
              position="bottom-center"
              hideProgressBar
            />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </BrowserRouter>,

    document.getElementById("root")
  );
};
RenderApp();
