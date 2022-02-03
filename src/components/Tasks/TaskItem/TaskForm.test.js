import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import store from "../../../store";
import TaskForm from "./TaskForm";

test("check that taskForm renders ", () => {
  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );

  screen.debug();
  //   expect(TaskForm);
});

test("clicking noteButton should hide noteButton ", () => {
  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );

  const noteButton = screen.getByText(/add note/i);
  userEvent.click(noteButton);

  expect(noteButton).not.toBeInTheDocument();
});

// test("clicking noteButton should display textarea ", () => {
//   render(
//     <Provider store={store}>
//       <TaskForm />
//     </Provider>
//   );

//   const noteButton = screen.getByText(/add note/i);
//   userEvent.click(noteButton);

//   const textArea = screen.getByPlaceholderText("");

//   expect(noteButton).not.toBeInTheDocument();
// });

test("TaskForm given credentials return enabled saveButton", () => {
  const fakeData = {
    taskName: "test task name",
  };
  //   const taskName = screen.getByDisplayValue(/test task name/i);

  const saveButton = screen.getByRole("button", {
    name: /save/i,
  });

  //   fireEvent.change(taskName, { target: { value: fakeData.taskName } });

  expect(saveButton).toBeDisabled();
  // mock data to put inside
});

// zapytanie czy jak taskForm jest closed to mogę go testować.
// raczej tak bo to jest obosny komponent samodzielnie wyrenderowany
