import { useEffect } from "react";
import { auth } from "../../firebase";
import { signUp, logout } from "../../store/auth-slice";
import { persistor } from "../..";
import { useDispatch } from "react-redux";

const usePersistControl = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //   if user changed
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signUp(user));
        persistor.pause();
      } else {
        dispatch(logout());
        persistor.persist();
      }
    });
  }, [auth, dispatch]);
};

export default usePersistControl;
