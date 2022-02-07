import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { createSelector } from 'reselect'
import { generateRandomId, ObjTask } from '../utils/helperFunctions'

const taskListSlice = createSlice({
    name: 'tasksList',
    initialState: {
        tasksList: [],
        tasksTemplates: [],
        taskListChanged: false,
        templateChanged: false,
        activeTask: null,
    },
    reducers: {
        addTemplateToList(state, action) {
            const templateId = action.payload
            const selectedTemplate = state.tasksTemplates.find(
                (temp) => temp.id === templateId
            )
            const { templateTasks } = selectedTemplate
            const taskArrayToAdd = templateTasks.map((task) => ({
                ...task,
                id: generateRandomId(),
            }))
            state.tasksList = [...state.tasksList, ...taskArrayToAdd]
            state.taskListChanged = true
            toast.info('Template tasks added')
        },

        newTaskTemplate(state, action) {
            const currentTasks = state.tasksList
            const templateName = action.payload
            const id = Math.floor(new Date().valueOf() * Math.random())
            if (currentTasks.length === 0) {
                toast.info('First add some tasks')
                return
            }

            state.tasksTemplates.push({
                id,
                templateName,
                templateTasks: currentTasks,
            })

            state.templateChanged = true
            toast.info('Template added')
        },

        removeTaskTemplate(state, action) {
            const toDeleteId = action.payload
            state.tasksTemplates = state.tasksTemplates.filter(
                (template) => template.id !== toDeleteId
            )
            toast.info('Template deleted')
            state.templateChanged = true
        },

        replaceTemplatesList(state, action) {
            const newTemplatesList = action.payload
            state.tasksTemplates = newTemplatesList
        },

        replaceTaskList(state, action) {
            const newTaskList = action.payload
            state.tasksList = newTaskList

            // check that weekBoard exist if no tastinfo with that info
            // alert when exist about replace tasklist itemlist

            toast.info('New tasklist loaded')
        },

        addTask(state, action) {
            state.taskListChanged = true
            const { estPomodoro, note, title } = action.payload
            const newObj = new ObjTask(title, note, estPomodoro)
            console.log('create new object')
            console.log(newObj)
            state.tasksList.push(newObj)
            toast.info('Task added')
        },

        deleteTask(state, action) {
            state.taskListChanged = true
            const id = action.payload
            state.tasksList = state.tasksList.filter((task) => task.id !== id)
            toast.info('Task deleted')
        },

        setActiveTask(state, action) {
            state.taskListChanged = true
            const id = action.payload
            state.activeTask = id
        },

        toggleDoneTask(state, action) {
            state.taskListChanged = true
            const id = action.payload
            const toggledItem = state.tasksList.find((task) => task.id === id)
            toggledItem.done = !toggledItem.done
        },

        editTaskItem(state, action) {
            const { id, estPomodoro, note, title } = action.payload
            const editingTask = state.tasksList.find((task) => task.id === id)

            editingTask.id = id
            editingTask.title = title
            editingTask.note = note
            editingTask.estPomodoro = estPomodoro

            state.taskListChanged = true
            toast.info('Task edited')
        },

        deleteAllTasks(state) {
            state.taskListChanged = true
            state.tasksList = []
            state.activeTask = null
            toast.info('All tasks deleted')
        },

        deleteDoneTasks(state) {
            const isDone = (task) => task.done === true
            const dones = state.tasksList.some(isDone)

            state.taskListChanged = true
            state.tasksList = state.tasksList.filter(
                (task) => task.done !== true
            )
            state.activeTask = state.tasksList.some(
                (task) => task.id === state.activeTask
            )
                ? state.activeTask
                : null

            const toastInfo = dones
                ? 'DONE tasks deleted'
                : 'There are no completed tasks to delete'
            toast.info(toastInfo)
        },

        deleteFinishedTasks(state) {
            const isFinished = (task) => task.estPomodoro <= task.actPomodoro
            const finished = state.tasksList.some(isFinished)

            state.taskListChanged = true
            state.tasksList = state.tasksList.filter(
                (task) => task.actPomodoro < task.estPomodoro
            )
            state.activeTask = state.tasksList.some(
                (task) => task.id === state.activeTask
            )
                ? state.activeTask
                : null

            const toastInfo = finished
                ? 'FINISHED tasks deleted'
                : 'There are no finished tasks to delete'
            toast.info(toastInfo)
        },

        updateTask(state) {
            state.taskListChanged = true
            const activeTaskObj = state.tasksList.find(
                (task) => task.id === state.activeTask
            )

            if (state.activeTask == null || !activeTaskObj) return
            activeTaskObj.actPomodoro += 1
            toast.info('Active task updated')
        },
    },
})

export const {
    replaceTemplatesList,
    addTemplateToList,
    newTaskTemplate,
    removeTaskTemplate,

    replaceTaskList,
    addTask,
    deleteTask,
    setActiveTask,
    toggleDoneTask,
    editTaskItem,
    deleteAllTasks,
    deleteDoneTasks,
    deleteFinishedTasks,
    updateTask,
} = taskListSlice.actions

export const selectTemplateList = (state) => state.tasksList.tasksTemplates
export const selectTemplateChanged = (state) => state.tasksList.templateChanged
export const selectTaskList = (state) => state.tasksList.tasksList

export const taskListSpecyficTest = (state) => state.taskList

export const selectTaskListChanged = (state) => state.tasksList.taskListChanged
export const selectActiveTask = (state) => state.tasksList.activeTask

export const selectNumberToDoTasks = createSelector(
    selectTaskList,
    (taskList) =>
        taskList.reduce(
            (acu, task) => (task.done === false ? acu + task.estPomodoro : acu),
            0
        )
)

export const selectNumberDonePomodoro = createSelector(
    selectTaskList,
    (taskList) => taskList.reduce((acu, task) => acu + task.actPomodoro, 0)
)

export const taskListActions = taskListSlice.actions
export default taskListSlice
