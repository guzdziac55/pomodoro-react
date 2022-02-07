import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/auth-slice'
import {
    selectTaskList,
    selectTaskListChanged,
} from '../../store/taskList-slice'
import { sendFirebaseTaskList } from '../../store/thunks/taskList-actions'

const useSendTaskList = () => {
    const [isInitial, setIsInitial] = useState(true)

    const taskList = useSelector(selectTaskList)
    const currentUser = useSelector(selectCurrentUser)
    const isTaskChanged = useSelector(selectTaskListChanged)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isInitial && currentUser) {
            setIsInitial(false)
            return
        }

        if (currentUser && isTaskChanged) {
            // we can pickup taskList inside thunk !
            // we can pickup userUID inside thunk !
            dispatch(sendFirebaseTaskList(taskList, currentUser.uid))
        }
    }, [taskList, dispatch, isInitial, currentUser, isTaskChanged])
}

export default useSendTaskList
