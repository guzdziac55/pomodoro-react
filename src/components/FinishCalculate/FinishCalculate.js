import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
// import { createSelector } from 'reselect'
import classes from './FinishCalculate.module.css'
import { useFinishTime } from '../../hooks/useFinishTime'
import { selectPomodoroOptionTime } from '../../store/config-slice'
import {
    selectNumberDonePomodoro,
    selectNumberToDoTasks,
} from '../../store/taskList-slice'

const selectPomTimeToAdd = createSelector(
    selectPomodoroOptionTime,
    selectNumberToDoTasks,
    (pomodoroOption, tasksNumber) => pomodoroOption * tasksNumber
)

const variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visable: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 1,
        y: 40,
    },
}

function FinishCalculate() {
    const toDoTasks = useSelector(selectNumberToDoTasks)
    const donePomodoro = useSelector(selectNumberDonePomodoro)
    const timeToAdd = useSelector(selectPomTimeToAdd)
    const { finishTime } = useFinishTime(timeToAdd)

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visable"
                exit="exit"
                className={classes.statistics}
            >
                <div className={classes['statistics-details']}>
                    <span className={classes.label}>Est:</span>
                    <span className={classes.data}>{toDoTasks}</span>
                </div>
                <div className={classes['statistics-details']}>
                    <span className={classes.label}>Act:</span>
                    <span className={classes.data}>{donePomodoro}</span>
                </div>
                <div className={classes['statistics-details']}>
                    <span className={classes.label}>FINISH AT:</span>
                    <span className={classes.data}>{finishTime}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default React.memo(FinishCalculate)
