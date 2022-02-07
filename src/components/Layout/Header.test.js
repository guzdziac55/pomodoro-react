import { render, screen } from '@testing-library/react'
import React from 'react'
import Header from './Header'
// import Header from "./Header";

// firebase brak !

describe.skip('TASK component testing', () => {
    test("Initial render header 'pomodoro' link", () => {
        render(<Header />)
        const link = screen.getByRole('link', {
            name: /pomodoro/i,
        })
        expect(link).toBeInTheDocument()
    })
})
