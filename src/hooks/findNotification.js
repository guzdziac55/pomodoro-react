import { notifications } from "../assets/notifications/notifications";

export const findNotification = (name) => {
  console.log("czy się renderuje jak ticking ? ");
  const selectedNotification = notifications.find(
    (notification) => notification.name === name
  );

  return selectedNotification.alert;
};
