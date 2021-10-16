import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showForm: false,
    notification: null,
    theme: "pomodoroTheme",
  },
  reducers: {
    toogleForm(state) {
      state.showForm = !state.showForm;
    },

    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    changeTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
