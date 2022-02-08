/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

import Header from '../components/Layout/Header'
import useFetchUserData from '../hooks/fetchHooks/use-fetchUserData'
import usePersistControl from '../hooks/fetchHooks/use-persistControl'
import useSendSettings from '../hooks/postHooks/use-sendSettings'
import useSendTaskList from '../hooks/postHooks/use-sendTaskList'
import useSendTemplates from '../hooks/postHooks/use-sendTemplates'
import useSendUserProfile from '../hooks/postHooks/use-sendUserProfile'
import { selectActiveStage } from '../store/timer-slice'
import classes from '/Layout.module.css'

function Layout() {
    const activeStage = useSelector(selectActiveStage)
    const themeClasses = ['pomodoroTheme', 'shortBreakTheme', 'longBreakTheme']
    const currentTheme = themeClasses[activeStage]

    usePersistControl()
    useFetchUserData()
    useSendTaskList()
    useSendSettings()
    useSendUserProfile()
    useSendTemplates()

    return (
        <>
            <main
                className={`${classes.mainApp} ${classes[`${currentTheme}`]}`}
            >
                <p>adsadas</p>
                <Header />
                <Outlet />

                {/* ROUTES HERE  */}

                {/* wyciągnąć z main 100vh i dać do kazdego elementu w Outlecie ! */}
            </main>

            <ToastContainer
                autoClose={2000}
                position="bottom-center"
                hideProgressBar
            />
        </>
    )
}

export default Layout

// <Routes>
// <Route
//   path="/"
//   element={
//     <>
//       {/* info section ref musi widzieć się z APP.PAge */}
//       <InfoSection ref={refInfo} />
//       <Footer />
//     </>
//   }
// />
// </Routes>
