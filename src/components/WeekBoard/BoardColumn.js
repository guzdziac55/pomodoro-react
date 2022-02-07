import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import classes from './BoardColumn.module.css'
import BoardItem from './BoardItem'

function BoardColumn({ id, tempTitle, cardInEdit, column }) {
    return (
        <div className={classes.columnContainer}>
            <h1 className={classes.title}>{column.name}</h1>
            <Droppable droppableId={id} key={id}>
                {(provided) => (
                    <div
                        className={classes.boardColumn}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {column.items?.map((item, index) => (
                            //  our draggable
                            <BoardItem
                                item={item}
                                index={index}
                                columnId={id}
                                // state
                                tempTitle={tempTitle}
                                cardInEdit={cardInEdit}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default BoardColumn
