/* eslint-disable import/no-cycle */
import { motion } from 'framer-motion'
import React, { useRef } from 'react'

import { FcGoogle } from 'react-icons/fc'
import { MdDone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import classes from './login.module.css'
import { useAuthLogin } from '../../hooks/use-auth'
import Card from '../UI/Card'
import Input from '../UI/Input'

const titeVariant = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visable: {
        opacity: 1,
        y: 0,
    },
}

const buttonVariant = {
    hidden: {
        opacity: 0,
    },
    visable: {
        opacity: 1,
    },
}

function Login() {
    const { isLoading, error, authLogin } = useAuthLogin()
    const emailRef = useRef()
    const passwordRef = useRef()

    const submitForm = (e) => {
        e.preventDefault()
        const enteredEmail = emailRef.current.value
        const enteredPassword = passwordRef.current.value
        authLogin(enteredEmail, enteredPassword)
    }

    return (
        <div className={classes.container}>
            <Link to="/">
                <span className={classes.headerButton}>
                    <MdDone className={classes.headerIcon} /> Pomodoro
                </span>
            </Link>

            <motion.h1
                className={classes.header}
                variants={titeVariant}
                initial="hidden"
                animate="visable"
            >
                Login
            </motion.h1>
            {error && <p className={classes.error}>{error}</p>}
            <Card className={classes.auth}>
                <form onSubmit={submitForm} className={classes.form}>
                    <button
                        type="button"
                        onClick={() => {
                            // eslint-disable-next-line no-alert
                            window.alert(
                                'this function currently not working yet ! '
                            )
                        }}
                        className={classes.btnGoogleLogin}
                    >
                        <FcGoogle />
                        <span>Login with Google</span>
                    </button>
                    <span className={classes.break}>or</span>
                    <Input
                        useRef={emailRef}
                        label="EMAIL"
                        input={{
                            id: 'email',
                            type: 'email',
                            name: 'email',
                            placeholder: 'example@mail.com',
                        }}
                    />
                    <Input
                        label="PASSWORD"
                        useRef={passwordRef}
                        input={{
                            id: 'password',
                            type: 'password',
                            name: 'password',
                            placeholder: '',
                        }}
                    />

                    {!isLoading && (
                        <motion.button
                            type="submit"
                            variants={buttonVariant}
                            initial="hidden"
                            animate="visable"
                        >
                            <span>Login</span>
                        </motion.button>
                    )}

                    <Link className={classes.forgotPass} to="/reset-password">
                        <span>Forgot Password</span>
                    </Link>
                </form>
            </Card>
            <div className={classes.createWrapper}>
                <span className={classes.createLabel}>
                    Do not have an account?
                </span>
                <Link to="/signup">
                    <span className={classes.createAccount}>
                        Create account
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Login
