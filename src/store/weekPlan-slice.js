import { createSelector } from "reselect";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { MdToday } from "react-icons/md";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

// generate random id ?     id: nanoid()

export const defaultWeekPlan = {
  [0]: {
    name: "Tasks",
    // items:  put default taskItems
  },
  [1]: {
    name: "Monday",
  },
  [2]: {
    name: "Tuesday",
  },
  [3]: {
    name: "Wednesday",
  },
  [4]: {
    name: "Thursday",
  },
  [5]: {
    name: "Friday",
  },
  [6]: {
    name: "Saturday",
  },
  [7]: {
    name: "Sunday",
  },
};
//    here our reducer functions
// actions to implement:

// onDragEnd
//  move // copy // reorder <== same column
// destId // sourceID // sInd // dInd
// or put all full object into action => result obj

const weekPlanSlice = createSlice({
  name: "weekPlan",
  initialState: {
    weekPlan: [],
    weekPlanChanged: false,
  },
  reducers: {
    replaceWeekPlan(state, action) {
      state.weekPlan = action.payload;
    },

    setWeekPlan(state, action) {
      console.log("set week plan ");
      return action.payload;
    },

    deleteTask(state, action) {
      const { index, columnId } = { ...action.payload };
      state.weekPlan[columnId].items.splice(index, 1);
      // we can use filter here also !
    },

    editTaskContent(state, action) {
      console.log(action.taskContent);
      const { item, taskContent, columnId, index } = { ...action.payload };
      state.weekPlan[columnId].items[index].content = taskContent;
    },

    //  wrzucanie do pustej move i copy = > https://redux-toolkit.js.org/usage/immer-reducers

    addSampleTask(state, action) {
      state.weekPlan[0].items.push({ id: nanoid(), content: "dupa content" });
      state.weekPlanChanged = true;
      toast.info("Task item add to samples");
    },

    //  MOVE ACTIONS:

    copySampleTask(state, action) {
      const { srcItem, destItem, srcColumn, destColumn } = action.payload;

      if (state.weekPlan[destColumn].items.length >= 10) return;

      const taskToCopy = state.weekPlan[srcColumn].items[srcItem];
      const taskToAdd = Object.assign({}, taskToCopy);
      taskToAdd.id = nanoid();
      state.weekPlan[destColumn].items.splice(destItem, 0, taskToAdd);
    },

    moveTask(state, action) {
      const { srcItem, destItem, srcColumn, destColumn } = action.payload;

      if (state.weekPlan[destColumn].items.length >= 10) return;

      const [taskToMove] = state.weekPlan[srcColumn].items.splice(srcItem, 1);
      state.weekPlan[destColumn].items.splice(destItem, 0, taskToMove);
    },
  },
});

// selectors

export const selectWeekPlan = (state) => state.weekPlan.weekPlan; // short state.weekPlan
export const selectWeekPlanChanged = (state) => state.weekPlan.weekPlanChanged;

export const {
  replaceWeekPlan,
  setWeekPlan,
  addSampleTask,
  deleteTask,
  editTaskContent,
  copySampleTask,
  reorderTask,
  moveTask,
} = weekPlanSlice.actions;

export const weekPlanAction = weekPlanSlice.actions;
export default weekPlanSlice;
