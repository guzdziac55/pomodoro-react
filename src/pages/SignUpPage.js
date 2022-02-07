/* eslint-disable import/no-cycle */
import React from 'react'
import LayoutComponent from './LayoutComponent'
import classes from './SignUpPage.module.css'
import SignUp from '../components/auth/signUp'

function SignUpPage() {
    return (
        <LayoutComponent>
            <div className={classes.containerFull}>
                <SignUp />
            </div>
        </LayoutComponent>
    )
}

export default SignUpPage
