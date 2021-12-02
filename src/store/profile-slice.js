import { createSlice } from "@reduxjs/toolkit";

export const defaultProfileState = {
  profileChanged: false,
  userName: "defaultUserName",
  avatarUrl: "default",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileChanged: false,
    userName: "dawid",
    avatarUrl: "dawid",
  },
  reducers: {
    setProfile: (state, action) => {
      return action.payload; //Zamiast tego, aby zastąpić istniejący stan, należy bezpośrednio zwrócić nową wartość:
    },

    setUserName(state, action) {
      state.userName = action.payload;
      state.profileChanged = true;
    },

    setAvatarUrl(state, action) {
      state.avatarUrl = action.payload;
      state.profileChanged = true;
    },

    setProfileChanged(state) {
      // state.profileChanged = true;
    },
  },
});

// actions
export const { setAvatarUrl, setUserName, setProfile } = profileSlice.actions;

//selectors
export const selectUserProfile = (state) => state.profile;
export const selectUserAvatar = (state) => state.profile.avatarUrl;
export const selectUserName = (state) => state.profile.userName;
export const selectProfieChanged = (state) => state.profile.profileChanged;

export default profileSlice;
