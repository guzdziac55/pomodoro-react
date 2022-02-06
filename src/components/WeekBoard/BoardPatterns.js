import React, { useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import BoardItem from './BoardItem'
import classes from './BoardPatterns.module.css'
import TextArea from './TextArea'
import { addSampleTask } from '../../store/weekPlan-slice'

function BoardPatterns({ id, column }) {
    const dispatch = useDispatch()

    const [taskContent, setTaskContent] = useState('')
    const [contentValid, setContentValid] = useState(false)

    const taskContentChange = (e) => {
        setTaskContent(e.target.value)
    }

    const addSample = () => {
        dispatch(addSampleTask(taskContent))
        setTaskContent('')
    }

    useEffect(() => {
        if (taskContent.trim().length === 0) {
            setContentValid(false)
        } else {
            setContentValid(true)
        }
    }, [taskContent])

    return (
        <div className={classes.boardPattern}>
            <h1 className={classes.title}>{column.name}</h1>
            <div className={classes.columnPattern}>
                <Droppable droppableId={id} key={id}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {column.items?.map((item, index) => (
                                <BoardItem
                                    item={item}
                                    index={index}
                                    columnId={id}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>

            <div className={classes.buttons}>
                <button
                    type="button"
                    onClick={addSample}
                    className={classes.buttonAdd}
                    disabled={!contentValid}
                >
                    Add Task
                </button>
            </div>
            <TextArea
                value={taskContent}
                onChange={taskContentChange}
                onAction={addSampleTask}
            />
        </div>
    )
}

export default BoardPatterns
