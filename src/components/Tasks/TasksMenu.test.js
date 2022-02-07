import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import TasksMenu from './TasksMenu'
import store from '../../store'

describe('Contex menu tasks tests', () => {
    test('Opens menu tasks after click on icon', () => {
        render(
            <Provider store={store}>
                <TasksMenu />
            </Provider>
        )

        const buttonOpen = screen.getByTestId('tasks-menuButton')
        userEvent.click(buttonOpen)
        expect(screen.getByTestId('tasks-menuList')).toBeInTheDocument()
        screen.debug()
    })
})
