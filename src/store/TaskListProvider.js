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

  if (action.type === "EDIT") {
    const editedTaskItemIndex = state.tasks.findIndex(
      (task) => task.id === action.item.id
    );
    const updatedTasks = [...state.tasks];
    const updatedItem = { ...action.item };
    updatedTasks[editedTaskItemIndex] = updatedItem;
    return {
      tasks: updatedTasks,
      activeTask: state.activeTask,
    };
  } // say no to mutation !

  if (action.type === "DELETE") {
    console.log(action.id);
    console.log(state.tasks);
    const updatedTasks = state.tasks.filter((task) => task.id !== action.id);
    console.log(updatedTasks);
    return {
      tasks: updatedTasks,
      activeTask: state.activeTask,
    };
  }

  if (action.type === "ACTIVE") {
    const activeID = action.id;
    return {
      tasks: state.tasks,
      active: activeID,
    };
  }

  return defaultTaskListState;
};

const TaskListProvider = (props) => {
  const [tasksState, dispatchTasksAction] = useReducer(
    tasksReducer,
    defaultTaskListState
  );

  const addnewTaskItem = (item) => {
    dispatchTasksAction({ type: "ADD", item: item });
  };

  const editTaskItem = (item) => {
    dispatchTasksAction({ type: "EDIT", item: item });
  };

  const delateTaskItem = (id) => {
    dispatchTasksAction({ type: "DELETE", id: id });
  };

  const setActiveTask = (id) => {
    dispatchTasksAction({ type: "ACTIVE", id: id });
  };

  const taskListContext = {
    tasks: tasksState.tasks,
    active: tasksState.active,
    addTask: addnewTaskItem,
    editTask: editTaskItem,
    deleteTask: delateTaskItem,
    setactiveTask: setActiveTask,
    // setToggleDoneTask
  };

  // return children
  return (
    <TaskListContext.Provider value={taskListContext}>
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
