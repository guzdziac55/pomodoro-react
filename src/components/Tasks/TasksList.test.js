import { fakeTaskList, render, screen } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";
import React from "react";
import TasksList from "./TasksList";

// initialState:fakeTaskList => taskItems.length 4

describe("Testing list element", () => {
  test("Given taskList state renders taskItems data", () => {
    render(<TasksList />, { initialState: fakeTaskList });

    // "task-item"
    expect(screen.getAllByTestId("task-item").length).toEqual(4);
  });
});
