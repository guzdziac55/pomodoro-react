import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

// const firebaseConfig = {
//   apiKey: "AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ",
//   authDomain: "react-http-b5eef.firebaseapp.com",
//   databaseURL: "https://react-http-b5eef-default-rtdb.firebaseio.com",
//   projectId: "react-http-b5eef",
//   storageBucket: "react-http-b5eef.appspot.com",
//   messagingSenderId: "963823465972",
//   appId: "1:963823465972:web:38fb4574af97b5075d75a1",
// };

// const app = initializeApp(firebaseConfig);
// console.log("firebase");
// console.log(app);

// react app
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
