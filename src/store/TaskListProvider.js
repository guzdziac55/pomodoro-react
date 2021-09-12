import React, { useReducer } from "react";
import TaskListContext from "./taskList-context";

const defaultTaskListState = {
  tasks: [],
  active: null,
};

//TasksReducer => (state, action)
/// uruchamiany przez dispatch a arg ( )

const tasksReducer = (state, action) => {
  if (action.type === "ADD") {
    const taskToAdd = action.item;
    const updatedTasks = [...state.tasks];
    updatedTasks.push(taskToAdd);

    return {
      tasks: updatedTasks,
      activeTask: state.activeTask,
    };
  }

  if (action.type === "DELETE") {
    // przy usuwaniu sprawdzić czy usuwany jest active :)
    //  pojebane
    const taskToAdd = action.item;
    const updatedTasks = [...state.tasks];
    updatedTasks.push(taskToAdd);

    return {
      tasks: updatedTasks,
    };
  }

  if (action.type === "ACTIVE") {
    console.log("wszedł acive ? ");
    const activeID = action.id;
    console.log(activeID);
    return {
      tasks: state.tasks,
      active: activeID,
    };
  }

  if (action.type === "EDIT") {
    const taskToAdd = action.item;
    const updatedTasks = [...state.tasks];
    updatedTasks.push(taskToAdd);

    return {
      tasks: updatedTasks,
      activeTask: state.activeTask,
    };
  }

  return defaultTaskListState;
};

const TaskListProvider = (props) => {
  const [tasksState, dispatchTasksAction] = useReducer(
    tasksReducer,
    defaultTaskListState
  );

  // action.type   / / /   action.item
  const addnewTaskItem = (item) => {
    dispatchTasksAction({ type: "ADD", item: item });
  };

  // we need to get id from clicked Li element ( task item)
  const setActiveTask = (id) => {
    dispatchTasksAction({ type: "ACTIVE", id: id });
  };

  // put this into value in TaskListProvider
  const taskListContext = {
    tasks: tasksState.tasks, // to jest state
    active: tasksState.active,

    // z,oemoce activ na setActoveTasl
    addTask: addnewTaskItem, // to jest funkcja
    setactiveTask: setActiveTask, // to jest funkcja
  };

  // return children
  return (
    <TaskListContext.Provider value={taskListContext}>
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
