// import { calculateRemainingTime } from "./auth-actions";
import { createSlice } from "@reduxjs/toolkit";

// put this here and import ub auth Actions
// pewnie redux slice jest inicjonowany przed auth Actions i nie widzi funkcji
// trzeba to sprawdzić
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); // zamiana na ms
  const adjExpirationTime = new Date(expirationTime).getTime(); // zamiana na ms
  const remainingDuration = adjExpirationTime - currentTime; // rożnica w ms
  return remainingDuration;
};

// to może być custom hook zwraca State Storedtoken i ExpTime ?
// mozna to przenieść do local Storage
const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationDate); // data wygaśnięcia

  if (remainingTime < 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const tokenData = retriveStoredToken(); // zmieni sie jesli zmieni sie token lub zmieni sie date
let initialToken;
if (tokenData) {
  initialToken = tokenData.token;
}

// useEffect(() => {
//   if (tokenData) {
//     console.log(tokenData.duration);
//     logoutTimer = setTimeout(logout, tokenData.duration);
//   }
// }, [tokenData]);

// const isLoggedIn = !!initialToken;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // token: initialToken,
    // isLogged: isLoggedIn,
    currentUser: null,
  },
  // get from helper function when localStorage is aviable token and time
  //  wiekszy niz 0 i token istnieje => set this into LocalStorage
  reducers: {
    logout(state) {
      state.currentUser = null;
    },

    singUp(state, action) {
      state.currentUser = action.payload;
    },
    // login(state, action) {
    //   state.token = action.payload;
    //   state.isLogged = !!state.token;
    // },
  },
});

// IMPORTTANT IMPLEMENT WHEN U GET NEW TOKEN DATA
// useEffect(() => {
//   // IDTIMEOUT = SETTIMEOUT(LOGOUTHANDLER , DATATOKEN.DURATION )   // SET NEW LOGAUNT BECOUSE WE GET NEW TOKEN
//   return () => {
//     cleanup;
//   };
// }, [TOKEN]);

// localStorage.setItem("token", token); // store token better inside redux action
// localStorage.removeItem("token");

export const authActions = authSlice.actions;
export default authSlice;
