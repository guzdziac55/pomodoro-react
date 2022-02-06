/* eslint-disable import/no-cycle */
import React from 'react'

import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import classes from './LayoutComponent.module.css'
import Header from '../components/Layout/Header'

import 'react-toastify/dist/ReactToastify.css'
import { selectActiveStage } from '../store/timer-slice'

function LayoutComponent({ children }) {
    const activeStage = useSelector(selectActiveStage)
    const themeClasses = ['pomodoroTheme', 'shortBreakTheme', 'longBreakTheme']
    const currentTheme = themeClasses[activeStage]

    return (
        <>
            <main
                className={`${classes.mainApp} ${classes[`${currentTheme}`]}`}
            >
                <Header />
                {children}
            </main>

            <ToastContainer
                autoClose={2000}
                position="bottom-center"
                hideProgressBar
            />
        </>
    )
}

export default LayoutComponent
