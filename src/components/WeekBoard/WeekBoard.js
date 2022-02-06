import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux' // for save rrors
import BoardColumn from './BoardColumn'
import BoardPatterns from './BoardPatterns'
import classes from './WeekBoard.module.css'
import {
    copySampleTask,
    moveTask,
    selectWeekPlan,
} from '../../store/weekPlan-slice'
import '../../store/thunks/taskList-actions'

const onDragEnd = (dispatch, { source, destination }) => {
    if (!destination) return

    const { index: srcItem, droppableId: srcSColumn } = source
    const { index: destItem, droppableId: destSColumn } = destination

    const srcColumn = Number(srcSColumn)
    const destColumn = Number(destSColumn)

    if (srcColumn === 0 && destColumn !== 0)
        dispatch(
            copySampleTask({
                srcItem,
                destItem,
                srcColumn,
                destColumn,
            })
        )

    if ((srcColumn === 0 && destColumn === 0) || srcColumn !== 0)
        dispatch(moveTask({ srcItem, destItem, srcColumn, destColumn }))
}

function WeekBoard() {
    const columns = useSelector(selectWeekPlan)
    const dispatch = useDispatch()

    return (
        <div className={classes.boardContainer}>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(dispatch, result)}
            >
                {Object.entries(columns).map(([id, column]) => {
                    if (id === 0)
                        return <BoardPatterns id={id} column={column} />
                    return <BoardColumn id={id} column={column} />
                })}
            </DragDropContext>
        </div>
    )
}

export default WeekBoard
