import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import classes from './TimerCountdown.module.css'

import { useTimer } from '../../hooks/use-timer'

const variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visable: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -20,
    },
}

function TimerCountdown() {
    const convertedTimeout = useTimer()

    return (
        <AnimatePresence exitBeforeEnter>
            <div>
                <motion.span
                    key={convertedTimeout}
                    variants={variants}
                    className={classes.countDown}
                    initial="hidden"
                    animate="visable"
                    exit="exit"
                >
                    {convertedTimeout}
                </motion.span>
            </div>
        </AnimatePresence>
    )
}

export default TimerCountdown
