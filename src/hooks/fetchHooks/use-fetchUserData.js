import { fetchFirebaseUserData } from "../../store/thunks/taskList-actions";
import { selectCurrentUser } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useFetchUserData = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // calls after login
  useEffect(() => {
    if (currentUser) dispatch(fetchFirebaseUserData(currentUser.uid));
  }, [currentUser, dispatch]);
};

export default useFetchUserData;

// clcik send
// call dispatch send ?  or normall call sendFirebase async function
// send object stateWeekplan to firebase

// reaload
// fetch data from weekplan
// call useFetch userData in useEffect in weekPlan Page
// put state down from props to useState initial ?
// sprawdzićczy zadziała
