import React from 'react'
import TimerTab from './TimerTab'
import { fakeConfig, render, screen } from '../../utils/testUtils'

test('Initial render buttons for select pomodoro time options', () => {
    render(<TimerTab />, { initialState: fakeConfig })
    const buttonPom = screen.getByRole('button', {
        name: /pomodoro/i,
    })
    const buttonSBreak = screen.getByRole('button', {
        name: /short break/i,
    })
    const buttonLBreak = screen.getByRole('button', {
        name: /long break/i,
    })

    expect(buttonPom).toBeInTheDocument()
    expect(buttonSBreak).toBeInTheDocument()
    expect(buttonLBreak).toBeInTheDocument()
})
