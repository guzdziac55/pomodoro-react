/* eslint-disable import/no-cycle */
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import {
    MdLogin,
    MdOutlineCalendarToday,
    MdOutlineLogout,
    MdPermIdentity,
    MdQueryStats,
    MdSettings,
} from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthLogout, useAuthLogin } from '../../hooks/use-auth'
import classes from './HeaderMenuTab.module.css'

import { useClickOutside } from '../../hooks/use-clickOutside'
import { selectCurrentUser } from '../../store/auth-slice'
import UserAvatarHeader from '../Avatars/UserAvatarHeader'
import ProfileForm from '../ProfileApp/ProfileForm'
import SettingsForm from '../SettingsApp/Settings'

const hoverVariant = {
    hover: {
        scale: 1.1,
        y: -3,
    },
}

const variantInitial = {
    hidden: {
        opacity: 0,
        y: '-100vw',
    },
    visable: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', mass: 0.4, ease: 'easeOut', duration: 3 },
    },
}

const variantStart = {
    hidden: {
        opacity: 1,
        y: 0,
    },
    visable: {
        y: 0,
        opacity: 1,
        scale: [1, 1.1, 1, 1.1, 1],
        transition: { repeat: Infinity, type: 'yoyo', duration: 7 },
    },
}

function HeaderMenuTab() {
    const isLogged = useSelector(selectCurrentUser)
    const { authLogout } = useAuthLogout()
    const [openSettingsModal, setOpenSettingsModal] = useState(false)
    const [openProfileModal, setOpenProfileModal] = useState(false)

    const [initMotion, setInitMotion] = useState(true)

    const profileFormRef = useRef()
    const settingsFormRef = useRef()

    const { authLogin } = useAuthLogin()
    const handleLogout = () => {
        authLogout()
    }

    useEffect(() => {
        setInitMotion(false)
    }, [])

    const checkVariant = () => {
        if (initMotion) return variantInitial
        return variantStart
    }

    const handleLogin = () => {
        const testLogin = 'test12@test12.com'
        const testPassword = 'test1234'
        authLogin(testLogin, testPassword)
    }

    useClickOutside(profileFormRef, () => {
        if (openProfileModal) setOpenProfileModal(false)
    })

    useClickOutside(settingsFormRef, () => {
        if (openSettingsModal) setOpenSettingsModal(false)
    })

    return (
        <>
            {openProfileModal && (
                <ProfileForm
                    onClose={() => {
                        setOpenProfileModal(false)
                    }}
                    formRef={profileFormRef}
                />
            )}
            {openSettingsModal && (
                <SettingsForm
                    onClose={() => {
                        setOpenSettingsModal(false)
                    }}
                    formRef={settingsFormRef}
                />
            )}

            {/* navigation !  */}
            <div className={classes.tabMenu}>
                <motion.button
                    variants={hoverVariant}
                    whileHover="hover"
                    onClick={() => setOpenSettingsModal(true)}
                    className={classes.button}
                >
                    <MdSettings className={classes.icon} />
                    <span>Settings</span>
                </motion.button>

                {isLogged && (
                    <>
                        {/* //  WEEK BOARD DND */}
                        <Link to="/board">
                            <motion.button
                                className={classes.button}
                                variants={hoverVariant}
                                whileHover="hover"
                            >
                                {/* icon here */}
                                <MdOutlineCalendarToday
                                    className={classes.icon}
                                />
                                <span>Plan</span>
                            </motion.button>
                        </Link>

                        <motion.button
                            onClick={() => {
                                toast.info('This functionality comming soon')
                            }}
                            className={classes.button}
                            variants={hoverVariant}
                            whileHover="hover"
                        >
                            <MdQueryStats className={classes.icon} />
                            <span>Report</span>
                        </motion.button>

                        <motion.button
                            onClick={handleLogout}
                            className={classes.button}
                            variants={hoverVariant}
                            whileHover="hover"
                        >
                            <MdOutlineLogout className={classes.icon} />
                            <span>Logout</span>
                        </motion.button>
                        <UserAvatarHeader
                            onClick={() => setOpenProfileModal(true)}
                        />
                    </>
                )}

                {!isLogged && (
                    <>
                        <Link to="/signup">
                            <motion.button
                                variants={hoverVariant}
                                whileHover="hover"
                                className={classes.button}
                            >
                                <MdPermIdentity className={classes.icon} />
                                <span>SignUp</span>
                            </motion.button>
                        </Link>

                        <Link to="/login">
                            <motion.button
                                variants={hoverVariant}
                                whileHover="hover"
                                className={classes.button}
                            >
                                <MdLogin className={classes.icon} />
                                <span>Login</span>
                            </motion.button>
                        </Link>
                        {/* <Link to="/login"> */}
                        <motion.button
                            variants={checkVariant()}
                            initial="hidden"
                            animate="visable"
                            onClick={handleLogin}
                            whileHover="hover"
                            className={classes.buttonAcc}
                        >
                            <MdLogin className={classes.icon} />
                            <span>TestACC</span>
                        </motion.button>
                        {/* </Link> */}
                    </>
                )}
            </div>
        </>
    )
}

export default HeaderMenuTab
