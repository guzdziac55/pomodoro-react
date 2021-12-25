//  import akctions

import { selectConfig } from "../config-slice";
import { calculateNewStage } from "../timer-slice";
import { updateTask } from "../taskList-slice";
import { selectActiveStage } from "../timer-slice";

export const nextStageWithConfig = () => {
  return (dispatch, getState) => {
    const state = getState();

    const configState = selectConfig(state);
    const activeStage = selectActiveStage(state);

    if (activeStage === 0) {
      dispatch(updateTask());
    }
    dispatch(calculateNewStage(configState));
  };
};
