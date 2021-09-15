import React, { useContext, useState } from "react";
import classes from "./TaskForm.module.css";
import TaskListContext from "../../../store/taskList-context";
import Input from "../../UI/Input";
import Card from "../../UI/Card";

const TaskForm = React.forwardRef((props, ref) => {
  //  destrukturyzacja propsa:
  // const { id, title, pomodoro } = props; -- można sprawdzić

  // const taskEditData = props.taskData;
  // console.log(taskEditData);

  const initialTitle = props.editMode ? props.taskData.taskTitle : "";
  const initialAmount = props.editMode ? props.taskData.taskToDoNumber : 1;

  const [taskTitle, setTaskTitle] = useState(initialTitle);
  const [taskAmount, setTaskAmount] = useState(initialAmount);

  const [taskTitleValid, setTaskTitleValid] = useState(true); // pom number validation
  const [taskAmountValid, setTaskAmountValid] = useState(true);

  const tasksCtx = useContext(TaskListContext);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "title") {
      setTaskTitle(value);
    }
    if (name === "numbers") {
      setTaskAmount(value);
    }
  };

  const handleDelateTask = () => {
    // console.log(props.editingData.id);
    tasksCtx.deleteTask(props.taskData.id);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const editMode = props.editMode;
    const enteredTaskName = taskTitle;
    const enteredPomodoroAmount = taskAmount;
    const enteredPomodoroAmountNumber = +enteredPomodoroAmount;

    if (enteredTaskName.trim().length === 0) {
      setTaskTitleValid(false); // przerenderuje element jeszcze raz
      return;
    }

    if (enteredPomodoroAmountNumber < 1 || enteredPomodoroAmountNumber > 5) {
      setTaskAmountValid(false);
      return;
    }

    setTaskTitleValid(true);
    setTaskAmountValid(true);

    if (editMode) {
      tasksCtx.editTask({
        id: props.taskData.id,
        taskTitle: taskTitle,
        taskDone: props.taskData.taskDone,
        taskDoneNumber: props.taskData.taskDoneNumber,
        taskToDoNumber: taskAmount,
      });
      props.handlerCancelEditForm();
    } else {
      const id = Math.floor(new Date().valueOf() * Math.random());
      tasksCtx.addTask({
        id: id,
        taskTitle: taskTitle, // from useState
        taskDone: false,
        taskDoneNumber: 0,
        taskToDoNumber: taskAmount, // from useState
      });
    }
  };

  return (
    <Card class={classes.form}>
      <form ref={ref} className={classes.from} onSubmit={submitHandler}>
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
          {/* display flex container */}
          {/* trzeba zrobić w CARD DWA DIVY  */}
          {/* https://codepen.io/ivan8i/pen/mzpeae */}
          {props.editMode && (
            <button type="button" onClick={handleDelateTask}>
              delete
            </button>
          )}
          <div className={classes["menu-right"]}>
            <button onClick={props.onCancel} type="button">
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </Card>
  );
});

// disabled={!formIsValid}
// className={`${classes.button}`}
// {
/* <TaskFormButton type={"submit"}>Save</TaskFormButton>
        <TaskFormButton type={"button"}>Cancel</TaskFormButton> */
// }

export default TaskForm;

//  if (showForm) handlerExecuteScroll;
