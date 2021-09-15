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
      active: state.active,
    };
  }

  if (action.type === "EDIT") {
    const editedTaskItemIndex = state.tasks.findIndex(
      (task) => task.id === action.item.id
    );
    // in EditForm we can put in action only title / toDo  /
    // no need all obj
    const updatedTasks = [...state.tasks];
    const updatedItem = { ...action.item };
    updatedTasks[editedTaskItemIndex] = updatedItem;
    return {
      tasks: updatedTasks,
      active: state.active,
    };
  } // say no to mutation !

  if (action.type === "DELETE") {
    const updatedTasks = state.tasks.filter((task) => task.id !== action.id);

    const activeIndex = updatedTasks.findIndex(
      (task) => task.id === state.activeTask
    );

    const updatedActiveTask = activeIndex ? state.activeTask : 0;

    return {
      tasks: updatedTasks,
      active: updatedActiveTask,
    };
  }

  if (action.type === "DELETE_ALL") {
    console.log("DELETE_ALL");
    const updatedTasks = [];
    const updatedActiveTask = 0;
    return {
      tasks: updatedTasks,
      active: updatedActiveTask,
    };
  }

  if (action.type === "DELETE_FINISHED") {
    const updatedTasks = state.tasks.filter(
      (task) => task.taskToDoNumber >= task.taskDone
    );
    const activeExist = updatedTasks.findIndex(
      (task) => task.id === task.active
    );
    const updatedActive = activeExist ? state.active : null;

    return {
      tasks: updatedTasks,
      active: updatedActive,
    };
  }
  if (action.type === "DELETE_DONE") {
    console.log("DELETE_DONE");
    const updatedTasks = state.tasks.filter((task) => task.taskDone !== true);
    const activeExist = updatedTasks.findIndex(
      (task) => task.id === task.active
    );
    console.log(updatedTasks);
    const updatedActive = activeExist ? state.active : null;

    return {
      tasks: updatedTasks,
      active: updatedActive,
    };
  }

  if (action.type === "ACTIVE") {
    const activeID = action.id;
    return {
      tasks: state.tasks,
      active: activeID,
    };
  }

  if (action.type === "DONE") {
    const toggledTaskIndex = state.tasks.findIndex(
      (task) => task.id === action.id
    );
    console.log(toggledTaskIndex);
    const toggledTaskItem = state.tasks[toggledTaskIndex];
    const uploadToggledTaskItem = {
      ...toggledTaskItem,
      taskDone: !toggledTaskItem.taskDone,
    };
    console.log(uploadToggledTaskItem);
    const updatedTasks = [...state.tasks];
    updatedTasks[toggledTaskIndex] = uploadToggledTaskItem;

    return {
      tasks: updatedTasks,
      active: state.activeTask,
    };
  }

  return defaultTaskListState;
};

////////// PROVIDER COMPONENT

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

  const toggleDoneTask = (id) => {
    dispatchTasksAction({ type: "DONE", id: id });
  };

  // delete all

  const deleteAllTasks = () => {
    dispatchTasksAction({ type: "DELETE_ALL" });
  };

  const deleteDoneTasks = () => {
    dispatchTasksAction({ type: "DELETE_DONE" });
  };

  const deleteFinishedTasks = () => {
    dispatchTasksAction({ type: "DELETE_FINISHED" });
  };

  // delete done
  // delete finished

  const taskListContext = {
    tasks: tasksState.tasks,
    active: tasksState.active,

    addTask: addnewTaskItem,
    editTask: editTaskItem,
    deleteTask: delateTaskItem,
    setActiveTask: setActiveTask,
    toggleDoneTask: toggleDoneTask,

    /////////// put into different value

    deleteAll: deleteAllTasks,
    deleteDone: deleteDoneTasks,
    deleteFinished: deleteFinishedTasks,
  };

  const taskMenuContext = {
    tasks: tasksState.tasks,
    deleteAll: deleteAllTasks,
    deleteDone: deleteDoneTasks,
    deleteFinished: deleteFinishedTasks,
  };

  // return children
  return (
    // change into value={taskContext: taskListcontex , taskMenuContext:taskMenuContext}
    // .. but after that we need to change ctx everywhere
    // use { name1 or name 2 } = useContext ( TASKLISTCONTEXT )
    <TaskListContext.Provider value={taskListContext}>
      {props.children}
    </TaskListContext.Provider>
  );
};

//  combine reducers: https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
export default TaskListProvider;
