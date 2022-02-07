/* eslint-disable import/no-cycle */
import React from 'react'
import useFetchUserData from './hooks/fetchHooks/useFetchUserData'
import usePersistControl from './hooks/fetchHooks/usePersistControl'
import useSendSettings from './hooks/postHooks/useSendSettings'
import useSendTaskList from './hooks/postHooks/useSendTaskList'
import useSendTemplates from './hooks/postHooks/useSendTemplates'
import useSendUserProfile from './hooks/postHooks/useSendUserProfile'

import useSendWeekPlan from './hooks/postHooks/useSendWeekPlan'
import RouterConfig from './pages/routers/RouterConfig'

function App() {
    // husky test
    console.log('test')
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
