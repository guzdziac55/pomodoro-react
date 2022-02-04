// import { render } from "@testing-library/react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TimerButtonOption from "./TimerButtonOption";
import { Provider } from "react-redux";
import store from "../../store";

const mockChangeTabOption = jest.fn();

describe("Testing Option Tab menu", () => {
  test("invokes changeTabOption", () => {
    render(
      <Provider store={store}>
        <TimerButtonOption onChangeTabOption={mockChangeTabOption} />
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    expect(mockChangeTabOption).toHaveBeenCalled();
    expect(mockChangeTabOption).toHaveBeenCalledTimes(1);
  });

  test("passing button name as children", () => {
    render(
      <Provider store={store}>
        <TimerButtonOption children={"pomodoro"} />
      </Provider>
    );

    const button = screen.getByRole("button", { name: /pomodoro/ });
    expect(button).toBeInTheDocument();
  });
});
