import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../store/index'
import TemplateList from './TemplateList'

describe('testing Template component', () => {
    test('show initial hide button', () => {
        render(
            <Provider store={store}>
                <TemplateList />
            </Provider>
        )
        const hideText = screen.getByText(/hide/i)
        expect(hideText).toBeInTheDocument()
    })

    test('changes button text to show', () => {
        render(
            <Provider store={store}>
                <TemplateList />
            </Provider>
        )
        const button = screen.getByText(/hide/i)
        userEvent.click(button)

        expect(
            screen.getByRole('button', {
                name: /show/i,
            })
        ).toBeInTheDocument()
    })

    test('changes button text from show to hide', () => {
        render(
            <Provider store={store}>
                <TemplateList />
            </Provider>
        )
        const buttonHide = screen.getByText(/hide/i)
        userEvent.click(buttonHide)

        expect(
            screen.getByRole('button', {
                name: /show/i,
            })
        ).toBeInTheDocument()

        const buttonShow = screen.getByText(/show/i)
        userEvent.click(buttonShow)
        expect(
            screen.getByRole('button', {
                name: /hide/i,
            })
        ).toBeInTheDocument()
    })
})

// dodatkowy test
// np mock state for redux
// templates [ { object  }]
// pass object into store
// check that no Task Template querry  = = = null
// check that render ul with li element template
