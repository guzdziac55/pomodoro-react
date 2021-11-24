import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    avatarUrl: "images/avatar1.png",
  },
  reducers: {
    setAvatarUrl(state, action) {
      state.avatarUrl = action.payload;
    },
  },
});

// actions
export const { setAvatarUrl } = profileSlice.actions;

//selectors

export const selectUserAvatar = (state) => state.profile.avatarUrl;

// check that this rerender component its promitive string value not object !
export default profileSlice;
