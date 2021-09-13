import React, { useContext, useState } from "react";
import classes from "../TaskItem/TaskItem.module.css";
import IconPlus from "../../UI/icons/IconPlus";
import TaskListContext from "../../../store/taskList-context";
import TaskForm from "./TaskForm";

const TaskItem = (props) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const tasksCtx = useContext(TaskListContext);

  const handleShowEditForm = (e) => {
    e.preventDefault();
    setShowEditForm(true);
  };

  const handlerCancelEditForm = () => {
    setShowEditForm(false);
  };

  const setActiveTask = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) tasksCtx.setactiveTask(props.id);
  };

  // put here editTaskHandler (name, amount )
  // put here addNewTaskHandler (name, amount )
  // put here deleteTaskHandler (name, amount )  ?? sprawdzic czy
  // to przeniesienie ulatwi pisanie

  return (
    <>
      {showEditForm ? (
        <TaskForm
          handlerCancelEditForm={handlerCancelEditForm}
          editMode={true}
          editingData={{
            id: props.id,
            title: props.title,
            pomodoro: props.pomodoro,
          }}
          onCancel={handlerCancelEditForm}
        ></TaskForm>
      ) : (
        <li
          className={`${classes.task} ${props.active ? classes.active : ""}`}
          onClick={setActiveTask}
        >
          <span className={classes.title}>{props.title}</span>
          <span className={classes.pomodoro}>{props.pomodoro}</span>
          <span onClick={handleShowEditForm} className={classes.icon}>
            <IconPlus />
          </span>
        </li>
      )}
    </>
  );
};
{
  // onClick = { handleEditTask };
  /* <span>{props.active ? "active" : "nie active"}</span> */
}
export default TaskItem;

// const showIds = () => {
//   console.log(props.id);
// };

// CTX.EDITtASKITEM <== DOKONCZYC
// put values into

// showIds();

//  TO JEST TASK ITEM
// TYCH TASK ITEMÓW JEST TYLE ILE TASK ITEMOW Z STATE
// KAZDY Z NICH JEST INNYM SAMODZIELNYM KOMPONENTEM
// KAZDY MA WEW TE FUNKCJE CO TUTAJ

// E TARGET !== CURRENTtARGET
// ZROB SETSHOEDIT(FALSE)
