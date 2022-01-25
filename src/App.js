import React from "react";

import usePersistControl from "./hooks/fetchHooks/use-persistControl";
import useFetchUserData from "./hooks/fetchHooks/use-fetchUserData";
import useSendTaskList from "./hooks/postHooks/use-sendTaskList";
import useSendSettings from "./hooks/postHooks/use-sendSettings";
import useSendUserProfile from "./hooks/postHooks/use-sendUserProfile";
import useSendTemplates from "./hooks/postHooks/use-sendTemplates";

import RouterConfig from "./pages/routers/RouterConfig";
import useSendWeekPlan from "./hooks/postHooks/use-sendWeekPlan";

// main app is never closed // its first timerunned when app start
// when pages are changed the Hook is not running again becouse of App()

function App() {
  // getUserDAta  => run only when user is currently loged IN> check currentUser ?
  useFetchUserData();

  usePersistControl();

  // send Hook  changes detectors
  useSendTaskList();
  useSendSettings();
  useSendUserProfile();
  useSendTemplates();
  useSendWeekPlan();

  return <RouterConfig />;
}

export default App;
