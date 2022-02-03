import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import store from "../../../store";
import TaskForm from "./TaskForm";

test("check that taskForm renders ", () => {
  const TaskFormComponent = render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );

  expect(TaskForm);
});

test("check that taskForm include cancel button ", () => {
  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );
  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });

  expect(cancelButton).toBeInTheDocument();
});

// is should be snapshot test !
// test("check that taskForm hide after click cancel button ", () => {
//   render(
//     <Provider store={store}>
//       <TaskForm />
//     </Provider>
//   );
//   const cancelButton = screen.queryByRole("button", {
//     name: /cancel/i,
//   });

//   fireEvent.click(cancelButton);
//   screen.debug();
//   // expect(cancelButton).toBeNull();
// });

test("clicking noteButton should hide noteButton & shows textArea-note ", () => {
  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );

  const noteButton = screen.getByText(/add note/i);
  userEvent.click(noteButton);
  const noteArea = screen.getByTestId("textarea-note");
  expect(noteButton).not.toBeInTheDocument();
  expect(noteArea).toBeInTheDocument();
});

test("TaskForm given corrected credentials return enabled saveButton", () => {
  const fakeData = {
    taskName: "test task name",
    estPomodoro: 4,
  };

  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );

  const taskName = screen.getByRole("textbox");
  const inputEstPomodoro = screen.getByRole("spinbutton");

  fireEvent.change(taskName, { target: { value: fakeData.taskName } });
  fireEvent.change(inputEstPomodoro, {
    target: { value: fakeData.estPomodoro },
  });

  const button = screen.getByTestId("confirm-button");
  expect(button).toBeEnabled();
});

test("TaskForm given Not corrected credentials return enabled saveButton", () => {
  const fakeData = {
    taskName: "",
    estPomodoro: 10,
  };

  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );

  const taskName = screen.getByRole("textbox");
  const inputEstPomodoro = screen.getByRole("spinbutton");

  fireEvent.change(taskName, { target: { value: fakeData.taskName } });
  fireEvent.change(inputEstPomodoro, {
    target: { value: fakeData.estPomodoro },
  });
  const button = screen.getByTestId("confirm-button");

  expect(button).toBeDisabled();
});

// more:
// - pass props into form and check that It is in the taskNote

test("Increases estPomodoro by one", () => {
  const mockEditMode = true;
  const mockTaskData = {
    //
    id: "p5wSu-2VHsOEGqb5Wh5we",
    title: "adaddasdasd",
    note: "",
    actPomodoro: 0,
    estPomodoro: 4,
    done: false,
  };
  render(
    <Provider store={store}>
      <TaskForm editMode={mockEditMode} taskData={mockTaskData} />
    </Provider>
  );

  // const taskName = screen.getByRole("textbox");
  // const inputEstPomodoro = screen.getByRole("spinbutton");

  // fireEvent.change(taskName, { target: { value: fakeData.taskName } });
  // fireEvent.change(inputEstPomodoro, {
  //   target: { value: fakeData.estPomodoro },
  // });
  // const button = screen.getByTestId("confirm-button");

  screen.debug();
  // expect(button).toBeDisabled();
});
