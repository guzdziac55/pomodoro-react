import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import classes from './ProgressBar.module.css'
import {
    selectConsumedTime,
    selectCurrentSeconds,
} from '../../store/timer-slice'

function ProgressBar() {
    const currentSeconds = useSelector(selectCurrentSeconds)
    const consumedSeconds = useSelector(selectConsumedTime)

    const [currentProgress, setCurrentProgress] = useState(consumedSeconds)

    useEffect(() => {
        const calculatedWidth = (consumedSeconds / currentSeconds) * 100
        setCurrentProgress(calculatedWidth)
    }, [currentSeconds, consumedSeconds])

    const progressStyle = {
        width: `${currentProgress}%`,
    }

    return (
        <div className={classes.progressContainer}>
            <div style={progressStyle} className={classes.progressBar} />
        </div>
    )
}

export default ProgressBar
