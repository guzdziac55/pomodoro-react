import { useSelector } from "react-redux";

export const useStatistics = () => {
  // we can change it with SelectCreators -- Selectors !
  const configStageOptions = useSelector((state) => state.config.stageOptions);
  const activeStage = useSelector((state) => state.timer.stage);
  const taskList = useSelector((state) => state.tasksList.tasksList);
  //
  const activeTime = configStageOptions[activeStage];

  const estTasks = taskList.reduce(
    (acu, task) => (task.done === false ? acu + task.estPomodoro : acu),
    0
  );

  const actTasks = taskList.reduce((acu, task) => acu + task.actPomodoro, 0);

  const endTimeAmount = estTasks * (activeTime / 60); // ( minus ConsumedTime  ? ??  ?)
  // można zmienić funckje żeby liczyła zależnie od parametru
  // teraz kuczy dobrze

  const calculateNewTime = (timeToAdd) => {
    const currentTime = new Date();
    const calculatedTime = new Date(currentTime.getTime() + timeToAdd * 60000);
    const hours =
      calculatedTime.getHours() < 10
        ? "0" + calculatedTime.getHours()
        : calculatedTime.getHours();
    const minutes =
      calculatedTime.getMinutes() < 10
        ? "0" + calculatedTime.getMinutes()
        : calculatedTime.getMinutes();
    return `${hours}:${minutes}`;
  };

  const calculatedEndTime = calculateNewTime(endTimeAmount);

  return { estTasks, actTasks, calculatedEndTime };
};
