import React from "react";

const TaskListContext = React.createContext({
  tasks: [],
  addTask: (item) => {},
  removeTask: (id) => {},

  // time state ?
});

export default TaskListContext;
