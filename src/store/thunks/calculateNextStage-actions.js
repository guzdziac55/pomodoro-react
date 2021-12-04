//  import akctions

import { selectConfig } from "../config-slice";
import { calculateNewStage } from "../timer-slice";
// longBreakInterval
// auto pomodoro
// auto breaks

export const nextStageWithConfig = () => {
  return (dispatch, getState) => {
    const state = getState(); // global state <=
    const configState = selectConfig(state); // selector from config
    dispatch(calculateNewStage(configState));
  };
};
