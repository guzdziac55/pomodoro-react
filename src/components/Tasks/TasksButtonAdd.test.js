import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import TasksButtonAdd from "./TasksButtonAdd";

const mockToogleForm = jest.fn();
test("invokes handleToggleForm", () => {
  render(<TasksButtonAdd onToggleForm={mockToogleForm} children="Add Task" />);
  const button = screen.getByRole("button", { name: /add task/i });
  userEvent.click(button);

  expect(mockToogleForm).toHaveBeenCalled();
  expect(mockToogleForm).toHaveBeenCalledTimes(1);
});

// mocking hanlder function
