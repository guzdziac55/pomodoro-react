import { selectCurrentUser } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectConfigChanges } from "../../store/config-slice";
import { sendFirebaseSettings } from "../../store/thunks/taskList-actions";
import { selectConfig } from "../../store/config-slice";

const useSendSettings = () => {
  const [isInitial, setIsInitial] = useState(true);
  const configSettings = useSelector(selectConfig);
  const currentUser = useSelector(selectCurrentUser);

  const isConfigChanged = useSelector(selectConfigChanges);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial && currentUser) {
      setIsInitial(false);
      return;
    }

    if (currentUser && isConfigChanged) {
      // we can pickup taskList inside thunk !
      // we can pickup userUID inside thunk !
      dispatch(sendFirebaseSettings(configSettings, currentUser.uid));
    }
    // configSettings is Object = > but when we make changess Form saving
    // config settings as a new object
  }, [configSettings, dispatch]);
};

export default useSendSettings;
