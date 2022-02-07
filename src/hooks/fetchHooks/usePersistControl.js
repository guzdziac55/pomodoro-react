/* eslint-disable import/no-cycle */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { persistor } from '../..'
import { auth } from '../../firebase'
import { logout, signUp } from '../../store/auth-slice'

const usePersistControl = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        //   if user changed
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(signUp(user))
                persistor.pause()
            } else {
                dispatch(logout())
                persistor.persist()
            }
        })
    }, [dispatch])
}

export default usePersistControl
