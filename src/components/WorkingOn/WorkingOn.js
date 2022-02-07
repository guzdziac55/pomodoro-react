import React from 'react'
import { useSelector } from 'react-redux'
import classes from './WorkingOn.module.css'
import useActiveTask from '../../hooks/useActiveTask'
import { selectPomodoroCount } from '../../store/timer-slice'

function WorkingOn() {
    const { activeTask } = useActiveTask()
    const pomodoroCnt = useSelector(selectPomodoroCount)

    return (
        <div className={classes.activeTask}>
            <span className={classes.pomodoroCount}>#{pomodoroCnt}</span>
            {activeTask && <span>{activeTask.title}</span>}
            {!activeTask && <span>Time to Focus!</span>}
        </div>
    )
}

export default WorkingOn
