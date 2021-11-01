import { uiActions } from "./ui-slice";
import { taskListActions } from "./taskList-slice";
import { configActions } from "./config-slice";
import { database } from "../firebase";
import { ref, update } from "firebase/database";

export const sendFirebaseTaskList = (taskList, uid) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending taskList Data",
      })
    );

    const sendRequest = async () => {
      update(ref(database, "users/" + uid), {
        TasksList: taskList, //=? tasklist cały obiekt z reduxa -- cała lista SET!
      });
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success...",
          message: "send taskList data success",
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "some error !",
          message: "sending Tasklist data failed",
        })
      );
    }
  };
};
export const sendFirebaseSettings = (settings, uid) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending taskList Data",
      })
    );

    const sendRequest = async () => {
      update(ref(database, "users/" + uid), {
        Settings: settings, //=? tasklist cały obiekt z reduxa -- cała lista SET!
      });
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success...",
          message: "send taskList data success",
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "some error !",
          message: "sending Tasklist data failed",
        })
      );
    }
  };
};

export const fetchFirebaseUserData = (uid) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "loading",
        title: "loading...",
        message: "loading taskList Data", // spinner ?
      })
    );

    const fetchRequest = async () => {
      const tasksRef = database.ref("users/" + uid + "/TasksList");
      const settingsRef = database.ref("users/" + uid + "/Settings");

      console.log("tasksRef,SettingsRef");
      console.log(tasksRef, settingsRef);
      return [tasksRef, settingsRef];
    };

    try {
      const [tasksRef, settingsRef] = await fetchRequest();
      const snapshotTasks = await tasksRef.once("value");
      const snapshotSettings = await settingsRef.once("value");
      // return data
      const taskListData = snapshotTasks.val();
      const settingsData = snapshotSettings.val();

      // set data into redux
      dispatch(taskListActions.replaceTaskList(taskListData || []));
      dispatch(configActions.setConfig(settingsData || {}));

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success...",
          message: "Data loading success",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "some error !",
          message: "loading Tasklist data failed",
        })
      );
    }
  };
};

// export const sendTaskData = (taskList) => {
//   return async (dispatch) => {
//     dispatch(
//       // to jest funkcja
//       uiActions.showNotification({
//         status: "pending",
//         title: "sending...",
//         message: "sending taskList Data",
//       })
//     );

//     // nie używamy pusha tylko podmieniamy całe drzewko

//     const sendRequest = async () => {
//       // też zamienić na dataBASE With user UId

//       const response = await fetch(
//         "https://react-http-b5eef-default-rtdb.firebaseio.com/tasks.json",
//         {
//           method: "PUT",
//           body: JSON.stringify(taskList),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Sending task data failed");
//       }
//     };

//     try {
//       await sendRequest();
//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "success...",
//           message: "send taskList data success",
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "some error !",
//           message: "sending Tasklist data failed",
//         })
//       );
//     }
//   };
// };

// // we get data and put into
// // dispatch (include TaskList action )

// export const fetchTaskData = () => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         status: "loading",
//         title: "loading...",
//         message: "loading taskList Data", // spinner ?
//       })
//     );

//     const fetchRequest = async () => {
//       const response = await fetch(
//         "https://react-http-b5eef-default-rtdb.firebaseio.com/tasks.json"
//       );

//       if (!response.ok) {
//         throw new Error("Loading task data failed");
//       }

//       const data = await response.json();
//       return data;
//     };

//     try {
//       const taskListData = await fetchRequest();
//       dispatch(taskListActions.replaceTaskList(taskListData || []));
//       // INFO:

//       // with more data keys we need to :
//       //   dispatch(
//       //     taskListActions.replaceTaskList({
//       //       tasks: data.tasks || [],
//       //       settings: data.settings,
//       //     })
//       //   );

//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "success...",
//           message: "Data loading success",
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "some error !",
//           message: "loading Tasklist data failed",
//         })
//       );
//     }
//   };
// };

// //
