import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import classes from "./BoardItem.module.css";
import useEstPomodoro from "../../hooks/use-estPomodoro";
import { MdOutlineDelete, MdEditNote } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
// ACTION
import { deleteTask, editTaskContent } from "../../store/weekPlan-slice";
import { handleOnFocus } from "../../utils/helperFunctions";

// MdOutlineDelete
// items => columns.items
const BoardItem = ({
  item,
  index,
  columnId,

  changeEstPom,
}) => {
  const [isInitial, setIsInitial] = useState(true);
  const [cardInEdit, setCardInEdit] = useState(null);
  const [taskContent, setTaskContent] = useState("");
  // HOOK FOR TASK CONTENT TEMPLATE WITH HOOK
  const [
    currentEstPomodoro,
    addEstPomodoro,
    removeEstPomodoro,
    setEstPomodoro,
  ] = useEstPomodoro(item.estPomodoro);

  const dispatch = useDispatch();

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
    if (e.keyCode === 13) callback();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask({ index, columnId })); // deleteDispatch action
  };

  const handleEditTaskContent = () => {
    if (taskContent.length < 1) {
      dispatch(deleteTask({ index, columnId }));
    } else {
      dispatch(editTaskContent({ item, taskContent, columnId, index }));
    }
    setCardInEdit(null);
    setTaskContent("");
  };

  const openEditor = (item) => {
    setCardInEdit(item.id);
    setTaskContent(item.content);
  };

  const taskContentOnChange = (e) => {
    setTaskContent(e.target.value);
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
              <div className={classes.editNumber}>
                <button
                  onClick={addEstPomodoro}
                  className={classes.pomodoroButton}
                >
                  <AiOutlinePlus className={classes.icon} />
                </button>
                <span className={classes.estPomodoro}>{item.estPomodoro}</span>
                <button
                  onClick={removeEstPomodoro}
                  className={classes.pomodoroButton}
                >
                  <AiOutlineMinus className={classes.icon} />
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
                <span onClick={() => handleDeleteTask()}>
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
                  value={taskContent}
                  onChange={taskContentOnChange}
                  onBlur={(e) => handleEditTaskContent()} // dispatch with action.payload
                  onKeyDown={(e) => handleKeyDown(e, handleEditTaskContent)} // dispatch witch action payload
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
