import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileChanged: false,
    avatarUrl: "images/avatar1.png",
  },
  reducers: {
    setAvatarUrl(state, action) {
      state.avatarUrl = action.payload;
      state.profileChanged = true;
    },
    setProfileChanged(state) {
      state.profileChanged = true;
    },
  },
});

// actions
export const { setAvatarUrl } = profileSlice.actions;

//selectors
export const selectUserAvatar = (state) => state.profile.avatarUrl;
export const selectUserProfile = (state) => state.profile;
export const selectProfieChanged = (state) => state.profile.profileChanged;

export default profileSlice;
