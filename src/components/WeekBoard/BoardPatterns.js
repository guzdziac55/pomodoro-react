import React, { useEffect, useState } from "react";
import classes from "./BoardPatterns.module.css";
import { Droppable } from "react-beautiful-dnd";
import BoardItem from "./BoardItem";
import TextArea from "./TextArea";
import { useDispatch } from "react-redux";
import { addSampleTask } from "../../store/weekPlan-slice";
const BoardPatterns = ({ id, tempTitle, column, cardInEdit, sendFirebase }) => {
  const dispatch = useDispatch();

  const [taskContent, setTaskContent] = useState("");
  const [contentValid, setContentValid] = useState(false);

  const taskContentChange = (e) => {
    setTaskContent(e.target.value);
  };

  const addSample = () => {
    dispatch(addSampleTask(taskContent));
    setTaskContent("");
  };

  useEffect(() => {
    if (taskContent.trim().length === 0) {
      setContentValid(false);
    } else {
      setContentValid(true);
    }
  }, [taskContent]);

  const validClasses = contentValid ? classes.valid : "";

  return (
    <>
      <div className={classes.boardPattern}>
        <h1 className={classes.title}>{column.name}</h1>
        <div className={classes.columnPattern}>
          <Droppable droppableId={id} key={id}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {column.items?.map((item, index) => {
                  return <BoardItem item={item} index={index} columnId={id} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className={classes.buttons}>
          <button
            onClick={addSample}
            className={classes.buttonAdd}
            disabled={contentValid ? false : true}
          >
            Add Task
          </button>
        </div>
        <TextArea
          value={taskContent}
          onChange={taskContentChange}
          onAction={addSampleTask}
        />
      </div>
    </>
  );
};

export default BoardPatterns;
