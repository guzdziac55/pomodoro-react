import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/auth-slice'
import {
    selectTemplateChanged,
    selectTemplateList,
} from '../../store/taskList-slice'
import { sendFirebaseTemplates } from '../../store/thunks/taskList-actions'

const useSendTemplates = () => {
    const dispatch = useDispatch()
    const [isInitial, setIsInitial] = useState(true)
    const currentUser = useSelector(selectCurrentUser)

    const taskTemplates = useSelector(selectTemplateList)
    const isTemplatesChanged = useSelector(selectTemplateChanged)

    useEffect(() => {
        if (isInitial && currentUser) {
            setIsInitial(false)
            return
        }

        if (currentUser && isTemplatesChanged) {
            dispatch(sendFirebaseTemplates(taskTemplates, currentUser.uid))
        }
    }, [taskTemplates, dispatch, isInitial, currentUser, isTemplatesChanged])
}

export default useSendTemplates
