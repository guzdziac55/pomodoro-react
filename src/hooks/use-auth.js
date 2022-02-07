/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { persistor } from '..'
import { auth } from '../firebase'

const useAuthLogin = () => {
    // console.log("logowanie ? ");
    //  to many logins
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const authLogin = useCallback(
        async (email, password) => {
            try {
                setError(null)
                setLoading(true)
                const response = await auth.signInWithEmailAndPassword(
                    email,
                    password
                )

                if (!response.ok) {
                    throw new Error('Login failed - something goes wrong ! ')
                }

                toast.success('User login success')
                navigate('/', { replace: true })
                persistor.pause()
            } catch (err) {
                setError(`${err}`)
            }
            setLoading(false)
        },
        [navigate]
    )
    return { isLoading, error, authLogin }
}

const useAuthCreateAcc = () => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const authCreateAcc = useCallback(
        async (email, password) => {
            setError(null)
            setLoading(true)

            try {
                const response = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                )
                toast.success('automatically logged in to the new account')
                navigate('/', { replace: true })
                persistor.pause()
            } catch (err) {
                setError(`${err}`)
            }
            setLoading(false)
        },
        [navigate]
    )

    return { isLoading, error, authCreateAcc }
}

const useAuthLogout = () => {
    const navigate = useNavigate()
    const authLogout = useCallback(async () => {
        await auth.signOut()

        toast.success('User Logout success')
        navigate('/', { replace: true })
    }, [navigate])

    return { authLogout }
}

const useAuthResetPassword = () => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const authResetPassword = useCallback(
        async (email) => {
            try {
                setError('')
                setLoading(true)
                const response = await auth.sendPasswordResetEmail(email)
                if (!response.ok) {
                    throw new Error('Request failed')
                }
                toast.success(
                    'User password restart success - check your email !'
                )
                navigate('/', { replace: true })
            } catch (err) {
                setError(`${err}`)
            }
            setLoading(false)
        },
        [navigate]
    )

    return { isLoading, error, authResetPassword }
}
export { useAuthLogin, useAuthCreateAcc, useAuthLogout, useAuthResetPassword }
