import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../store/auth-slice";
import { sendFirebaseWeekPlan } from "../../store/thunks/taskList-actions";

import {
  selectWeekPlanChanged,
  selectWeekPlan,
} from "../../store/weekPlan-slice";

const useSendWeekPlan = () => {
  const dispatch = useDispatch();
  const [isInitial, setIsInitial] = useState(true);
  const currentUser = useSelector(selectCurrentUser);

  const weekPlan = useSelector(selectWeekPlan); // if any changes => call Post function with thunk
  const isweekPlanChanged = useSelector(selectWeekPlanChanged);

  useEffect(() => {
    if (isInitial && currentUser) {
      setIsInitial(false);
      return;
    }

    if (currentUser && isweekPlanChanged) {
      dispatch(sendFirebaseWeekPlan(weekPlan, currentUser.uid));
    }
  }, [weekPlan, dispatch]);
};

export default useSendWeekPlan;
