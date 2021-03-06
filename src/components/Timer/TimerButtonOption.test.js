// import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import TimerButtonOption from './TimerButtonOption'
import store from '../../store'
import { render, screen } from '../../utils/testUtils'

const mockChangeTabOption = jest.fn()

describe('Testing Option Tab menu', () => {
    test('Invokes changeTabOption', () => {
        render(
            <Provider store={store}>
                <TimerButtonOption onChangeTabOption={mockChangeTabOption} />
            </Provider>
        )
        const button = screen.getByRole('button')
        userEvent.click(button)
        expect(mockChangeTabOption).toHaveBeenCalled()
        expect(mockChangeTabOption).toHaveBeenCalledTimes(1)
    })

    test('Passing button name as children', () => {
        render(
            <Provider store={store}>
                <TimerButtonOption>pomodoro</TimerButtonOption>
            </Provider>
        )
        const button = screen.getByRole('button', {
            name: /pomodoro/i,
        })
        expect(button).toBeInTheDocument()
    })
})
