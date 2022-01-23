import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import classes from "./BoardItem.module.css";
import useEstPomodoro from "../../hooks/use-estPomodoro";

// items => columns.items
const BoardItem = ({
  item,
  index,
  columnId,
  deleteTask,
  openEditor,
  cardEdit,
  tempTitle,
  cardInEdit,
  taskNameChange,
  changeEstPom,
}) => {
  // controll addRemovePom Hook

  const [isInitial, setIsInitial] = useState(true);
  const [currentEstPomodoro, addEstPomodoro, removeEstPomodoro] =
    useEstPomodoro(item.estPomodoro);

  console.log("initi");
  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }

    console.log("call function ? ");
    console.log(currentEstPomodoro);
    changeEstPom(columnId, index, currentEstPomodoro);
  }, [currentEstPomodoro]);

  const handleKeyDown = (e, callback) => {
    if (e.keyCode === 13) callback(e, columnId); // call edit with e.target.value ?
    console.log("key down");
  };

  const handleOnFocus = (e) => {
    const val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  };

  return (
    <Draggable
      key={item.id}
      draggableId={item.id.toString()} // need to be string check uuid or nanoid
      index={index}
    >
      {(provided, snapshot) => (
        <div>
          {cardInEdit !== item.id ? ( // when edit mode or normalTaskView
            <div // BOARD ITEM
              className={classes.boardItem}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className={classes.pomodoroContainer}>
                {/* change pomodoro EstPomodoros of current item clicked
                  // get colIDX TaskIDX taskPom */}
                <button
                  onClick={addEstPomodoro}
                  className={classes.pomodoroButton}
                >
                  +
                </button>
                <span className={classes.title}>{item.estPomodoro}</span>
                <button
                  onClick={removeEstPomodoro}
                  className={classes.pomodoroButton}
                >
                  -
                </button>
              </div>

              <span
                className={classes.title} // add hover To active Edit Mode
                onClick={() => openEditor(item, columnId)}
              >
                {item.content}
              </span>
              <div className={classes.editNumber}>
                <button onClick={() => openEditor(item, columnId)}>edit</button>
                <button onClick={() => deleteTask(index, columnId)}>
                  delete
                </button>
              </div>
            </div>
          ) : (
            <div // BOARD ITEM EDIT MODE
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={classes.boardItem}
            >
              <div>
                <textarea
                  className={classes.textEditor}
                  value={tempTitle}
                  onChange={taskNameChange}
                  onBlur={(e) => cardEdit(e, columnId)}
                  onKeyDown={(e) => handleKeyDown(e, cardEdit)}
                  onFocus={handleOnFocus}
                  autoFocus={true}
                ></textarea>
                <button type="button">dupa</button>
              </div>
              {/*  pomodoroEst  */}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
