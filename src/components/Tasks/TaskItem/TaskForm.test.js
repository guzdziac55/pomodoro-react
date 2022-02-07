import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import TaskForm from './TaskForm'
import store from '../../../store'

const mockTaskData = {
    id: 'p5wSu-2VHsOEGqb5Wh5we',
    title: 'adaddasdasd',
    note: '',
    actPomodoro: 0,
    estPomodoro: 4,
    done: false,
}

test('check that taskForm renders', () => {
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
    expect(TaskForm)
})

test('check that taskForm include cancel button & confirm button', () => {
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
    const cancelButton = screen.getByRole('button', {
        name: /cancel/i,
    })
    const confirmButton = screen.getByTestId('confirm-button')
    expect(cancelButton).toBeInTheDocument()
    expect(confirmButton).toBeInTheDocument()
})

test('clicking noteButton should hide noteButton & shows textArea-note', () => {
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
    const noteButton = screen.getByText(/add note/i)
    userEvent.click(noteButton)
    const noteArea = screen.getByTestId('textarea-note')
    expect(noteButton).not.toBeInTheDocument()
    expect(noteArea).toBeInTheDocument()
})

test('click note Button & pass default noteName to textArea', () => {
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )

    const noteButton = screen.getByText(/add note/i)
    userEvent.click(noteButton)
    const noteArea = screen.getByTestId('textarea-note')
    expect(noteArea).toBeInTheDocument()
    fireEvent.change(noteArea, {
        target: { value: 'default note area name' },
    })
    expect(
        screen.getByDisplayValue(/default note area name/i)
    ).toBeInTheDocument()
})

test('TaskForm given corrected credentials return enabled saveButton', () => {
    const fakeData = {
        taskName: 'test task name',
        estPomodoro: 4,
    }

    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
    const taskName = screen.getByRole('textbox')
    const inputEstPomodoro = screen.getByRole('spinbutton')
    fireEvent.change(taskName, { target: { value: fakeData.taskName } })
    fireEvent.change(inputEstPomodoro, {
        target: { value: fakeData.estPomodoro },
    })
    const button = screen.getByTestId('confirm-button')
    expect(button).toBeEnabled()
})

test('TaskForm given Not corrected credentials return disabled saveButton', () => {
    const fakeData = {
        taskName: '',
        estPomodoro: 10,
    }

    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )

    const taskName = screen.getByRole('textbox')
    const inputEstPomodoro = screen.getByRole('spinbutton')

    fireEvent.change(taskName, { target: { value: fakeData.taskName } })
    fireEvent.change(inputEstPomodoro, {
        target: { value: fakeData.estPomodoro },
    })
    const button = screen.getByTestId('confirm-button')
    expect(button).toBeDisabled()
})

test('Initial Form with EditMode: false return confirmButton disable', () => {
    render(
        <Provider store={store}>
            <TaskForm editMode={false} />
        </Provider>
    )
    const button = screen.getByTestId('confirm-button')
    expect(button).toBeDisabled()
})

test("Form with EditMode: True, return ConfirmButton with name: 'edit'", () => {
    render(
        <Provider store={store}>
            <TaskForm editMode taskData={mockTaskData} />
        </Provider>
    )
    const button = screen.getByText(/edit/i)
    expect(button).toBeInTheDocument()
})

test("Form with EditMode: False, return ConfirmButton with name: 'save'", () => {
    render(
        <Provider store={store}>
            <TaskForm editMode={false} taskData={mockTaskData} />
        </Provider>
    )
    const button = screen.getByText(/save/i)
    expect(button).toBeInTheDocument()
})

test('Increases estPomodoro by one', () => {
    render(
        <Provider store={store}>
            <TaskForm editMode taskData={mockTaskData} />
        </Provider>
    )
    const increaseButton = screen.getByTestId('increase-button')
    expect(screen.getByDisplayValue(/4/i)).toBeInTheDocument()
    userEvent.click(increaseButton)
    expect(screen.getByDisplayValue(/5/i)).toBeInTheDocument()
})

test('Decrease estPomodoro by one', () => {
    render(
        <Provider store={store}>
            <TaskForm editMode taskData={mockTaskData} />
        </Provider>
    )
    const decreaseButton = screen.getByTestId('decrease-button')
    expect(screen.getByDisplayValue(/4/i)).toBeInTheDocument()
    userEvent.click(decreaseButton)
    expect(screen.getByDisplayValue(/3/i)).toBeInTheDocument()
    expect(decreaseButton).toBeInTheDocument()
})

test('Dont increase EstPomodoro value if current value = 9', () => {
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
    const increaseButton = screen.getByTestId('increase-button')
    const inputEstPomodoro = screen.getByRole('spinbutton')
    fireEvent.change(inputEstPomodoro, {
        target: { value: 9 },
    })
    userEvent.click(increaseButton)
    expect(screen.getByDisplayValue(/9/i)).toBeInTheDocument()
})

test('Dont decrease EstPomodoro value if current value = 1', () => {
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
    const decreaseButton = screen.getByTestId('decrease-button')
    const inputEstPomodoro = screen.getByRole('spinbutton')
    fireEvent.change(inputEstPomodoro, {
        target: { value: 1 },
    })
    userEvent.click(decreaseButton)
    expect(screen.getByDisplayValue(/1/i)).toBeInTheDocument()
})
