import React from 'react'
import classes from './Spinner.module.css'

export function Spinner() {
    return (
        <div className={classes.container}>
            <span className={classes.ring}>Loading</span>
        </div>
    )
}
