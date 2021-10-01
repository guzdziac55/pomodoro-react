import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    tasksList: [],
    activeTask: null, // global id of active taks
    changed: false, // status for fetching data if changed is true we can use fetch put // it is for not sending empty taskArray in useEffect when
    // app is reloading
  },
  reducers: {
    addTask(state, action) {
      const newTask = action.payload; // gotowy obiekt
      const id = Math.floor(new Date().valueOf() * Math.random());

      state.tasksList.push({
        id: id,
        title: newTask.title,
        actPomodoro: 0,
        estPomodoro: newTask.estPomodoro,
        done: false,
      });
    },

    deleteTask(state, action) {
      const id = action.payload;
      state.tasksList = state.tasksList.filter((task) => task.id !== id);
    },

    setActiveTask(state, action) {
      const id = action.payload;
      state.activeTask = id;
    },

    toggleDoneTask(state, action) {
      const id = action.payload;
      const toggledItem = state.tasksList.find((task) => task.id === id);
      toggledItem.done = !toggledItem.done;
    },

    editTaskItem(state, action) {
      const editData = action.payload; // gotowy obiekt
      const editedItem = state.tasksList.find(
        (task) => task.id === editData.id
      );

      editedItem.id = editData.id;
      editedItem.title = editData.title;
      editedItem.estPomodoro = editData.estPomodoro;
    },

    //////// context menu Tasks

    deleteAllTasks(state) {
      state.tasksList = [];
    },

    deleteDoneTasks(state) {
      state.tasksList = state.tasksList.filter((task) => task.done !== true);
    },

    deleteFinishedTasks(state) {
      state.tasksList = state.tasksList.filter(
        (task) => task.actPomodoro <= task.estPomodoro
      );
    },

    //////// update task

    updateTask(state) {
      const activeTask = state.tasksList.find(
        (task) => task.id === state.activeTask
      );
      activeTask.actPomodoro++;
    },
  },
});

export const taskListActions = taskListSlice.actions;
export default taskListSlice;

// action payload to obiekt który może miec różna strukture
// taskName
// pomodoroNumber
