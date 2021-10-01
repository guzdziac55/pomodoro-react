import React, { useRef, useState, useEffect } from "react";
import classes from "./TaskForm.module.css";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import { useDispatch } from "react-redux";
import { taskListActions } from "../../../store/taskList-slice";

const TaskForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const { editMode } = props;
  const { id, title, estPomodoro } = { ...props.taskData };

  const initialTitle = editMode ? title : "";
  const initialAmount = editMode ? estPomodoro : 1;

  const [taskTitle, setTaskTitle] = useState(initialTitle);
  const [taskAmount, setTaskAmount] = useState(initialAmount);

  const [formIsValid, setFormIsValid] = useState(null);

  const [taskTitleValid, setTaskTitleValid] = useState(true);
  const [taskAmountValid, setTaskAmountValid] = useState(true);

  // change value to useRef
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "title") {
      setTaskTitle(value);
    }
    if (name === "numbers") {
      setTaskAmount(value);
    }
  };

  const handleDelateTask = () => {
    dispatch(taskListActions.deleteTask(id));
  };

  useEffect(() => {
    if (taskTitle.trim().length === 0 || taskAmount < 1) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [taskTitle, taskAmount]);

  console.log("validacja formularza");
  console.log(formIsValid);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const enteredTaskTitle = taskTitle;
    const enteredEstPomodoro = taskAmount;
    const estPomodoroNumber = +enteredEstPomodoro;

    if (!formIsValid) {
      return;
    }

    setTaskTitleValid(true);
    setTaskAmountValid(true);

    if (editMode) {
      dispatch(
        taskListActions.editTaskItem({
          id: id,
          title: enteredTaskTitle,
          estPomodoro: estPomodoroNumber,
        })
      );
      props.toggleForm();
    } else {
      dispatch(
        taskListActions.addTask({
          title: enteredTaskTitle,
          estPomodoro: estPomodoroNumber,
        })
      );
    }
  };

  return (
    <Card class={classes.form}>
      <form ref={ref} className={classes.from} onSubmit={submitHandler}>
        {/*  change to input HOOK */}
        <Input
          valid={taskTitleValid}
          label={"Task name"}
          input={{
            id: "amount_" + props.id,
            type: "text",
            name: "title",
            value: taskTitle,
            onChange: handleInputChange,
            placeholder: "What are u working on?",
          }}
        />
        <Input
          valid={taskAmountValid}
          label={"Est pomodoros"}
          input={{
            type: "number",
            name: "numbers",
            value: taskAmount,
            onChange: handleInputChange,
            min: "1",
            max: "5",
            step: "1",
          }}
        />

        <div className={classes["form-menu"]}>
          {editMode && (
            <button type="button" onClick={handleDelateTask}>
              delete
            </button>
          )}
          <div className={classes["menu-right"]}>
            <button onClick={props.toggleForm} type="button">
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

{
  /* display flex container */
}
{
  /* trzeba zrobić w CARD DWA DIVY  */
}
{
  /* https://codepen.io/ivan8i/pen/mzpeae */
}

export default TaskForm;
