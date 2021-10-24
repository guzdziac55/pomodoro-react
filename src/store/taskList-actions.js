import { uiActions } from "./ui-slice";
import { taskListActions } from "./taskList-slice";
import { database } from "../firebase";
import { getDatabase, set, ref } from "firebase/database";
//  w przypadku auth
//  mamy authAction

export const sendFirebase = (taskList) => {
  return async (dispatch) => {
    dispatch(
      // to jest funkcja
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending taskList Data",
      })
    );

    // nie używamy pusha tylko podmieniamy całe drzewko

    const sendRequest = async () => {
      // const db = getDatabase();
      // const database2 = database._delegate;

      // tasksRef = database.ref('tasks') // ref czyli referencja do jakiej bazy
      // to takie referencje do baz danych itp
      // by ref działał caly czas powinienem go ustawic w firebase . js mozna sprawdzic

      set(ref(database, "tasks" + "userId:11"), {
        tasks: taskList,
      });

      // database
      //   .ref("tasks/" + "123123")
      //   .PUT()
      //   .set({
      //     tasks: taskList,
      //   });
    };

    try {
      await sendRequest();
      console.log("chuj chuj chuj");
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

export const sendTaskData = (taskList) => {
  return async (dispatch) => {
    dispatch(
      // to jest funkcja
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending taskList Data",
      })
    );

    // nie używamy pusha tylko podmieniamy całe drzewko

    const sendRequest = async () => {
      // też zamienić na dataBASE With user UId

      const response = await fetch(
        "https://react-http-b5eef-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "PUT",
          body: JSON.stringify(taskList),
        }
      );
      if (!response.ok) {
        throw new Error("Sending task data failed");
      }
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

// we get data and put into
// dispatch (include TaskList action )

export const fetchTaskData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "loading",
        title: "loading...",
        message: "loading taskList Data", // spinner ?
      })
    );

    const fetchRequest = async () => {
      const response = await fetch(
        "https://react-http-b5eef-default-rtdb.firebaseio.com/tasks.json"
      );

      if (!response.ok) {
        throw new Error("Loading task data failed");
      }

      const data = await response.json();
      return data;
    };

    try {
      const taskListData = await fetchRequest();
      dispatch(taskListActions.replaceTaskList(taskListData || []));
      // INFO:

      // with more data keys we need to :
      //   dispatch(
      //     taskListActions.replaceTaskList({
      //       tasks: data.tasks || [],
      //       settings: data.settings,
      //     })
      //   );

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
export const fetchFirebase = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "loading",
        title: "loading...",
        message: "loading taskList Data", // spinner ?
      })
    );

    // async promise long version
    const fetchRequest = async () => {
      const eventRef = database.ref("tasks");
      return eventRef;

      // const eventRef = database.ref("tasks").on("value", (snapshot) => {
      //   const taskListData = snapshot.val();
      //   dispatch(taskListActions.replaceTaskList(taskListData || []));
      // });
    };

    try {
      const eventref = await fetchRequest();
      const snapshot = await eventref.once("value");
      const taskListData = snapshot.val();
      // we need to put keys here  /  keys is: uid ? sprawdzic

      dispatch(taskListActions.replaceTaskList(taskListData || []));
      // INFO:

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
