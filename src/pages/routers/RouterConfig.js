/* eslint-disable import/no-cycle */
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Spinner } from '../../components/UI/Spinner'

const AppPage = React.lazy(() => import('../AppPage'))
const MainPage = React.lazy(() => import('../MainPage'))
const LoginPage = React.lazy(() => import('../LoginPage'))
const SignUpPage = React.lazy(() => import('../SignUpPage'))
const ResetPasswordPage = React.lazy(() => import('../ResetPasswordPage'))
const WeekBoardPage = React.lazy(() => import('../WeekBoardPage'))

function RouterConfig() {
    const currentUser = useSelector((state) => state.auth.currentUser)

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="app" element={<AppPage />} />
                {!currentUser && <Route path="login" element={<LoginPage />} />}

                {/* board component */}
                <Route path="board" element={<WeekBoardPage />} />

                <Route path="signup" element={<SignUpPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />

                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Suspense>
    )
}

export default RouterConfig
