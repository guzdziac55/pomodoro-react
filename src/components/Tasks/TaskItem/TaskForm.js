import React, { useState, useRef } from "react";
import classes from "./TaskForm.module.css";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import TaskFormButton from "./TaskFormButton";

const TaskForm = (props) => {
  const [pomNumberIsValid, setPomNumberIsValid] = useState(true); // pom number validation
  const taskNameInputRef = useRef();
  const pomodoroInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredTaskName = taskNameInputRef.current.value;
    const enteredPomodoro = pomodoroInputRef.current.value;
    const enteredPomodoroNumber = +enteredPomodoro;

    if (
      enteredPomodoro.trim().length === 0 ||
      enteredPomodoroNumber < 1 ||
      enteredPomodoroNumber > 5
    ) {
      setPomNumberIsValid(false); // przerenderuje element jeszcze raz
      return;
    }
    props.onAddNewTask(enteredTaskName, enteredPomodoroNumber);
  };
  //  add on submit handler
  return (
    <Card class={classes.form}>
      <form onSubmit={submitHandler}>
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
        <TaskFormButton>Save</TaskFormButton>
      </form>
    </Card>
  );
};

export default TaskForm;
