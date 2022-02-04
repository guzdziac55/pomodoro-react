import { screen, render } from "@testing-library/react";
import TasksMenu from "./TasksMenu";
import React from "react";
import store from "../../store";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

describe("Contex menu tasks tests", () => {
  test("Opens menu tasks after click on icon ", () => {
    render(
      <Provider store={store}>
        <TasksMenu />
      </Provider>
    );

    const buttonOpen = screen.getByTestId("tasks-menuButton");
    userEvent.click(buttonOpen);
    expect(screen.getByTestId("tasks-menuList")).toBeInTheDocument();
    screen.debug();
  });
});
