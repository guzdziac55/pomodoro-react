import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showForm: false,
  },
  reducers: {
    toogleForm(state) {
      console.log(state.showForm);
      state.showForm = !state.showForm;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
