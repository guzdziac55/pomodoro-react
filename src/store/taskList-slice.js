import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const taskListSlice = createSlice({
  name: "tasksList",
  initialState: {
    tasksList: [], // [] reset after loout
    changed: false, // false after logout
    activeTask: null,
  },
  reducers: {
    replaceTaskList(state, action) {
      const newTaskList = action.payload;
      console.log("action payload tasks");
      console.log(newTaskList.tasks);
      state.tasksList = newTaskList;
    },

    addTask(state, action) {
      const newTask = action.payload; // gotowy obiekt
      const id = Math.floor(new Date().valueOf() * Math.random());
      state.changed = true;
      state.tasksList.push({
        id: id,
        title: newTask.title,
        actPomodoro: 0,
        estPomodoro: newTask.estPomodoro,
        done: false,
      });
    },

    deleteTask(state, action) {
      state.changed = true;
      const id = action.payload;
      state.tasksList = state.tasksList.filter((task) => task.id !== id);
    },

    setActiveTask(state, action) {
      state.changed = true;
      const id = action.payload;
      state.activeTask = id;
    },

    toggleDoneTask(state, action) {
      state.changed = true;
      const id = action.payload;
      const toggledItem = state.tasksList.find((task) => task.id === id);
      toggledItem.done = !toggledItem.done;
    },

    editTaskItem(state, action) {
      state.changed = true;
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
      state.changed = true;
      state.tasksList = [];
    },

    deleteDoneTasks(state) {
      state.changed = true;
      state.tasksList = state.tasksList.filter((task) => task.done !== true);
    },

    deleteFinishedTasks(state) {
      state.changed = true;
      state.tasksList = state.tasksList.filter(
        (task) => task.actPomodoro <= task.estPomodoro
      );
    },

    //////// update task

    updateTask(state, action) {
      state.changed = true;
      if (action.payload !== 0 || !state.activeTask) return;
      const activeTask = state.tasksList.find(
        (task) => task.id === state.activeTask
      );
      activeTask.actPomodoro++;
    },
  },
});

// update only when: // update zawsze dodaje + 1 i zmienia array [tasks]
//  stage is 0  // problem with  shering state
//  active is setted

export const taskListActions = taskListSlice.actions;
export default taskListSlice;

// action payload to obiekt który może miec różna strukture
// taskName
// pomodoroNumber
