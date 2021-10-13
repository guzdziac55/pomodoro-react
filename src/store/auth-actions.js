import { authActions } from "./auth-slice";

let logoutTimerId;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); // aktualna data w ms
  const adjExpirationTime = new Date(expirationTime).getTime(); // data wygasniecia w ms
  const remainingDuration = adjExpirationTime - currentTime; // czas do wygaśniecia w ms
  return remainingDuration;
};

export const authLogin = (email, password) => {
  return async (dispatch) => {
    //
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
      const dataToken = await loginRequest();
      const expirationTime = new Date(
        new Date().getTime() + +dataToken.expiresIn * 1000
      );
      const remainingTime = calculateRemainingTime(expirationTime);

      dispatch(authActions.login(dataToken.idToken));
      logoutTimerId = setTimeout(
        () => dispatch(authActions.logout()),
        remainingTime
      );

      // działa !
      //   console.log("login");
      //   console.log(dataToken);
      //   console.log(logoutTimerId);
    } catch (err) {
      alert(err);
    }
  };
};

export const authlogout = (dispatch) => {
  dispatch(authActions.logout());
  localStorage.removeItem("token");
};

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
    console.log("koniec create acc");
  } catch (err) {
    alert(err);
  }
};
