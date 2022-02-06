import { showNotification } from '../ui-slice'

export const getRandomAvatar = (name) => async (dispatch) => {
    dispatch(
        showNotification({
            status: 'pending',
            title: 'sending...',
            message: 'sending taskList Data',
        })
    )

    const sendRequest = async () => {
        const response = fetch(`https://api.multiavatar.com/${name}`)
        return response
    }

    try {
        const response = await sendRequest()
        const data = await response.text() // returns svg !
        dispatch(
            showNotification({
                status: 'success',
                title: 'success...',
                message: 'Data loading success',
            })
        )

        return data
    } catch (err) {
        dispatch(
            showNotification({
                status: 'error',
                title: 'some error !',
                message: 'loading Tasklist data failed',
            })
        )
    }
    return null
}
