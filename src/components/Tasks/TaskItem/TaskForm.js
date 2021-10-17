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
                value={taskAmount}
                name="numbers"
                type="number"
                onChange={handleInputChange}
                className={classes.number}
                min="1"
                max="5"
                step="1"
              />
              <button>+</button>
              <button>-</button>
              {/* custom button PLUS +  */}
              {/* custom button MINUS -  */}
            </div>
            <div className={classes.formNote}>
              <button>add note</button>
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
                onClick={props.toggleForm}
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
    </OutsideClickHandler>
  );
});

export default TaskForm;

{
  /*  task amountValid jeśli !valid to dodaj style Error
            //  można zrobić show notification  */
}

{
  /* old */
}
{
  /* <Input
              valid={taskAmountValid} // wynik tej funkcji
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
            /> */
}
