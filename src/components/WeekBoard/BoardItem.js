import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import classes from "./BoardItem.module.css";
import useEstPomodoro from "../../hooks/use-estPomodoro";
import { MdOutlineDelete, MdEditNote } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// MdOutlineDelete
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
  const [isInitial, setIsInitial] = useState(true);
  const [
    currentEstPomodoro,
    addEstPomodoro,
    removeEstPomodoro,
    setEstPomodoro,
  ] = useEstPomodoro(item.estPomodoro);

  useEffect(() => {
    setEstPomodoro(item.estPomodoro);
  }, [item.estPomodoro]);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }

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

  // kolejna próba = > try to pyt setFunction out, and put it on component
  // ()=> { setEstPomodoro ( prevValiue => prev + 1 )}

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
              <div className={classes.editNumber}>
                {/* <button
                  onClick={() => {
                    changeEstPom(columnId, index, item.estPomodoro);
                  }}
                  type="button"
                >
                  <AiOutlinePlus className={classes.icon} />
                </button> */}

                {/* ---------------------- */}
                {/* <span className={classes.estPomodoro}>
                  {currentEstPomodoro}
                </span> */}

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
              <div className={classes.editTask}>
                <span onClick={() => openEditor(item, columnId)}>
                  <MdEditNote className={classes.icon} />
                </span>
                <span onClick={() => deleteTask(index, columnId)}>
                  <MdOutlineDelete className={classes.icon} />
                </span>
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
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
