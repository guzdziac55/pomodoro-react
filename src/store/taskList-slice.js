import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { toast } from "react-toastify";

const taskListSlice = createSlice({
  name: "tasksList",
  initialState: {
    tasksList: [],
    taskListChanged: false,
    activeTask: null,
  },
  reducers: {
    replaceTaskList(state, action) {
      const newTaskList = action.payload;
      state.tasksList = newTaskList;
    },

    addTask(state, action) {
      const newTask = action.payload; // gotowy obiekt
      const id = Math.floor(new Date().valueOf() * Math.random());
      state.taskListChanged = true;
      state.tasksList.push({
        id: id,
        title: newTask.title,
        note: newTask.note,
        actPomodoro: 0,
        estPomodoro: newTask.estPomodoro,
        done: false,
      });

      toast.info("Task added");
    },

    deleteTask(state, action) {
      state.taskListChanged = true;
      const id = action.payload;
      state.tasksList = state.tasksList.filter((task) => task.id !== id);
      toast.info("Task deleted");
    },

    setActiveTask(state, action) {
      state.taskListChanged = true;
      const id = action.payload;
      state.activeTask = id;
    },

    toggleDoneTask(state, action) {
      state.taskListChanged = true;
      const id = action.payload;
      const toggledItem = state.tasksList.find((task) => task.id === id);
      toggledItem.done = !toggledItem.done;
    },

    editTaskItem(state, action) {
      state.taskListChanged = true;
      const editData = action.payload; // gotowy obiekt
      const editedItem = state.tasksList.find(
        (task) => task.id === editData.id
      );

      editedItem.id = editData.id;
      editedItem.title = editData.title;
      editedItem.note = editData.note;
      editedItem.estPomodoro = editData.estPomodoro;
      toast.info("Task edited");
    },

    deleteAllTasks(state) {
      state.taskListChanged = true;
      state.tasksList = [];
      state.activeTask = null;
      toast.info("All tasks deleted");
    },

    deleteDoneTasks(state) {
      const isDone = (task) => task.done === true;
      const dones = state.tasksList.some(isDone);

      state.taskListChanged = true;
      state.tasksList = state.tasksList.filter((task) => task.done !== true);
      state.activeTask = state.tasksList.some(
        (task) => task.id === state.activeTask
      )
        ? state.activeTask
        : null;

      const toastInfo = dones
        ? "DONE tasks deleted"
        : "There are no completed tasks to delete";
      toast.info(toastInfo);
    },

    deleteFinishedTasks(state) {
      const isFinished = (task) => task.estPomodoro <= task.actPomodoro;
      const finished = state.tasksList.some(isFinished);

      state.taskListChanged = true;
      state.tasksList = state.tasksList.filter(
        (task) => task.actPomodoro < task.estPomodoro
      );
      state.activeTask = state.tasksList.some(
        (task) => task.id === state.activeTask
      )
        ? state.activeTask
        : null;

      const toastInfo = finished
        ? "FINISHED tasks deleted"
        : "There are no finished tasks to delete";
      toast.info(toastInfo);
    },

    updateTask(state, action) {
      console.log("inside update taks");
      state.taskListChanged = true;
      if (action.payload !== 0 || !state.activeTask) return;
      const activeTask = state.tasksList.find(
        (task) => task.id === state.activeTask
      );
      activeTask.actPomodoro++;
      toast.info("Active task updated");
    },
  },
});

// actions
export const {
  replaceTaskList,
  addTask,
  deleteTask,
  setActiveTask,
  toggleDoneTask,
  editTaskItem,
  deleteAllTasks,
  deleteDoneTasks,
  deleteFinishedTasks,
  updateTask,
} = taskListSlice.actions;

// selectors
export const selectTaskList = (state) => state.tasksList.tasksList;
export const selectTaskListChanged = (state) => state.tasksList.taskListChanged;
export const selectActiveTask = (state) => state.tasksList.activeTask;

export const selectNumberToDoTasks = createSelector(
  selectTaskList,
  (taskList) =>
    taskList.reduce(
      (acu, task) => (task.done === false ? acu + task.estPomodoro : acu),
      0
    )
);

export const selectNumberDonePomodoro = createSelector(
  selectTaskList,
  (taskList) => taskList.reduce((acu, task) => acu + task.actPomodoro, 0)
);

export const taskListActions = taskListSlice.actions;
export default taskListSlice;
