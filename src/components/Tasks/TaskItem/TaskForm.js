import React, { useState, useRef } from "react";
import classes from "./TaskForm.module.css";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import TaskFormButton from "./TaskFormButton";

const TaskForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(true); // pom number validation
  const taskNameInputRef = useRef();
  const pomodoroInputRef = useRef();

  // formValidaton - use state - będzie robił conditional css
  // {
  //   /* <div className={`${classes.Content} ${props.collapse ? classes.collapse : ''}`}></div> */
  // }

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredTaskName = taskNameInputRef.current.value;
    const enteredPomodoro = pomodoroInputRef.current.value;
    const enteredPomodoroNumber = +enteredPomodoro;

    if (
      enteredTaskName.trim().length === 0 ||
      enteredPomodoro.trim().length === 0 ||
      enteredPomodoroNumber < 1 ||
      enteredPomodoroNumber > 5
    ) {
      setFormIsValid(false); // przerenderuje element jeszcze raz
      return;
    }
    setFormIsValid(true);
    props.onAddNewTask(enteredTaskName, enteredPomodoroNumber);
  };
  //  add on submit handler
  return (
    <Card class={classes.form}>
      <form className={classes.from} onSubmit={submitHandler}>
        <Input
          ref={taskNameInputRef}
          label={"Task name"}
          input={{
            id: "amount_" + props.id,
            type: "text",
            placeholder: "What are u working on?",
          }}
        />
        <Input
          ref={pomodoroInputRef}
          label={"Est pomodoros"}
          input={{
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <div className={classes["form-menu"]}>
          <button onClick={props.onCancel} type="button">
            Cancel
          </button>
          <button
            disabled={!formIsValid}
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
};

export default TaskForm;
