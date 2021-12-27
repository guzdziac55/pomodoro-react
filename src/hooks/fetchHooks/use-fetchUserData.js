import { fetchFirebaseUserData } from "../../store/thunks/taskList-actions";
import { selectCurrentUser } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useFetchUserData = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) dispatch(fetchFirebaseUserData(currentUser.uid));
  }, [currentUser, dispatch]);
};

export default useFetchUserData;
