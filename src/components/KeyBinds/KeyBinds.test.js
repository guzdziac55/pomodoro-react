import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import KeyBinds from './KeyBinds'
import store from '../../store'

describe('Key Binds testing', () => {
    test('Render initial KeyBinds', () => {
        render(
            <Provider store={store}>
                <KeyBinds />
            </Provider>
        )
        expect(
            screen.getByRole('heading', {
                name: /key binds/i,
            })
        ).toBeInTheDocument()
    })
})
