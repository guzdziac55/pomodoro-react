import { createSlice, createSelector } from '@reduxjs/toolkit'

const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        stage: 0,
        isTicking: false,
        pomodoroCnt: 0,
        consumedSeconds: 0,
    },
    reducers: {
        calculateNewStage(state, action) {
            const { longBreakInterval, autoBreak, autoPomodoros } =
                action.payload

            state.consumedSeconds = 0
            if (state.stage === 0) {
                state.pomodoroCnt += 1
                state.stage =
                    state.pomodoroCnt % longBreakInterval === 0 ? 2 : 1
                state.isTicking = Boolean(autoBreak)
            } else {
                state.stage = 0
                state.isTicking = Boolean(autoPomodoros)
            }
        },

        changeActiveStage(state, action) {
            if (state.isTicking) {
                // eslint-disable-next-line no-alert
                const alert = window.confirm(
                    'Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)'
                )
                if (!alert) {
                    return
                }
            }
            state.isTicking = false
            state.consumedSeconds = 0
            state.stage = action.payload
        },

        toggleTicking(state) {
            state.isTicking = !state.isTicking
        },

        consumeTime(state) {
            state.consumedSeconds += 1
        },

        resetConsumedTime(state) {
            state.consumedSeconds = 0
        },
    },
})

export const timerActions = timerSlice.actions

// actions
export const {
    calculateNewStage,
    changeActiveStage,
    toggleTicking,
    consumeTime,
    resetConsumedTime,
} = timerSlice.actions

// selectors
export const selectActiveStage = (state) => state.timer.stage
export const selectIsTicking = (state) => state.timer.isTicking
export const selectPomodoroCount = (state) => state.timer.pomodoroCnt
export const selectConsumedTime = (state) => state.timer.consumedSeconds

export const selectCurrentTime = createSelector(
    (state) => state.timer.stage,
    (state) => state.config.stageOptions,
    (stage, options) => options[stage]
)
export const selectCurrentSeconds = createSelector(
    (state) => state.timer.stage, // stage number
    (state) => state.config.stageOptions, // array
    (stage, options) => options[stage] * 60
)

// logic with props from component
export const getIsActiveOption = () =>
    createSelector(
        (state) => state.timer.stage,
        (_, timeOption) => timeOption,
        (stage, timeOption) => stage === timeOption
    )

export default timerSlice
