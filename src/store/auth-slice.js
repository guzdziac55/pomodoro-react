import { createSlice } from "@reduxjs/toolkit";

// createCustomHook for CalcRemainingTime /// return RemainingTime // reuse

// to może być custom hook zwraca State Storedtoken i ExpTime ?
const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  // expiration time 3600 ms * 1000 => w sekundach np 1h   + current Time i zamienić na date
  //  czyli data przyszłościowa

  const currentTime = new Date().getTime(); // aktualna data w ms
  const adjExpirationTime = new Date(storedExpirationDate).getTime(); // data wygasniecia w ms
  const remainingDuration = adjExpirationTime - currentTime;

  if (remainingDuration < 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  //  jeśli poprawne wrzuć do initiala
  return {
    token: storedToken,
    duration: remainingDuration,
  };
};

//  remeiningTime =  calculateRemaininTime ( storedExpirationDate)
// if(remeinigTime < 0 ){
// localStorage.removeItem('token')
// localStorage.removeItem('expirationTime ')
// return null
// }
// if()

//  jeśli nie spełni warunku i jest wiekszy od 0 czyli aktywny to
//   SetIntoReduxState
//  return obj  {
// token: storedToken
// duration: remainingTime
// }

const tokenData = retriveStoredToken;
let initialToken;
if (tokenData) {
  initialToken = tokenData.token;
}

// useEffect(() => {
//   if (tokenData) {
//     //  tokenData form initial LocalStorage if getItem is Strue
//     // logoutTimer = setTimout(dispatchLogout, tokenData.duration)
//   }
// }, [tokenData]);

const isLoggedIn = !!initialToken;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // get from helper function when localStorage is aviable token and time
    //  wiekszy niz 0 i token istnieje => set this into LocalStorage
    token: initialToken,
    isLogged: isLoggedIn,
  },
  reducers: {
    login(state, action) {
      // console.log("login function");
      state.token = action.payload;
      state.isLogged = !!state.token;
    },

    logout(state) {
      // console.log("calls logout");

      state.token = null;
      state.isLogged = !!state.token;
    },
  },
});

// localStorage.setItem("token", token); // store token better inside redux action
// localStorage.removeItem("token");

export const authActions = authSlice.actions;
export default authSlice;
