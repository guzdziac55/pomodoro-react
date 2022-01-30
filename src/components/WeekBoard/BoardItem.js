import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import classes from "./BoardItem.module.css";
import useEstPomodoro from "../../hooks/use-estPomodoro";
import { MdOutlineDelete, MdEditNote } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";

import {
  deleteTask,
  editTaskContent,
  changeEstPomodoro,
} from "../../store/weekPlan-slice";

import TextArea from "./TextArea";

const BoardItem = ({ item, index, columnId }) => {
  const dispatch = useDispatch();

  const { estPomodoro } = { ...item };
  const [isInitial, setIsInitial] = useState(true);
  const [cardInEdit, setCardInEdit] = useState(null);
  const [taskContent, setTaskContent] = useState("");

  const [
    currentEstPomodoro,
    addEstPomodoro,
    removeEstPomodoro,
    setEstPomodoro,
  ] = useEstPomodoro(estPomodoro);

  useEffect(() => {
    setEstPomodoro((prevState) => setEstPomodoro(prevState));
  }, [estPomodoro]);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    dispatch(changeEstPomodoro({ item, index, columnId, currentEstPomodoro }));
  }, [currentEstPomodoro, dispatch]);

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
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div>
          {cardInEdit !== item.id ? (
            <div
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
                <span className={classes.estPomodoro}>{estPomodoro}</span>
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
                {item.title}
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
            // EDIT MODE
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={classes.boardItem}
            >
              <div>
                <TextArea
                  value={taskContent}
                  onChange={taskContentOnChange}
                  onAction={handleEditTaskContent}
                ></TextArea>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
