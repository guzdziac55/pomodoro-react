import { notifications } from '../assets/notifications/notifications'

export const findNotification = (name) => {
    const selectedNotification = notifications.find(
        (notification) => notification.name === name
    )

    return selectedNotification.alert
}
