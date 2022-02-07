/* eslint-disable jsx-a11y/interactive-supports-focus */
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { MdDoneOutline, MdEditNote } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import TaskForm from './TaskForm'
import { useClickOutside } from '../../../hooks/useClickOutside'
import {
    selectActiveTask,
    setActiveTask,
    toggleDoneTask,
} from '../../../store/taskList-slice'
import classes from './TaskItem.module.css'

const variants = {
    hidden: {
        opacity: 0,
    },
    hover: {
        y: -1,
        scale: 1.05,
        transistion: { duration: 0.2 },
    },
    show: {
        y: 0,
        opacity: 1,
        transistion: { ease: 'easeOut', duration: 2 },
    },
}

const doneVariants = {
    unDone: {
        opacity: 0.5,
        scale: 0.9,
    },
    done: {
        opacity: 1,
        scale: 1.1,
    },
}

function TaskItem({
    taskData,
    taskData: { id, title, note, actPomodoro, estPomodoro, isDone },
}) {
    const dispatch = useDispatch()
    const activeId = useSelector(selectActiveTask)
    const [openEdit, setOpenEdit] = useState(false) // our isOpden framer !
    const editRef = useRef()

    useClickOutside(editRef, () => {
        if (openEdit) setOpenEdit(false)
    })

    const toggleEditFormHandler = () => {
        setOpenEdit((prevState) => setOpenEdit(!prevState))
    }

    const onClickSetActiveTask = (e) => {
        if (
            e.target === e.currentTarget ||
            e.target.parentNode === e.currentTarget
        )
            dispatch(setActiveTask(id))
    }

    const onClickToggleDoneTask = () => {
        dispatch(toggleDoneTask(id))
    }

    // styles done / active
    const itemIsActiveClass = id === activeId ? classes.active : ''
    const titleDoneClass = isDone ? classes.done : ''
    const iconDoneClass = isDone ? classes.done : ''

    return (
        <>
            {openEdit && (
                <TaskForm
                    onRef={editRef}
                    onToggleForm={toggleEditFormHandler}
                    taskData={taskData}
                    editMode
                />
            )}

            {!openEdit && (
                <motion.li
                    className={`${classes.task} ${itemIsActiveClass}`}
                    onClick={onClickSetActiveTask}
                    variants={variants}
                    initial="hidden"
                    animate="show"
                    whileHover="hover"
                    data-testid="task-item"
                >
                    <motion.span
                        variants={isDone ? doneVariants : ''}
                        initial="unDone"
                        animate="done"
                        onClick={onClickToggleDoneTask}
                    >
                        {/* animate clicked done */}
                        <MdDoneOutline
                            className={`${classes.icon} ${iconDoneClass}`}
                        />
                    </motion.span>

                    <span className={`${classes.title} ${titleDoneClass}`}>
                        {title}
                    </span>

                    <div className={classes.pomodoroInfo}>
                        <span className={classes.pomodoroEst}>
                            {actPomodoro}
                        </span>
                        <span>/</span>
                        <span className={classes.pomodoroAct}>
                            {estPomodoro}
                        </span>
                    </div>

                    <span
                        role="button"
                        onKeyPress={toggleEditFormHandler}
                        onClick={toggleEditFormHandler}
                    >
                        <MdEditNote className={classes.icon} />
                    </span>
                    <div className={classes.lineBreak} />
                    {note && <p className={classes.noteItem}>{note}</p>}
                </motion.li>
            )}
        </>
    )
}

export default React.memo(TaskItem)
