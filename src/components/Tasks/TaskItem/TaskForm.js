import React, { useState, useEffect } from "react";
import classes from "./TaskForm.module.css";
import Card from "../../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import useEstPomodoro from "../../../hooks/use-estPomodoro";
import { selectTaskList } from "../../../store/taskList-slice";

import {
  MdExposurePlus1,
  MdExposureNeg1,
  MdEditNote,
  MdNoteAdd,
} from "react-icons/md";

import { taskListActions } from "../../../store/taskList-slice";

const TaskForm = React.forwardRef((props) => {
  console.log("CAŁKOWITY RERENDER KOMPONENTU ? ");
  console.log();
  const dispatch = useDispatch();
  const taskList = useSelector(selectTaskList);
  console.log("nasza lista ");
  console.log(taskList);
  const { editMode } = props;
  const { id, title, estPomodoro, note } = { ...props.taskData };

  // set initial edit form inputs
  const initialNote = editMode ? note : "";
  const initialTitle = editMode ? title : "";
  const initialAmount = editMode ? estPomodoro : 1;

  // inputs controlled form
  const [taskTitle, setTaskTitle] = useState(initialTitle);
  const [taskNote, setTaskNote] = useState(initialNote);
  const [formIsValid, setFormIsValid] = useState(null);
  const [openNote, setOpenNote] = useState(false);

  // test + / -
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

  // form validation
  useEffect(() => {
    if (
      taskTitle.trim().length === 0 ||
      // only when taskNote is enable !
      // taskNote.trim().length === 0 ||
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
    const enteredTaskTitle = taskTitle; // dane z inputa po edycji
    const enteredEstPomodoro = currentEstPomodoro;
    const estPomodoroNumber = +enteredEstPomodoro;
    const enteredTaskNote = taskNote;

    if (!formIsValid) {
      return;
    }

    if (editMode) {
      dispatch(
        taskListActions.editTaskItem({
          id: id,
          title: enteredTaskTitle,
          estPomodoro: estPomodoroNumber,
        })
      );
      props.onToggleForm();
    } else {
      dispatch(
        taskListActions.addTask({
          title: enteredTaskTitle,
          note: enteredTaskNote.trim().length > 0 ? enteredTaskNote : "",
          estPomodoro: estPomodoroNumber,
        })
      );
    }
  };

  const handleToogleNote = (e) => {
    setOpenNote((prevState) => setOpenNote(!prevState));
    if (openNote) setTaskNote("");
  };

  const handleDelateTask = () => {
    dispatch(taskListActions.deleteTask(id));
  };

  return (
    <Card class={classes.form}>
      <form ref={props.onRef} onSubmit={handleAddEditTask}>
        <div className={classes.formMain}>
          <input
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

          {openNote && (
            <textarea
              id="note"
              type="text"
              name="note"
              value={taskNote}
              onChange={handleInputChange}
              placeholder="add note here"
              className={classes.noteArea}
            ></textarea>
          )}
          <div className={classes.formNote}>
            <button type="button" onClick={handleToogleNote}>
              <MdEditNote className={classes.icon} />
              <span>add note</span>
            </button>

            <button type="button" onClick={handleToogleNote}>
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
      </form>
    </Card>
  );
});

export default TaskForm;
