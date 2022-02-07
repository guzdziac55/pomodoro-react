import { notifications } from '../assets/notifications/notifications'

// move to utils !
export const findNotification = (name) => {
    const selectedNotification = notifications.find(
        (notification) => notification.name === name
    )

    return selectedNotification.alert
}
