/* eslint-disable import/no-cycle */
import React from 'react'
import LayoutComponent from './LayoutComponent'
import classes from './LoginPage.module.css'
import Login from '../components/auth/login'

function LoginPage() {
    return (
        <LayoutComponent>
            <div className={classes.containerFull}>
                <Login />
            </div>
        </LayoutComponent>
    )
}

export default LoginPage
