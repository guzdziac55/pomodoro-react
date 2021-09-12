import React, { useContext, useState } from "react";
import classes from "../TaskItem/TaskItem.module.css";
import IconPlus from "../../UI/icons/IconPlus";
import TaskListContext from "../../../store/taskList-context";
import TaskForm from "./TaskForm";
// import TaskListContext from "../../../store/taskList-context";

// WORKING ONLY ON SINGLE LI ELEMENT !   CURRENT LI ELEMENT WHEN IS RENDERED !
// ZROBIĆ ON MOUSE DOWN AND CLICK
const TaskItem = (props) => {
  // tutaj zrobić handler z edycji
  const [showEditForm, setShowEditForm] = useState(false);

  const tasksCtx = useContext(TaskListContext);
  // showEditform setShowEditForm
  //  toggle when click on form

  const handleShowEditForm = (e) => {
    console.log(e.currentTarget);
    e.preventDefault();
    setShowEditForm(true);
  };

  // cancel when mouseDown outside

  const setActiveTask = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) tasksCtx.setactiveTask(props.id);
  };

  const handlerCancelForm = () => {
    setShowEditForm(false); // TEN STATE SIĘ TYCZY TAKITEMU TEGO TUTAJ
    // TYCH STATEOW JEST DUZO KAZDY TASKITEM MA SWOJ
    // WIEC KAZDY MA TEZ SWOJ FORM
  };

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

  return (
    <>
      {showEditForm ? (
        //  to jest komponent ten sam ale bez propsów więc nie bedzie działać
        // trzeba mu przekaać propsty
        <TaskForm onCancel={handlerCancelForm}></TaskForm>
      ) : (
        // mozna też zrobić zupełnie inny komponent TASKFORMEDIT
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
