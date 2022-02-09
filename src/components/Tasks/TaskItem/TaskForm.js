/* eslint-disable jsx-a11y/label-has-associated-control */
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import {
    MdEditNote,
    MdExposureNeg1,
    MdExposurePlus1,
    MdNoteAdd,
} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import classes from './TaskForm.module.css'
import useEstPomodoro from '../../../hooks/useEstPomodoro'

import {
    addTask,
    deleteTask,
    editTaskItem,
} from '../../../store/taskList-slice'
import Card from '../../UI/Card'

const variants = {
    hidden: {
        y: 30,
        opacity: 0,
    },

    visable: {
        y: 0,
        opacity: 1,
    },

    exit: {
        opacity: 0,
        x: -450,
        delay: 0.4,
    },
}

// onRef={editRef}
// onToggleForm={toggleEditFormHandler}
// taskData={taskData}
// editMode={true}

function TaskForm({ editMode, taskData, onRef, onToggleForm }) {
    // const TaskForm = (props) => {
    const dispatch = useDispatch()

    const { id, title, estPomodoro, note } = { ...taskData }

    // initial inputs in NEWTASK MODE & EDIT MODE
    const initialNote = editMode && note ? note : ''
    const initialTitle = editMode ? title : ''
    const initialAmount = editMode ? estPomodoro : 1

    const [taskTitle, setTaskTitle] = useState(initialTitle)
    const [taskNote, setTaskNote] = useState(initialNote)

    const [openNote, setOpenNote] = useState(!!note)
    const [formIsValid, setFormIsValid] = useState(null)

    const [
        currentEstPomodoro,
        addEstPomodoro,
        removeEstPomodoro,
        setEstPomodoro,
    ] = useEstPomodoro(initialAmount)

    const handleInputChange = (e) => {
        const { value } = e.target
        const { name } = e.target

        if (name === 'title') {
            setTaskTitle(value)
        }
        if (name === 'numbers') {
            setEstPomodoro(value)
        }

        if (name === 'note') {
            setTaskNote(value)
        }
    }

    useEffect(() => {
        if (
            taskTitle.trim().length === 0 ||
            currentEstPomodoro < 1 ||
            currentEstPomodoro > 9
        ) {
            setFormIsValid(false)
        } else {
            setFormIsValid(true)
        }
    }, [taskTitle, currentEstPomodoro])

    // form submiting
    const handleAddEditTask = (e) => {
        e.preventDefault()
        if (!formIsValid) {
            return
        }
        const enteredTaskTitle = taskTitle
        const enteredEstPomodoro = currentEstPomodoro
        const estPomodoroNumber = +enteredEstPomodoro
        const enteredTaskNote = taskNote

        if (!formIsValid) {
            return
        }

        if (editMode) {
            dispatch(
                editTaskItem({
                    id,
                    title: enteredTaskTitle,
                    note:
                        enteredTaskNote.trim().length > 0
                            ? enteredTaskNote
                            : '',
                    estPomodoro: estPomodoroNumber,
                })
            )
            onToggleForm()
        } else {
            dispatch(
                addTask({
                    title: enteredTaskTitle,
                    note:
                        enteredTaskNote.trim().length > 0
                            ? enteredTaskNote
                            : '',
                    estPomodoro: estPomodoroNumber,
                })
            )
        }
    }

    const handleToogleNote = () => {
        setOpenNote((prevState) => setOpenNote(!prevState))
        if (openNote) setTaskNote('')
    }

    const handleDelateTask = () => {
        dispatch(deleteTask(id))
    }

    return (
        <Card className={classes.form}>
            <AnimatePresence>
                <motion.form
                    variants={variants}
                    initial="hidden"
                    id="TaskForm"
                    animate="visable"
                    exit="exit"
                    ref={onRef}
                    onSubmit={handleAddEditTask}
                >
                    <div className={classes.formMain}>
                        <input
                            id="title"
                            value={taskTitle}
                            name="title"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="What are u working on?"
                            className={classes.large}
                        />
                        {/* wywalić label albo dać tu coś innego */}
                        <label className={classes.number}>Est pomodoros</label>
                        <div className={classes.inputWrapper}>
                            <input
                                value={currentEstPomodoro}
                                name="numbers"
                                type="number"
                                onChange={handleInputChange}
                                className={classes.number}
                                min="1"
                                max="9"
                                step="1"
                            />

                            <button
                                data-testid="increase-button"
                                onClick={addEstPomodoro}
                                type="button"
                            >
                                <MdExposurePlus1 className={classes.icon} />
                            </button>
                            <button
                                data-testid="decrease-button"
                                onClick={removeEstPomodoro}
                                type="button"
                            >
                                <MdExposureNeg1 className={classes.icon} />
                            </button>
                        </div>
                        {/*  show hide note */}
                        <AnimatePresence>
                            {openNote && (
                                <motion.textarea
                                    id="note"
                                    cols="30"
                                    rows="5"
                                    type="text"
                                    name="note"
                                    maxLength="700"
                                    onChange={handleInputChange}
                                    placeholder="add note here"
                                    className={classes.noteArea}
                                    variants={variants}
                                    initial="hidden"
                                    animate="visable"
                                    exit="exit"
                                    defaultValue={taskNote}
                                    data-testid="textarea-note"
                                />
                            )}
                        </AnimatePresence>
                        <div className={classes.formNote}>
                            {!openNote && (
                                <button
                                    type="button"
                                    onClick={handleToogleNote}
                                >
                                    <MdEditNote className={classes.icon} />
                                    <span>
                                        {' '}
                                        {openNote ? 'hide note' : 'add note'}
                                    </span>
                                </button>
                            )}

                            <button type="button">
                                <MdNoteAdd className={classes.icon} />
                                <span>add project</span>
                            </button>
                        </div>
                    </div>

                    <div className={classes.formMenu}>
                        {/* menu left */}
                        <div className={classes.menuLeft}>
                            {editMode && (
                                <button
                                    className={classes.btnDelete}
                                    type="button"
                                    onClick={handleDelateTask}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        {/* menu right */}
                        <div className={classes.menuRight}>
                            <button
                                className={classes.btnCancel}
                                onClick={onToggleForm}
                                type="button"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                data-testid="confirm-button"
                                disabled={!formIsValid}
                            >
                                {editMode ? 'Edit' : 'Save'}
                            </button>
                        </div>
                    </div>
                </motion.form>
            </AnimatePresence>
        </Card>
    )
}

export default TaskForm
