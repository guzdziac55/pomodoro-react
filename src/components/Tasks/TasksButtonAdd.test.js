import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TasksButtonAdd from "./TasksButtonAdd";

test("invokes handleToggleForm", () => {
  const mockToogleForm = jest.fn();

  render(<TasksButtonAdd onToggleForm={mockToogleForm} children="Add Task" />);
  const button = screen.getByRole("button", { name: /add task/i });
  userEvent.click(button);

  expect(mockToogleForm).toHaveBeenCalled();
  expect(mockToogleForm).toHaveBeenCalledTimes(1);
});

// mocking hanlder function
