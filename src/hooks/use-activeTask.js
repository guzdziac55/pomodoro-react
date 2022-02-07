import { useSelector } from 'react-redux'

const useActiveTask = () => {
    const tasksList = useSelector((state) => state.tasksList.tasksList)
    const activeTaskId = useSelector((state) => state.tasksList.activeTask)

    const getActiveTask = () => {
        if (!activeTaskId) {
            return null
        }
        // sprawdzić czy działa
        return tasksList.find((taskItem) => taskItem.id === activeTaskId)
    }

    const activeTask = getActiveTask()
    return { activeTask }
}

export default useActiveTask
