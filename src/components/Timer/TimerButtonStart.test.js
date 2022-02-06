import userEvent from '@testing-library/user-event'
import React from 'react'
import TimerButtonStart from './TimerButtonStart'
import { fakeTimerTicking, render, screen } from '../../utils/testUtils'

describe('Testing TimerButton Start/Stop', () => {
    test("toogle button name text after click from 'start' to 'stop'", () => {
        render(<TimerButtonStart />, { initialState: fakeTimerTicking })
        expect(screen.getByText(/start/i)).toBeInTheDocument()
        userEvent.click(screen.getByText(/start/i))
        expect(screen.getByText(/stop/i)).toBeInTheDocument()
        userEvent.click(screen.getByText(/stop/i))
        expect(screen.getByText(/start/i)).toBeInTheDocument()
        userEvent.click(screen.getByText(/start/i))
    })
    //   problem with skip button change opacity // not hiding
    //   test("show skip button while time is Ticking", () => {
    //     render(<TimerButtonStart />, { initialState: fakeTimerTicking });
    //     expect(screen.getByText(/start/i)).toBeInTheDocument();
    //     userEvent.click(screen.getByText(/start/i));
    //     expect(screen.getByTestId("skip-button")).toBeInTheDocument();
    //   });
    //   test("hide skip button while ticking is False", () => {
    //     render(<TimerButtonStart />, { initialState: fakeTimerTicking });
    //     expect(screen.getByText(/start/i)).toBeInTheDocument();
    //     expect(screen.getByTestId("skip-button")).toBeInTheDocument();
    //     userEvent.click(screen.getByText(/start/i));
    //     expect(screen.getByTestId("skip-button")).toBeInTheDocument();
    //     userEvent.click(screen.getByText(/stop/i));
    //     expect(screen.getByTestId("skip-button")).toBeInTheDocument();
    //   });
})
