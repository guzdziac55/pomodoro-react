/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react'

import { Draggable } from 'react-beautiful-dnd'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { MdEditNote, MdOutlineDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import classes from './BoardItem.module.css'
import TextArea from './TextArea'
import useEstPomodoro from '../../hooks/use-estPomodoro'

import {
    changeEstPomodoro,
    deleteTask,
    editTaskContent,
} from '../../store/weekPlan-slice'

function BoardItem({ item, index, columnId }) {
    const dispatch = useDispatch()

    const { estPomodoro } = { ...item }
    const [isInitial, setIsInitial] = useState(true)
    const [cardInEdit, setCardInEdit] = useState(null)
    const [taskContent, setTaskContent] = useState('')

    const [
        currentEstPomodoro,
        addEstPomodoro,
        removeEstPomodoro,
        setEstPomodoro,
    ] = useEstPomodoro(estPomodoro)

    useEffect(() => {
        setEstPomodoro((prevState) => setEstPomodoro(prevState))
    }, [estPomodoro, setEstPomodoro])

    useEffect(() => {
        if (isInitial) {
            setIsInitial(false)
            return
        }
        dispatch(
            changeEstPomodoro({ item, index, columnId, currentEstPomodoro })
        )
    }, [columnId, currentEstPomodoro, dispatch, index, isInitial, item])

    const handleDeleteTask = () => {
        dispatch(deleteTask({ index, columnId })) // deleteDispatch action
    }

    const handleEditTaskContent = () => {
        if (taskContent.length < 1) {
            dispatch(deleteTask({ index, columnId }))
        } else {
            dispatch(editTaskContent({ item, taskContent, columnId, index }))
        }
        setCardInEdit(null)
        setTaskContent('')
    }

    const openEditor = (editingItem) => {
        setCardInEdit(editingItem.id)
        setTaskContent(editingItem.content)
    }

    const taskContentOnChange = (e) => {
        setTaskContent(e.target.value)
    }

    return (
        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
            {(provided) => (
                <div>
                    {cardInEdit !== item.id ? (
                        <div
                            className={classes.boardItem}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className={classes.editNumber}>
                                <button
                                    type="button"
                                    onClick={addEstPomodoro}
                                    className={classes.pomodoroButton}
                                >
                                    <AiOutlinePlus className={classes.icon} />
                                </button>
                                <span className={classes.estPomodoro}>
                                    {estPomodoro}
                                </span>
                                <button
                                    type="button"
                                    onClick={removeEstPomodoro}
                                    className={classes.pomodoroButton}
                                >
                                    <AiOutlineMinus className={classes.icon} />
                                </button>
                            </div>

                            <span
                                role="button"
                                className={classes.title} // add hover To active Edit Mode
                                onClick={() => openEditor(item, columnId)}
                            >
                                {item.title}
                            </span>
                            <div className={classes.editTask}>
                                <span
                                    role="button"
                                    onClick={() => openEditor(item, columnId)}
                                >
                                    <MdEditNote className={classes.icon} />
                                </span>

                                <span
                                    role="button"
                                    onClick={() => handleDeleteTask()}
                                >
                                    <MdOutlineDelete className={classes.icon} />
                                </span>
                            </div>
                        </div>
                    ) : (
                        // EDIT MODE
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={classes.boardItem}
                        >
                            <div>
                                <TextArea
                                    value={taskContent}
                                    onChange={taskContentOnChange}
                                    onAction={handleEditTaskContent}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default BoardItem
