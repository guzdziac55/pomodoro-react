import { useSelector } from "react-redux";

const useActiveTask = () => {
  const tasksList = useSelector((state) => state.tasksList.tasksList);
  const activeTaskId = useSelector((state) => state.tasksList.activeTask);

  const getActiveTask = () => {
    if (!activeTaskId) return;
    const task = tasksList.find((task) => task.id === activeTaskId);
    return task;
  };

  const activeTask = getActiveTask();

  return { activeTask };
};

export default useActiveTask;
