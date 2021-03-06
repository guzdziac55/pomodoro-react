/* eslint-disable import/no-cycle */
import { motion } from 'framer-motion'
import React, { useRef } from 'react'

import { FcGoogle } from 'react-icons/fc'
import { MdDone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import classes from './signUp.module.css'
import { useAuthCreateAcc } from '../../hooks/useAuth'
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

function SignUp() {
    const { isLoading, error, authCreateAcc } = useAuthCreateAcc()

    const emailRef = useRef()
    const passwordRef = useRef()

    const submitForm = (e) => {
        e.preventDefault()
        const enteredEmail = emailRef.current.value
        const enteredPassword = passwordRef.current.value
        authCreateAcc(enteredEmail, enteredPassword)
    }

    // const loadingClass = isLoading ? classes.hidden : "";

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
                Create Account
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
                        <span>Sign up with Google</span>
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
                            minLength: '7',
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
                            <span>Sign up with email</span>
                        </motion.button>
                    )}
                </form>
            </Card>
            <div className={classes.createWrapper}>
                <span className={classes.createLabel}>
                    Already have an account?
                </span>
                <Link to="/login">
                    <span className={classes.createAccount}>Go to Login</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp
