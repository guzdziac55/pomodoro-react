import React, { useState, useRef } from "react";
import classes from "./TaskForm.module.css";
import Input from "../../UI/Input";
import Card from "../../UI/Card";

const TaskForm = React.forwardRef((props, ref) => {
  const [titleIsValid, setTitleIsValid] = useState(true); // pom number validation
  const [pomodoroAmountIsValid, setPomodoroAmountIsValid] = useState(true);

  const [taskTitle, setTaskTitle] = useState();
  const [taskAmount, setTaskAmount] = useState();

  const handleInputChange = (e) => {
    console.log("change ? ");
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "title") setTaskTitle(value);
    if (name === "amount") setTaskAmount(value);
  };

  /////////////// submit function

  const submitHandler = (e) => {
    e.preventDefault();

    const editMode = props.editMode;
    const enteredPomodoroNumber = +enteredPomodoro;

    // get current value from controlled input

    // const enteredTaskName = taskNameInputRef.current.value;
    // const enteredPomodoro = pomodoroInputRef.current.value;
    if (enteredTaskName.trim().length === 0) {
      setTitleIsValid(false); // przerenderuje element jeszcze raz
      return;
    }

    if (enteredPomodoroNumber < 1 || enteredPomodoroNumber > 5) {
      setPomodoroAmountIsValid(false);
      return;
    }

    setTitleIsValid(true);
    setPomodoroAmountIsValid(true);

    // jeśli true to rób edit
    if (editMode) {
      console.log("to jest submit edit mode");
    } else {
      console.log("to jest submit add new task");

      props.onAddNewTask(enteredTaskName, enteredPomodoroNumber);
    }
  };

  return (
    <Card class={classes.form}>
      <form ref={ref} className={classes.from} onSubmit={submitHandler}>
        <Input
          valid={titleIsValid}
          ref={taskNameInputRef}
          label={"Task name"}
          input={{
            id: "amount_" + props.id,
            name: title,
            value: taskTitle,
            onChange: handleInputChange,
            type: "text",
            placeholder: "What are u working on?",
          }}
        />
        <Input
          valid={pomodoroAmountIsValid}
          ref={pomodoroInputRef}
          label={"Est pomodoros"}
          input={{
            type: "number",
            name: amount,
            min: "1",
            max: "5",
            step: "1",
            value: taskAmount,
            onchange: handleInputChange,
            defaultValue: "1",
          }}
        />
        <div className={classes["form-menu"]}>
          <button onClick={props.onCancel} type="button">
            Cancel
          </button>
          <button
            // disabled={!formIsValid}
            type="submit"
            // className={`${classes.button}`}
          >
            Save
          </button>
        </div>
        {/* <TaskFormButton type={"submit"}>Save</TaskFormButton>
        <TaskFormButton type={"button"}>Cancel</TaskFormButton> */}
      </form>
    </Card>
  );
});

export default TaskForm;

//  if (showForm) handlerExecuteScroll;
