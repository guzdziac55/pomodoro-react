import React from "react";
import classes from "./BoardColumn.module.css";
import { Droppable } from "react-beautiful-dnd";
import BoardItem from "./BoardItem";

const BoardColumn = ({
  id,
  // state
  tempTitle,
  column,

  // function handlers
  handleDeleteTask,
  handleOpenEditor,
  handleCardEdit,
  cardInEdit,
  handleTaskNameChange,
  handleChangeEstPom,
}) => {
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
              // console.log(item);
              return (
                //  our draggable
                <BoardItem
                  item={item}
                  index={index}
                  columnId={id}
                  //state
                  tempTitle={tempTitle}
                  cardInEdit={cardInEdit}
                  //function handles
                  deleteTask={handleDeleteTask}
                  openEditor={handleOpenEditor}
                  cardEdit={handleCardEdit}
                  changeEstPom={handleChangeEstPom}
                  taskNameChange={handleTaskNameChange}
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
