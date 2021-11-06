import { useSelector } from "react-redux";

const useActiveTask = () => {
  const tasksList = useSelector((state) => state.tasksList.tasksList);
  const activeTaskId = useSelector((state) => state.tasksList.activeTask);

  // to może być selektor
  const getActiveTask = () => {
    if (!activeTaskId) return;
    const task = tasksList.find((task) => task.id === activeTaskId);
    return task;
  };

  // const getActiveFromArray = () => {
  //   if (!activeTaskId) return;
  //   const task = tasksList.find((task) => task.id === activeTaskId);
  //   return task;
  // };

  const getIsEmptyTasks = () => {
    const isempty = tasksList.length === 0 ? true : false;
    return isempty;
  };

  // const getIsEmptyArray = (array) => {
  //   const isempty = array.length === 0 ? true : false;
  //   return isempty;
  // };

  const isEmptyTasks = getIsEmptyTasks();
  const activeTask = getActiveTask();

  return { activeTask };
};

export default useActiveTask;
