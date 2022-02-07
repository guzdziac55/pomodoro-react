/* eslint-disable import/no-cycle */
import React from 'react'
import LayoutComponent from './LayoutComponent'
import classes from './WeekBoardPage.module.css'
import WeekBoard from '../components/WeekBoard/WeekBoard'

function WeekBoardPage() {
    return (
        <LayoutComponent>
            <div className={classes.containerFull}>
                <WeekBoard />
            </div>
        </LayoutComponent>
    )
}

export default WeekBoardPage
