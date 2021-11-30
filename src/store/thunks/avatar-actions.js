import { showNotification } from "../ui-slice";

export const getRandomAvatar = (id) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "sending...",
        message: "sending taskList Data",
      })
    );

    const sendRequest = async () => {
      const response = fetch("https://api.multiavatar.com/BinxBond.png");
      return response;
    };

    try {
      const response = await sendRequest();
      //   const data = await response.json();
      // dispatch to send data here !
      // dispatch replace avatar
      const data = await response.text(); // returns svg !
      console.log(data);
      //   console.log(data);

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
