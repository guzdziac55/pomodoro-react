import React from 'react'
import classes from './Timer.module.css'
import TimerButtonStart from './TimerButtonStart'
import TimerCountdown from './TimerCountdown'
import TimerTab from './TimerTab'
import Card from '../UI/Card'

function Timer() {
    return (
        <Card className={classes.timer}>
            <TimerTab />
            <TimerCountdown />
            <TimerButtonStart />
        </Card>
    )
}

export default Timer
