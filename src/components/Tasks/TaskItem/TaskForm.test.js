import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./../../../store/index";
import TaskForm from "./TaskForm";

describe("Task form tests", () => {
  test("testing initial test", () => {
    render(<TaskForm />);
    const buttonLogin = getByText(/login user/i);

    expect(buttonLogin).toBeInTheDocument();
  });
});
