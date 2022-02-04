import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import configSlice from "../store/config-slice";
import timerSlice from "../store/timer-slice";
import taskListSlice from "../store/taskList-slice";

const timerReducer = timerSlice.reducer;
const taskListReducer = taskListSlice.reducer;
const configReducer = configSlice.reducer;
// FAKE STATES :
const fakeTimerTicking = {
  timer: {
    stage: 0,
    isTicking: false,
    pomodoroCnt: 0,
    consumedSeconds: 0,
  },
};

const fakeConfig = {
  config: {
    configChanged: false,
    stageOptions: [25, 5, 20],
    alarmSound: "notification1",
    autoBreak: false,
    autoPomodoros: true,
    longBreakInterval: 4,
    keyBindsShow: true,
    keyBindsEnable: true,
    viewModal: true,
  },
};

const fakeTaskList = {
  tasksList: {
    tasksList: [
      {
        actPomodoro: 0,
        done: false,
        estPomodoro: 1,
        id: 507966499341,
        title: "asdasd",
      },
      {
        actPomodoro: 0,
        done: false,
        estPomodoro: 1,
        id: 535332736438,
        title: "asdasd",
      },
      {
        actPomodoro: 0,
        done: false,
        estPomodoro: 1,
        id: 1522273026653,
        title: "sadasd",
      },
      {
        actPomodoro: 0,
        done: false,
        estPomodoro: 4,
        id: 1621361938143,
        title: "645",
      },
    ],
    tasksTemplates: [],
    taskListChanged: false,
    templateChanged: false,
    activeTask: null,
  },
};

// name: "tasksList",
// initialState: {
//   tasksList: [],
//   tasksTemplates: [],
//   taskListChanged: false,
//   templateChanged: false,
//   activeTask: null,
// },

function render(
  ui,
  {
    initialState,
    store = configureStore({
      reducer: {
        timer: timerReducer,
        tasksList: taskListReducer,
        config: configReducer,
      },
      // reducer: { taskList: taskListReducer },
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render, fakeTimerTicking, fakeTaskList, fakeConfig };
