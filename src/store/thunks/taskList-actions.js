import { showNotification } from "../ui-slice";
import { replaceTaskList, replaceTemplatesList } from "../taskList-slice";
import { defaultConfigState } from "../config-slice";
import { defaultProfileState } from "../profile-slice";
import { defaultWeekPlan } from "../weekPlan-slice";
import { replaceWeekPlan } from "../weekPlan-slice";
import { setConfig } from "../config-slice";
import { database } from "../../firebase";
import { ref, update } from "firebase/database";
import { setProfile } from "../profile-slice";

export {
  sendFirebaseTemplates,
  sendFirebaseTaskList,
  sendFirebaseSettings,
  sendFireBaseUserProfile,
  sendFirebaseWeekPlan,
  fetchFirebaseUserData,
  fetchFirebaseData,
};

const sendFirebaseWeekPlan = (weekPlan, uid) => {
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
        WeekPlan: weekPlan,
      });
    };

    try {
      console.log("TRY SEND TEMPLATES ! ");
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

const sendFirebaseTemplates = (templates, uid) => {
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
        TasksTemplates: templates,
      });
    };

    try {
      console.log("TRY SEND TEMPLATES ! ");
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

const fetchFirebaseData = (uid, destination) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "loading",
        title: "loading...",
        message: "loading taskList Data",
      })
    );

    const fetchRequest = async () => {
      //  think about better functionality => without boilerPlate
      const dataRef = database.ref("users/" + uid + `/${destination}`);
      return [dataRef];
    };

    try {
      const [dataRef] = await fetchRequest();
      const snapshotData = await dataRef.once("value");
      console.log(destination);
      const dataValue = snapshotData.val();
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log("data value wew");
      console.log(dataValue);
      return { dataValue };
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
      const templatesRef = database.ref("users/" + uid + "/TasksTemplates");
      const tasksRef = database.ref("users/" + uid + "/TasksList");
      const settingsRef = database.ref("users/" + uid + "/Settings");
      const userProfileRef = database.ref("users/" + uid + "/UserProfile");
      const weekPlanRef = database.ref("users/" + uid + "/WeekPlan");
      //  weekPlan

      return [templatesRef, tasksRef, settingsRef, userProfileRef, weekPlanRef];
    };

    try {
      const [templatesRef, tasksRef, settingsRef, userProfileRef, weekPlanRef] =
        await fetchRequest();
      console.log("zmiana");
      const snapshotTemplates = await templatesRef.once("value");
      const snapshotTasks = await tasksRef.once("value");
      const snapshotSettings = await settingsRef.once("value");
      const snapshotUserProfile = await userProfileRef.once("value");
      const snapshotWeekPlan = await weekPlanRef.once("value");

      const templatesListData = snapshotTemplates.val();
      const taskListData = snapshotTasks.val();
      const settingsData = snapshotSettings.val();
      const userProfileData = snapshotUserProfile.val();
      const weekPlanData = snapshotWeekPlan.val();

      dispatch(replaceTemplatesList(templatesListData || []));
      dispatch(replaceTaskList(taskListData || []));
      dispatch(setConfig(settingsData || { ...defaultConfigState }));
      dispatch(setProfile(userProfileData || { ...defaultProfileState }));
      dispatch(replaceWeekPlan(weekPlanData || { ...defaultWeekPlan }));

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
