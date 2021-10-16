import { authActions } from "./auth-slice";

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
      const dataToken = await loginRequest();
      const expirationTime = new Date(new Date().getTime() + 5 * 1000);

      localStorage.setItem("token", dataToken.idqToken);
      localStorage.setItem("expirationTime", expirationTime);

      dispatch(authActions.login(dataToken.idToken));

      const remainingTime = calculateRemainingTime(expirationTime);
      // to pasuje przenieść gdzieś indziej
      logoutTimerId = setTimeout(() => dispatch(authlogout()), remainingTime);
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
