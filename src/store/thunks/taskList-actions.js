import { showNotification } from "../ui-slice";
import { replaceTaskList } from "../taskList-slice";
import { defaultState } from "../config-slice";
import { setConfig } from "../config-slice";
import { database } from "../../firebase";
import { ref, update } from "firebase/database";
import { setAvatarUrl } from "../profile-slice";
export {
  sendFirebaseTaskList,
  sendFirebaseSettings,
  sendFireBaseUserProfile,
  fetchFirebaseUserData,
};

const sendFirebaseTaskList = (taskList, uid) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "sending...",
        message: "sending taskList Data",
      })
    );

    const sendRequest = async () => {
      update(ref(database, "users/" + uid), {
        TasksList: taskList,
      });
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          status: "success",
          title: "success...",
          message: "send taskList data success",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "some error !",
          message: "sending Tasklist data failed",
        })
      );
    }
  };
};
const sendFirebaseSettings = (settings, uid) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "sending...",
        message: "sending taskList Data",
      })
    );

    const sendRequest = async () => {
      console.log("WYSYŁAM USTAWIENIA ");
      console.log(settings);
      update(ref(database, "users/" + uid), {
        Settings: settings,
      });
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          status: "success",
          title: "success...",
          message: "send taskList data success",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "some error !",
          message: "sending Tasklist data failed",
        })
      );
    }
  };
};

const sendFireBaseUserProfile = (userProfile, uid) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "sending",
        title: "sending profile ...",
        message: "sending profile data",
      })
    );

    const sendProfileUser = async () => {
      update(ref(database, "users/" + uid), {
        UserProfile: userProfile, // object from redux
      });
    };

    try {
      await sendProfileUser(); //
      console.log("inside thunk send profile user ! ");
      dispatch(
        showNotification({
          status: "success",
          title: "success...",
          message: "send userData  success",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "some error !",
          message: "sending Tasklist data failed",
        })
      );
    }
  };
};

const fetchFirebaseUserData = (uid) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "loading",
        title: "loading...",
        message: "loading taskList Data",
      })
    );

    const fetchRequest = async () => {
      const tasksRef = database.ref("users/" + uid + "/TasksList");
      const settingsRef = database.ref("users/" + uid + "/Settings");
      const userProfileRef = database.ref("users/" + uid + "/UserProfile");
      return [tasksRef, settingsRef, userProfileRef];
    };

    try {
      const [tasksRef, settingsRef, userProfileRef] = await fetchRequest();

      const snapshotTasks = await tasksRef.once("value");
      const snapshotSettings = await settingsRef.once("value");
      const snapshotUserProfile = await userProfileRef.once("value");

      const taskListData = snapshotTasks.val();
      const settingsData = snapshotSettings.val();
      const userProfileData = snapshotUserProfile.val();

      dispatch(replaceTaskList(taskListData || []));
      dispatch(setConfig(settingsData || { ...defaultState }));
      dispatch(setAvatarUrl(userProfileData || "images/avatar1.png"));

      dispatch(
        showNotification({
          status: "success",
          title: "success...",
          message: "Data loading success",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "some error !",
          message: "loading Tasklist data failed",
        })
      );
    }
  };
};
