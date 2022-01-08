import React from "react";

import usePersistControl from "./hooks/fetchHooks/use-persistControl";
import useFetchUserData from "./hooks/fetchHooks/use-fetchUserData";
import useSendTaskList from "./hooks/postHooks/use-sendTaskList";
import useSendSettings from "./hooks/postHooks/use-sendSettings";
import useSendUserProfile from "./hooks/postHooks/use-sendUserProfile";
import useSendTemplates from "./hooks/postHooks/use-sendTemplates";

import RouterConfig from "./pages/routers/RouterConfig";

function App() {
  usePersistControl();
  useFetchUserData();
  useSendTaskList();
  useSendSettings();
  useSendUserProfile();
  useSendTemplates();

  return <RouterConfig />;
}

export default App;
