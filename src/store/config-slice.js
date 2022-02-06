import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const defaultConfigState = {
    configChanged: false,
    stageOptions: [25, 5, 20],
    alarmSound: 'notification1',
    autoBreak: false,
    autoPomodoros: true,
    longBreakInterval: 4,
    keyBindsShow: true,
    keyBindsEnable: true,
    viewModal: true,
}

const configSlice = createSlice({
    name: 'config',
    initialState: {
        configChanged: false,
        stageOptions: [25, 5, 20],
        alarmSound: 'notification1',
        autoBreak: false,
        autoPomodoros: true,
        longBreakInterval: 4,
        keyBindsShow: true,
        keyBindsEnable: true,
        viewModal: true,
    },

    reducers: {
        setConfig: (state, action) => action.payload,

        setConfigChanged(state) {
            state.configChanged = true
        },

        setConfigInitialChange(state) {
            state.configChanged = false
        },
    },
})

// actions
export const { setConfig, setConfigChanged, setConfigInitialChange } =
    configSlice.actions

// selectors
export const selectConfig = createSelector(
    (state) => state.config,
    (config) => {
        const { configChanged, ...rest } = config
        return rest
    }
)
export const selectLongBrakInterval = (state) => state.config.longBreakInterval
export const selectStageOptions = (state) => state.config.stageOptions
export const selectConfigChanges = (state) => state.config.configChanged
export const selectAlarmSound = (state) => state.config.alarmSound

export const selectBindsShow = (state) => state.config.keyBindsShow
export const selectBindsEnable = (state) => state.config.keyBindsEnable

export const selectPomodoroOptionTime = createSelector(
    (state) => state.config.stageOptions,
    (options) => options[0]
)

export const configActions = configSlice.actions

export default configSlice
