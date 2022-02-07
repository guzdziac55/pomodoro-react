import React from 'react'
import TasksList from './TasksList'
import { fakeTaskList, render, screen } from '../../utils/testUtils'

describe('Testing list element', () => {
    test('Given taskList state renders taskItems data', () => {
        render(<TasksList />, { initialState: fakeTaskList })
        expect(screen.getAllByTestId('task-item').length).toEqual(4)
    })
})
