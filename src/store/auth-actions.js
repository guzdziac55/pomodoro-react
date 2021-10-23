import { authActions } from "./auth-slice";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // from firebase.js initial app auth
import { uiActions } from "./ui-slice";

let logoutTimerId;

// exp time = current new date Time + fetched time OBj login
export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); // zamiana na ms
  const adjExpirationTime = new Date(expirationTime).getTime(); // zamiana na ms
  const remainingDuration = adjExpirationTime - currentTime; // rożnica w ms
  return remainingDuration;
};

export const authLogin = (email, password) => {
  return async (dispatch) => {
    const loginRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error.message);
      }

      const data = await response.json();
      return data;
    };

    try {
      const dataToken = await loginRequest(); // get token with http method
      const expirationTime = new Date(new Date().getTime() + 5 * 1000);

      localStorage.setItem("token", dataToken.idqToken);
      localStorage.setItem("expirationTime", expirationTime);

      // we need dispatch heree to set login token
      // in aPI firebase we got observer for this
      dispatch(authActions.login(dataToken.idToken)); // redux store action => store TOKEN

      const remainingTime = calculateRemainingTime(expirationTime);
      // to pasuje przenieść gdzieś indziej
      logoutTimerId = setTimeout(() => dispatch(authlogout()), remainingTime); // set TIMEOUT to logout
    } catch (err) {
      alert(err);
    }
  };
};

export const authlogout = () => {
  return (dispatch) => {
    dispatch(authActions.logout());
    if (logoutTimerId) clearTimeout(logoutTimerId);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  };
};

// create ACC
// api key: AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ

export const authCreateAcc = (email, password) => {
  const createAccRequest = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhhAeYB4ka4SlGiRpy-lHDT7UFCEOjRGQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error.message);
    }
  };

  try {
    createAccRequest();
  } catch (err) {
    alert(err);
  }
};

export const fireBaseCreateACC = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password); // async make await
    console.log("poprawnie stworzony user");
  } catch (error) {
    console.log(error);
  }
};

export const fireBaseLoginACC2 = (email, password) => {
  return async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password); // async make await
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success...",
          message: "login success",
        })
      );
      console.log("succes");
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "some error !",
          message: "login failed ! ",
        })
      );
    }
  };
};

export const fireBaseLoginACC = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password); // async make await
    console.log("poprawnie stworzony user");
  } catch (error) {
    console.log(error);
  }
};

export const fireBaseLogout = async () => {
  try {
    await auth.signOut(); // async make await
    //  history.push('/login')  => move user to this page after
    console.log("poprawnie stworzony user");
  } catch (error) {
    console.log(error);
  }
};
export const fireBaseResetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email); // async make await
    //  history.push('/login')  => move user to this page after
    console.log("poprawnie stworzony user");
  } catch (error) {
    console.log(error);
  }
};

//  use UI SLICE TO handle error >????
// get and print error into component
// handle error + habdle is loading
