import React, { useReducer } from "react";
import TaskListContext from "./taskList-context";

const defaultTaskListState = {
  tasks: [],
  activeTask: null,
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
    };
  }

  if (action.type === "DELATE") {
    const taskToAdd = action.item;
    const updatedTasks = [...state.tasks];
    updatedTasks.push(taskToAdd);

    return {
      tasks: updatedTasks,
    };
  }

  if (action.type === "ACTIVE") {
    const activeID = action.id;

    return {
      tasks: state.tasks,
      activeTask: activeID,
    };
  }

  if (action.type === "EDIT") {
    const taskToAdd = action.item;
    const updatedTasks = [...state.tasks];
    updatedTasks.push(taskToAdd);

    return {
      tasks: updatedTasks,
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
    tasks: tasksState.tasks,
    addTask: addnewTaskItem,
    activeTask: setActiveTask,
  };

  // return children
  return (
    <TaskListContext.Provider value={taskListContext}>
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
