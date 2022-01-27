import React from "react";
import classes from "./BoardPatterns.module.css";
import { Droppable } from "react-beautiful-dnd";
import BoardItem from "./BoardItem";

const BoardPatterns = ({ id, tempTitle, column, cardInEdit, sendFirebase }) => {
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
                      tempTitle={tempTitle}
                      cardInEdit={cardInEdit}
                      //function handles
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className={classes.buttons}>
          <button onClick={() => {}} className={classes.buttonAdd}>
            Add Task
          </button>
          <button className={classes.buttonSave} onClick={sendFirebase}>
            SAVE PLAN
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardPatterns;
