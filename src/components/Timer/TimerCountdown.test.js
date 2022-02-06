import React from 'react'
import TimerCountdown from './TimerCountdown'
import { fakeConfig, render, screen } from '../../utils/testUtils'

test('Initial render buttons for select pomodoro time options', () => {
    render(<TimerCountdown />, { initialState: fakeConfig })
    const timeTextOption = screen.getByText(/25:00/i)
    expect(timeTextOption).toBeInTheDocument()
    screen.debug()
})
