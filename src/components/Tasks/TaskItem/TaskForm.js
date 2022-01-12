import React, { useState, useEffect } from "react";
import classes from "./TaskForm.module.css";
import Card from "../../UI/Card";
import { useDispatch } from "react-redux";
import useEstPomodoro from "../../../hooks/use-estPomodoro";
import { motion, AnimatePresence } from "framer-motion";

import {
  MdExposurePlus1,
  MdExposureNeg1,
  MdEditNote,
  MdNoteAdd,
} from "react-icons/md";

import {
  editTaskItem,
  addTask,
  deleteTask,
} from "../../../store/taskList-slice";

const variants = {
  hidden: {
    y: 30,
    opacity: 0,
  },

  visable: {
    y: 0,
    opacity: 1,
  },

  exit: {
    opacity: 0,
    x: -450,
    delay: 0.2,
  },
};

const TaskForm = (props) => {
  const dispatch = useDispatch();

  const { editMode } = props;
  const { id, title, estPomodoro, note } = { ...props.taskData };

  // initial inputs in NEWTASK MODE & EDIT MODE
  const initialNote = editMode && note ? note : "";
  const initialTitle = editMode ? title : "";
  const initialAmount = editMode ? estPomodoro : 1;

  const [taskTitle, setTaskTitle] = useState(initialTitle);
  const [taskNote, setTaskNote] = useState(initialNote);

  const [openNote, setOpenNote] = useState(note ? true : false);
  const [formIsValid, setFormIsValid] = useState(null);

  const [
    currentEstPomodoro,
    addEstPomodoro,
    removeEstPomodoro,
    setEstPomodoro,
  ] = useEstPomodoro(initialAmount);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "title") {
      setTaskTitle(value);
    }
    if (name === "numbers") {
      setEstPomodoro(value);
    }

    if (name === "note") {
      setTaskNote(value);
    }
  };

  useEffect(() => {
    if (
      taskTitle.trim().length === 0 ||
      currentEstPomodoro < 1 ||
      currentEstPomodoro > 5
    ) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [taskTitle, currentEstPomodoro]);

  // form submiting
  const handleAddEditTask = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const enteredTaskTitle = taskTitle;
    const enteredEstPomodoro = currentEstPomodoro;
    const estPomodoroNumber = +enteredEstPomodoro;
    const enteredTaskNote = taskNote;

    if (!formIsValid) {
      return;
    }

    if (editMode) {
      dispatch(
        editTaskItem({
          id: id,
          title: enteredTaskTitle,
          note: enteredTaskNote.trim().length > 0 ? enteredTaskNote : "",
          estPomodoro: estPomodoroNumber,
        })
      );
      props.onToggleForm();
    } else {
      dispatch(
        addTask({
          title: enteredTaskTitle,
          note: enteredTaskNote.trim().length > 0 ? enteredTaskNote : "",
          estPomodoro: estPomodoroNumber,
        })
      );
    }
  };

  const handleToogleNote = () => {
    setOpenNote((prevState) => setOpenNote(!prevState));
    if (openNote) setTaskNote("");
  };

  const handleDelateTask = () => {
    dispatch(deleteTask(id));
  };

  return (
    <Card className={classes.form}>
      <AnimatePresence>
        <motion.form
          variants={variants}
          initial="hidden"
          animate="visable"
          exit="exit"
          ref={props.onRef}
          onSubmit={handleAddEditTask}
        >
          <div className={classes.formMain}>
            <input
              autoFocus
              id="title"
              value={taskTitle}
              name="title"
              type="text"
              onChange={handleInputChange}
              placeholder="What are u working on?"
              className={classes.large}
            />
            <label className={classes.number}>Est pomodoros</label>
            <div className={classes.inputWrapper}>
              <input
                value={currentEstPomodoro}
                name="numbers"
                type="number"
                onChange={handleInputChange}
                className={classes.number}
                min="1"
                max="5"
                step="1"
              />

              <button onClick={addEstPomodoro} type="button">
                <MdExposurePlus1 className={classes.icon} />
              </button>
              <button onClick={removeEstPomodoro} type="button">
                <MdExposureNeg1 className={classes.icon} />
              </button>
            </div>
            {/*  show hide note */}
            <AnimatePresence>
              {openNote && (
                <motion.textarea
                  id="note"
                  cols="30"
                  rows="5"
                  type="text"
                  name="note"
                  maxLength="700"
                  onChange={handleInputChange}
                  placeholder="add note here"
                  className={classes.noteArea}
                  variants={variants}
                  initial="hidden"
                  animate="visable"
                  exit="exit"
                >
                  {taskNote}
                </motion.textarea>
              )}
            </AnimatePresence>
            <div className={classes.formNote}>
              {!openNote && (
                <button type="button" onClick={handleToogleNote}>
                  <MdEditNote className={classes.icon} />
                  <span> {openNote ? "hide note" : "add note"}</span>
                </button>
              )}

              <button type="button">
                <MdNoteAdd className={classes.icon} />
                <span>add project</span>
              </button>
            </div>
          </div>

          <div className={classes.formMenu}>
            {/* menu left */}
            <div className={classes.menuLeft}>
              {editMode && (
                <button
                  className={classes.btnDelete}
                  type="button"
                  onClick={handleDelateTask}
                >
                  Delete
                </button>
              )}
            </div>
            {/* menu right */}
            <div className={classes.menuRight}>
              <button
                className={classes.btnCancel}
                onClick={props.onToggleForm}
                type="button"
              >
                Cancel
              </button>

              <button type="submit" disabled={formIsValid ? false : true}>
                {editMode ? "Edit" : "Save"}
              </button>
            </div>
          </div>
        </motion.form>
      </AnimatePresence>
    </Card>
  );
};

export default TaskForm;
