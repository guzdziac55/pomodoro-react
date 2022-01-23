import React from "react";
import classes from "./BoardPatterns.module.css";
import { Droppable } from "react-beautiful-dnd";
import BoardItem from "./BoardItem";

const BoardPatterns = ({
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
  createSample,
}) => {
  return (
    <>
      <div className={classes.boardPattern}>
        <h1 className={classes.title}>{column.name}</h1>
        <div className={classes.columnPattern}>
          <Droppable droppableId={id} key={id}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {column.items.map((item, index) => {
                  return (
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
        <div className={classes.buttons}>
          <button
            onClick={() => {
              createSample();
            }}
            className={classes.buttonAdd}
          >
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardPatterns;
