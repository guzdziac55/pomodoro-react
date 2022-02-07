import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/auth-slice'
import { selectConfigChanges, selectConfig } from '../../store/config-slice'
import { sendFirebaseSettings } from '../../store/thunks/taskList-actions'

const useSendSettings = () => {
    const [isInitial, setIsInitial] = useState(true)
    const configSettings = useSelector(selectConfig)
    const currentUser = useSelector(selectCurrentUser)

    const isConfigChanged = useSelector(selectConfigChanges)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isInitial && currentUser) {
            setIsInitial(false)
            return
        }

        if (currentUser && isConfigChanged) {
            // we can pickup taskList inside thunk !
            // we can pickup userUID inside thunk !
            dispatch(sendFirebaseSettings(configSettings, currentUser.uid))
        }
        // configSettings is Object = > but when we make changess Form saving
        // config settings as a new object
    }, [configSettings, currentUser, dispatch, isConfigChanged, isInitial])
}

export default useSendSettings
