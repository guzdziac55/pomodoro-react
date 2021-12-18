//  import akctions

import { selectConfig } from "../config-slice";
import { calculateNewStage } from "../timer-slice";
import { selectActiveTask, updateTask } from "../taskList-slice";

export const nextStageWithConfig = () => {
  return (dispatch, getState) => {
    const state = getState(); // global state <=

    const configState = selectConfig(state); // selector from config
    const activeTask = selectActiveTask(state);

    dispatch(calculateNewStage(configState));
    dispatch(updateTask(activeTask));
  };
};
