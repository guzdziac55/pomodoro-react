import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import classes from "./BoardItem.module.css";
import useEstPomodoro from "../../hooks/use-estPomodoro";

// items => columns.items
const BoardItem = ({ item, index }) => {
  //   const [count, setCount] = useState(item.estPomodoro);

  // jak poprawić state // doddtkowe funkcje

  /* <button
type="button"
onClick={() => {
  setState([...state, getItems(1)]);   => zamiast getItem chociaż getItem tez można zrobić
  // wchodzi objekt na którym pracuję => póxniej setState [... , i return ten objekt już po edicie]
}}
> */

  const [
    currentEstPomodoro,
    addEstPomodoro,
    removeEstPomodoro,
    setEstPomodoro,
  ] = useEstPomodoro(item.estPomodoro);

  return (
    <Draggable
      key={item.id}
      draggableId={item.id.toString()} // need to be string check uuid or nanoid
      index={index}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={classes.boardItem}
        >
          <span className={classes.title}>{item.content}</span>

          <span className={classes.title}>{currentEstPomodoro}</span>
          <div className={classes.editNumber}>
            <button onClick={addEstPomodoro}>+</button>
            <button onClick={removeEstPomodoro}>-</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
