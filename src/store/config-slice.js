import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    stageOptions: [2, 10, 10], // pom / break / longBrak
  },
  reducers: {},
});

export const configActions = configSlice.actions;
export default configSlice;
