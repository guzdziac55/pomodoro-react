import Header from "./components/Layout/Header";
import Timer from "./components/Timer/Timer";
import WorkingOn from "./components/WorkingOn/WorkingOn";
import classes from "./App.module.css";
import Tasks from "./components/Tasks/Tasks";
import FinishCalculate from "./components/FinishCalculate/FinishCalculate";
import HookForm from "./components/SettingsApp/SettingsApp";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendTaskData, fetchTaskData } from "./store/taskList-actions";

import Notifications from "./components/UI/Notifications";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const isChanged = useSelector((state) => state.tasksList.changed);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isChanged) {
      dispatch(sendTaskData(taskList));
    }
    // we need to send data only when add / or remove
    // we dont need to SendData when taskList changed.
    // taskList dependencies changed becouse we fetchData and set something
  }, [taskList, dispatch]);

  useEffect(() => {
    dispatch(fetchTaskData());
  }, [dispatch]);

  const isEmptyTasks =
    taskList.length === 0 || taskList === false ? true : false;
  const [settingsShow, setSettingsShow] = useState(false);

  const handleSettingsShow = () => {
    setSettingsShow(true);
  };

  const handleSettingsHide = () => {
    setSettingsShow(false);
  };

  // check what is LAYOUT IN COURSE

  return (
    <Fragment>
      {settingsShow && <HookForm onClose={handleSettingsHide} />}
      <Header onShow={handleSettingsShow}></Header>
      <main className={classes["main-app"]}>
        <Timer></Timer>
        <WorkingOn />
        <Tasks />
        {!isEmptyTasks && <FinishCalculate />}
        {/* <p>error:{error}</p>
        <p>loading{isLoading}</p> */}
        {/* check with spinner is loading or something */}
        {notification && (
          <Notifications
            status={notification.status}
            title={notification.title}
            error={notification.error}
          />
        )}
      </main>
    </Fragment>
  );
}

export default App;
