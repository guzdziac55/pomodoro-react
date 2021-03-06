import { createSelector, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const defaultProfileState = {
    profileChanged: false,
    userName: '',
    avatarUrl: 'default',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileChanged: false,
        userName: '',
        avatarUrl: '',
    },
    reducers: {
        setProfile: (state, action) => action.payload,

        setUserName(state, action) {
            state.userName = action.payload
            state.profileChanged = true
            toast.success('Profile saved')
        },

        setAvatarUrl(state, action) {
            state.avatarUrl = action.payload
            state.profileChanged = true
            toast.success('Avatar saved')
        },

        setProfileInitialChange(state) {
            state.profileChanged = false
        },
    },
})

// actions
export const {
    setAvatarUrl,
    setUserName,
    setProfile,
    setProfileInitialChange,
} = profileSlice.actions

// selectors
export const selectUserProfile = createSelector(
    (state) => state.profile,
    (profile) => {
        const { profileChanged, ...rest } = profile
        return rest
    }
)

// export const selectUserProfile = (state) => state.profile;
export const selectUserAvatar = (state) => state.profile.avatarUrl
export const selectUserName = (state) => state.profile.userName
export const selectProfieChanged = (state) => state.profile.profileChanged

export default profileSlice
