import React from "react";
import classes from "./BoardColumn.module.css";
import { Droppable } from "react-beautiful-dnd";
import BoardItem from "./BoardItem";
import Card from "../UI/Card";

// id => id from object column
// [id]:{
//     name: ' nazwa kolumny',
//     tasks: {objects full of tasks }
// }

const BoardColumn = ({ id, column }) => {
  return (
    <div>
      <h1 className={classes.title}>{column.name}</h1>
      <Droppable droppableId={id} key={id}>
        {(provided, snapshot) => (
          <div
            className={classes.boardColumn}
            {...provided.droppableProps}
            ref={provided.innerRef}
            //   style={ } // optional
          >
            {column.items.map((item, index) => {
              return <BoardItem item={item} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
