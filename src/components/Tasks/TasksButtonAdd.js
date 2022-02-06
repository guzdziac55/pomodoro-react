/* eslint-disable react/button-has-type */
import React from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import classes from './TasksButtonAdd.module.css'

function TasksButtonAdd({ onToggleForm, children }) {
    return (
        <button onClick={onToggleForm} className={classes.addButton}>
            <MdOutlineAddCircleOutline className={classes.icon} />
            <span>{children}</span>
        </button>
    )
}

export default TasksButtonAdd
