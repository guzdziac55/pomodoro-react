import { uiActions } from "./ui-slice";
import { taskListActions } from "./taskList-slice";

//  w przypadku auth
//  mamy authAction

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

    const sendRequest = async () => {
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
