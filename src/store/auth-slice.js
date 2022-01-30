// import { calculateRemainingTime } from "./auth-actions";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
  },

  reducers: {
    logout(state) {
      state.currentUser = null;
    },

    signUp(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { logout, signUp } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const authActions = authSlice.actions;
export default authSlice;
