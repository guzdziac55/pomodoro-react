/* eslint-disable import/no-cycle */
import React from 'react'
import classes from './AppPage.module.css'
import LayoutComponent from './LayoutComponent'
import FullAppComponent from '../components/FullAppComponent/FullAppComponent'

function AppPage() {
    return (
        <LayoutComponent>
            <div className={classes.containerFull}>
                <div>
                    <FullAppComponent />
                </div>
            </div>
        </LayoutComponent>
    )
}

export default AppPage
