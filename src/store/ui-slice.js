import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showForm: false,
    notification: null,
    theme: "pomodoroTheme",
    isLoading: false,
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

//actions
export const { toogleForm, showNotification, changeTheme } = uiSlice.actions;

//selectors
export const selectShowForm = (state) => state.ui.selectShowForm;
export const selectNotification = (state) => state.ui.notification;
export const selectTheme = (state) => state.ui.theme;
export const selectIsLoading = (state) => state.ui.isLoading;

export default uiSlice;
export const uiActions = uiSlice.actions;
