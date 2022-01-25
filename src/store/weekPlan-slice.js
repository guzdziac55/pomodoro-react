import { createSelector } from "reselect";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { MdToday } from "react-icons/md";

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

const weekPlanSlice = createSlice({
  name: "weekPlan",
  initialState: {
    weekPlan: [], // or { }   // setWeekPlan with dispatch from firebase
    weekPlanChanged: false,
  },
  reducers: {
    //    here our reducer functions
    // actions to implement:

    // onDragEnd
    //  move // copy // reorder <== same column
    // destId // sourceID // sInd // dInd
    // or put all full object into action => result obj

    replaceWeekPlan(state, action) {
      state.weekPlan = action.payload;
    },

    setWeekPlan(state, action) {
      return action.payload;
    },

    addSampleTask(state, action) {
      //  desturct {column} = action.payload

      // payload nameTask
      state.weekPlan[0].items.push({ id: nanoid(), content: "dupa content" });
      state.weekPlanChanged = true;
      toast.info("Task item add to samples");
    },

    //  edit title =>  findTaskWeek with ID. and find his index
  },
});

export const { replaceWeekPlan, setWeekPlan, addSampleTask } =
  weekPlanSlice.actions;

export const weekPlanAction = weekPlanSlice.actions;
export default weekPlanSlice;
