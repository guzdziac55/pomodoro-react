/* eslint-disable import/no-cycle */
import React from 'react'
import LayoutComponent from './LayoutComponent'
import classes from './ResetPasswordPage.module.css'
import ResetPassword from '../components/auth/resetPassword'

function ResetPasswordPage() {
    return (
        <LayoutComponent>
            <div className={classes.containerFull}>
                <ResetPassword />
            </div>
        </LayoutComponent>
    )
}

export default ResetPasswordPage
