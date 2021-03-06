import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/auth-slice'
import {
    selectProfieChanged,
    selectUserProfile,
} from '../../store/profile-slice'
import { sendFireBaseUserProfile } from '../../store/thunks/taskList-actions'

const useSendUserProfile = () => {
    const dispatch = useDispatch()
    const [isInitial, setIsInitial] = useState(true)
    const currentUser = useSelector(selectCurrentUser)

    const userProfile = useSelector(selectUserProfile)
    const isProfileChanged = useSelector(selectProfieChanged)

    useEffect(() => {
        if (isInitial && currentUser) {
            setIsInitial(false)
            return
        }

        if (currentUser && isProfileChanged) {
            // we can pickup taskList inside thunk !
            // we can pickup userUID inside thunk !
            dispatch(sendFireBaseUserProfile(userProfile, currentUser.uid))
        }
        // configSettings is Object = > but when we make changess Form saving
        // config settings as a new object
    }, [userProfile, dispatch, isInitial, currentUser, isProfileChanged])
}

export default useSendUserProfile
