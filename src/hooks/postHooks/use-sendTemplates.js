import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../store/auth-slice";
import { sendFirebaseTemplates } from "../../store/thunks/taskList-actions";

import {
  selectTemplateChanged,
  selectTemplateList,
} from "../../store/taskList-slice";

// detecting changes on taskTemplate
// after detec calls function send template

//  we need to sendFirebase after click

const useSendTemplates = () => {
  const dispatch = useDispatch();
  const [isInitial, setIsInitial] = useState(true);
  const currentUser = useSelector(selectCurrentUser);

  const taskTemplates = useSelector(selectTemplateList);
  const isTemplatesChanged = useSelector(selectTemplateChanged);

  useEffect(() => {
    if (isInitial && currentUser) {
      setIsInitial(false);
      return;
    }

    if (currentUser && isTemplatesChanged) {
      // we can pickup taskList inside thunk !
      // we can pickup userUID inside thunk !
      dispatch(sendFirebaseTemplates(taskTemplates, currentUser.uid));
    }
    // configSettings is Object = > but when we make changess Form saving
    // config settings as a new object
  }, [taskTemplates, dispatch]);
};

export default useSendTemplates;
