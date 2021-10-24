import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// const app =  firebase.initializeApp( {config })
//  initial app + config = app
// app.auth()
const app = firebase.initializeApp({
  apiKey: "AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ",
  authDomain: "react-http-b5eef.firebaseapp.com",
  databaseURL: "https://react-http-b5eef-default-rtdb.firebaseio.com",
  projectId: "react-http-b5eef",
  storageBucket: "react-http-b5eef.appspot.com",
  messagingSenderId: "963823465972",
  appId: "1:963823465972:web:38fb4574af97b5075d75a1",
});

// mozna przerobić na obiekt.
// app.auth
// app.database
export const auth = app.auth();
export const database = app.database();
// need to import
// ref
// set

export default app;

// old method

// const firebaseConfig = {
//     apiKey: "AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ",
//     authDomain: "react-http-b5eef.firebaseapp.com",
//     databaseURL: "https://react-http-b5eef-default-rtdb.firebaseio.com",
//     projectId: "react-http-b5eef",
//     storageBucket: "react-http-b5eef.appspot.com",
//     messagingSenderId: "963823465972",
//     appId: "1:963823465972:web:38fb4574af97b5075d75a1",
//   };
