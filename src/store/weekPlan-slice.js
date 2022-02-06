import { createSlice, createSelector } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { ObjTask } from '../utils/helperFunctions'

export const defaultWeekPlan = {
    0: {
        name: 'Tasks',
    },
    1: {
        name: 'Monday',
    },
    2: {
        name: 'Tuesday',
    },
    3: {
        name: 'Wednesday',
    },
    4: {
        name: 'Thursday',
    },
    5: {
        name: 'Friday',
    },
    6: {
        name: 'Saturday',
    },
    7: {
        name: 'Sunday',
    },
}

const weekPlanSlice = createSlice({
    name: 'weekPlan',
    initialState: {
        weekPlan: [],
        weekPlanChanged: false,
    },
    reducers: {
        replaceWeekPlan(state, action) {
            state.weekPlan = action.payload
        },

        setWeekPlan(state, action) {
            return action.payload
        },

        deleteTask(state, action) {
            const { index, columnId } = { ...action.payload }
            state.weekPlan[columnId].items.splice(index, 1)
            state.weekPlanChanged = true
        },

        editTaskContent(state, action) {
            // item ?
            const { taskContent, columnId, index } = { ...action.payload }
            state.weekPlan[columnId].items[index].title = taskContent
            state.weekPlanChanged = true
        },

        addSampleTask(state, action) {
            const taskContent = action.payload
            const objSample = new ObjTask(taskContent)

            if (
                Object.prototype.hasOwnProperty.call(state.weekPlan[0], 'items')
            ) {
                state.weekPlan[0].items.push(objSample)
            } else {
                const emptyArray = []
                emptyArray.push(objSample)
                state.weekPlan[0].items = emptyArray
            }
            state.weekPlanChanged = true
        },

        changeEstPomodoro(state, action) {
            const { columnId, index, currentEstPomodoro } = action.payload
            state.weekPlan[columnId].items[index].estPomodoro =
                currentEstPomodoro
            state.weekPlanChanged = true
        },

        copySampleTask(state, action) {
            const { srcItem, destItem, srcColumn, destColumn } = action.payload

            const taskToCopy = state.weekPlan[srcColumn].items[srcItem]
            const taskToAdd = { ...taskToCopy }
            taskToAdd.id = nanoid()

            if (state.weekPlan[destColumn].items?.length >= 10) return
            if (state.weekPlan[destColumn].items) {
                state.weekPlan[destColumn].items.splice(destItem, 0, taskToAdd)
            } else {
                const emptyArray = []
                emptyArray.push(taskToAdd)
                state.weekPlan[destColumn].items = emptyArray
            }
            state.weekPlanChanged = true
        },

        moveTask(state, action) {
            const { srcItem, destItem, srcColumn, destColumn } = action.payload
            // eslint-disable-next-line no-unsafe-optional-chaining
            const [taskToMove] = state.weekPlan[srcColumn].items?.splice(
                srcItem,
                1
            )

            if (state.weekPlan[destColumn].items?.length >= 10) return
            if (state.weekPlan[destColumn].items) {
                state.weekPlan[destColumn].items.splice(destItem, 0, taskToMove)
            } else {
                const emptyArray = []
                emptyArray.push(taskToMove)
                state.weekPlan[destColumn].items = emptyArray
                state.weekPlanChanged = true
            }
        },
    },
})

// selectors
export const selectWeekPlan = (state) => state.weekPlan.weekPlan // short state.weekPlan
export const selectWeekPlanChanged = (state) => state.weekPlan.weekPlanChanged

export const selectWeekDay = createSelector(
    (state) => state.weekPlan.weekPlan,
    (_, day) => day, // arg
    (weekPlan, day) => weekPlan[day]?.items
)

export const {
    replaceWeekPlan,
    setWeekPlan,
    addSampleTask,
    deleteTask,
    editTaskContent,
    copySampleTask,
    reorderTask,
    moveTask,
    changeEstPomodoro,
} = weekPlanSlice.actions

export const weekPlanAction = weekPlanSlice.actions
export default weekPlanSlice
