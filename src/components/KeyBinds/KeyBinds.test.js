import { screen, render } from "@testing-library/react";
import KeyBinds from "./KeyBinds";
import React from "react";
import store from "../../store";
import userEvent from "@testing-library/user-event";
import { fakeConfig } from "../../utils/testUtils";
import { Provider } from "react-redux";

describe("Key Binds testing", () => {
  test("Render initial KeyBinds", () => {
    render(
      <Provider store={store}>
        <KeyBinds />
      </Provider>
    );
    expect(
      screen.getByRole("heading", {
        name: /key binds/i,
      })
    ).toBeInTheDocument();
  });
});
