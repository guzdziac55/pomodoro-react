import React from 'react'
import classes from './HowToUse.module.css'

function HowToUse() {
    return (
        <section id="" className={classes.container}>
            <h2>How to use the Pomodoro Timer?</h2>
            <ul>
                <li>
                    <strong>Add tasks</strong> to work on today.
                </li>
                <li>
                    <strong>Set estimate pomodoros</strong> (1 = 25min of work)
                    for each. tasks
                </li>
                <li>
                    <strong>Select a task</strong> to work on.
                </li>
                <li>
                    <strong>Start timer</strong> and focus on the task for 25
                    minutes.
                </li>
                <li>
                    <strong>Take a break</strong> for 5 minutes when the alarm
                    ring.
                </li>
                <li>
                    <strong>Iterate</strong> 3-5 until you finish the tasks.
                </li>
            </ul>
        </section>
    )
}

export default HowToUse
