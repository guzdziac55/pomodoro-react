import React, { useContext, useState } from "react";
import classes from "../TaskItem/TaskItem.module.css";
import IconPlus from "../../UI/icons/IconPlus";
import TaskListContext from "../../../store/taskList-context";
import TaskForm from "./TaskForm";

const TaskItem = (props) => {
  const taskData = props.taskData;
  console.log(taskData);
  const [showEditForm, setShowEditForm] = useState(false);
  const tasksCtx = useContext(TaskListContext);

  const handleShowEditForm = () => {
    setShowEditForm(true);
  };

  const handlerCancelEditForm = () => {
    setShowEditForm(false);
  };

  const setActiveTask = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) tasksCtx.setActiveTask(taskData.id);
  };

  const handleToggleDoneTask = () => {
    tasksCtx.toggleDoneTask(taskData.id);
  };

  return (
    <>
      {showEditForm ? (
        <TaskForm
          handlerCancelEditForm={handlerCancelEditForm}
          editMode={true}
          taskData={taskData}
          onCancel={handlerCancelEditForm}
        ></TaskForm>
      ) : (
        <li
          className={`${classes.task} ${props.active ? classes.active : ""}`}
          onClick={setActiveTask}
        >
          <span onClick={handleToggleDoneTask} className={classes.icon}>
            <IconPlus />
          </span>
          {taskData.taskDone && <span>to jest done</span>}
          <span className={classes.title}>{taskData.taskTitle}</span>
          <span className={classes.pomodoro}>{taskData.taskDoneNumber}</span>
          <span className={classes.pomodoro}>/</span>
          <span className={classes.pomodoro}>{taskData.taskToDoNumber}</span>
          <span onClick={handleShowEditForm} className={classes.icon}>
            <IconPlus />
          </span>
        </li>
      )}
    </>
  );
};
// {
//   // onClick = { handleEditTask };
//   /* <span>{props.active ? "active" : "nie active"}</span> */
// }
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

// editingData={{
//   // addItem ctx handler dać tu albo przekazać z handlea
//   // zmienszy to długość łańcucha prosppsow
//   id: props.id,
//   taskTitle: props.title,
//   taskDone: props.taskDone

//   pomodoro: props.pomodoro,
// }}
