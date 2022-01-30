import React from "react";
import classes from "./BoardColumn.module.css";
import { Droppable } from "react-beautiful-dnd";
import BoardItem from "./BoardItem";

const BoardColumn = ({ id, tempTitle, cardInEdit, column }) => {
  return (
    <div className={classes.columnContainer}>
      <h1 className={classes.title}>{column.name}</h1>
      <Droppable droppableId={id} key={id}>
        {(provided, snapshot) => (
          <div
            className={classes.boardColumn}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {column.items?.map((item, index) => {
              return (
                //  our draggable
                <BoardItem
                  item={item}
                  index={index}
                  columnId={id}
                  //state
                  tempTitle={tempTitle}
                  cardInEdit={cardInEdit}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
