import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/auth-slice'
import { fetchFirebaseUserData } from '../../store/thunks/taskList-actions'

const useFetchUserData = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    // calls after login
    useEffect(() => {
        if (currentUser) dispatch(fetchFirebaseUserData(currentUser.uid))
    }, [currentUser, dispatch])
}

export default useFetchUserData
