import React, { useRef, useState, useEffect } from "react";
import classes from "./TaskForm.module.css";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import { useDispatch } from "react-redux";
import { taskListActions } from "../../../store/taskList-slice";
import OutsideClickHandler from "react-outside-click-handler";

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

  //  props.toggleForm   // state for close form

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

  // form validation
  useEffect(() => {
    if (taskTitle.trim().length === 0 || taskAmount < 1) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [taskTitle, taskAmount]);

  const handleDelateTask = () => {
    dispatch(taskListActions.deleteTask(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const enteredTaskTitle = taskTitle; // dane z inputa po edycji
    const enteredEstPomodoro = taskAmount;
    const estPomodoroNumber = +enteredEstPomodoro;

    if (!formIsValid) {
      return;
    }

    setTaskTitleValid(true);
    setTaskAmountValid(true);

    if (editMode) {
      // tu nie zrobimy sentrequest // musimy zrobić w momencie zmiany
      // redux STATE
      dispatch(
        taskListActions.editTaskItem({
          id: id,
          title: enteredTaskTitle,
          estPomodoro: estPomodoroNumber,
        })
      );
      props.toggleForm();
    } else {
      // tu możemy zrobić sendRequesta POST
      // możemy wtedy pobrać id i wrzucić jako parametr do dispatch
      // 1 ) we cant fetch inside reducer
      dispatch(
        taskListActions.addTask({
          title: enteredTaskTitle, // dane z forma
          estPomodoro: estPomodoroNumber, // dane z forma
        })
      );
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={props.toggleForm}>
      <Card class={classes.form}>
        <form ref={ref} className={classes.form} onSubmit={submitHandler}>
          <div className={classes["form-main"]}>
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
          </div>

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
    </OutsideClickHandler>

    // <Card class={classes.form}>
    //   <form ref={ref} className={classes.from} onSubmit={submitHandler}>
    //     {/*  change to input HOOK */}
    //     <Input
    //       valid={taskTitleValid}
    //       label={"Task name"}
    //       input={{
    //         id: "amount_" + props.id,
    //         type: "text",
    //         name: "title",
    //         value: taskTitle,
    //         onChange: handleInputChange,
    //         placeholder: "What are u working on?",
    //       }}
    //     />
    //     <Input
    //       valid={taskAmountValid}
    //       label={"Est pomodoros"}
    //       input={{
    //         type: "number",
    //         name: "numbers",
    //         value: taskAmount,
    //         onChange: handleInputChange,
    //         min: "1",
    //         max: "5",
    //         step: "1",
    //       }}
    //     />

    //     <div className={classes["form-menu"]}>
    //       {editMode && (
    //         <button type="button" onClick={handleDelateTask}>
    //           delete
    //         </button>
    //       )}
    //       <div className={classes["menu-right"]}>
    //         <button onClick={props.toggleForm} type="button">
    //           Cancel
    //         </button>

    //         <button type="submit" disabled={formIsValid ? false : true}>
    //           {editMode ? "Edit" : "Save"}
    //         </button>
    //       </div>
    //     </div>
    //   </form>

    // </Card>
  );
});

// export default TaskForm;
export default TaskForm;
