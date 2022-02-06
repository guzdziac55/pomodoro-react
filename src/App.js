/* eslint-disable import/no-cycle */
import React from 'react'
import useFetchUserData from './hooks/fetchHooks/use-fetchUserData'
import usePersistControl from './hooks/fetchHooks/use-persistControl'
import useSendSettings from './hooks/postHooks/use-sendSettings'
import useSendTaskList from './hooks/postHooks/use-sendTaskList'
import useSendTemplates from './hooks/postHooks/use-sendTemplates'
import useSendUserProfile from './hooks/postHooks/use-sendUserProfile'

import useSendWeekPlan from './hooks/postHooks/use-sendWeekPlan'
import RouterConfig from './pages/routers/RouterConfig'

function App() {
    useFetchUserData()
    usePersistControl()
    useSendTaskList()
    useSendSettings()
    useSendUserProfile()
    useSendTemplates()
    useSendWeekPlan()

    return <RouterConfig />
}

export default App
