import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
// import { Provider } from "react-redux";
import store from '../../store/index'
import Tasks from './Tasks'

// put provider into external function
// DRY

describe('TASK component testing', () => {
    test('shows initial button to add Task / show form', () => {
        render(
            <Provider store={store}>
                <Tasks />
            </Provider>
        )
        const buttonAdd = screen.getByRole('button', { name: /add task/i })
        expect(buttonAdd).toBeInTheDocument()
    })

    test("shows textBox input => for taskname after click 'add task' button", () => {
        render(
            <Provider store={store}>
                <Tasks />
            </Provider>
        )
        const buttonAdd = screen.getByRole('button', { name: /add task/i })
        userEvent.click(buttonAdd)
        const textBox = screen.getByRole('textbox')
        expect(textBox).toBeInTheDocument()
    })

    test('hides button addTask after click on it', () => {
        render(
            <Provider store={store}>
                <Tasks />
            </Provider>
        )
        const buttonAdd = screen.getByRole('button', { name: /add task/i })
        userEvent.click(buttonAdd)

        expect(buttonAdd).not.toBeInTheDocument()
    })

    // v2

    // test("hides button addTask after click on it ", () => {
    //   render(
    //     <Provider store={store}>
    //       <Tasks />
    //     </Provider>
    //   );
    //   const buttonAdd = screen.getByRole("button", { name: /add task/i });
    //   expect(buttonAdd).toBeInTheDocument();
    //   userEvent.click(buttonAdd);
    //   const buttonAdd2 = screen.queryByRole("button", { name: /add task/i });
    //   expect(buttonAdd2).toBeFalsy();
    // });
})
