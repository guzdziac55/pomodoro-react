import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TaskForm from './TaskItem/TaskForm'
import TasksButtonAdd from './TasksButtonAdd'
import TasksList from './TasksList'
import TasksMenu from './TasksMenu'
import { useClickOutside } from '../../hooks/use-clickOutside'
import { selectTaskList } from '../../store/taskList-slice'

function Tasks() {
    const tasks = useSelector(selectTaskList)
    const [openNewTask, setOpenNewTask] = useState(false)
    const newTaskRef = useRef()

    const toogleNewTaskForm = () => {
        setOpenNewTask((prevState) => setOpenNewTask(!prevState))
    }

    useClickOutside(newTaskRef, () => {
        if (openNewTask) setOpenNewTask(false)
    })

    return (
        <>
            <TasksMenu tasks={tasks} />
            <TasksList />
            {!openNewTask && (
                <TasksButtonAdd onToggleForm={toogleNewTaskForm}>
                    Add Task
                </TasksButtonAdd>
            )}

            {openNewTask && (
                <TaskForm onRef={newTaskRef} onToggleForm={toogleNewTaskForm} />
            )}
        </>
    )
}

export default Tasks
