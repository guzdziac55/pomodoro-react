import userEvent from "@testing-library/user-event";
import React from "react";
import TimerCountdown from "./TimerCountdown";

import { fakeConfig, render, screen } from "../../utils/testUtils";

// config: {
//     configChanged: false,
//     stageOptions: [25, 5, 20],
//     alarmSound: "notification1",
//     autoBreak: false,
//     autoPomodoros: true,
//     longBreakInterval: 4,
//     keyBindsShow: true,
//     keyBindsEnable: true,
//     viewModal: true,
//   },

test("Initial render buttons for select pomodoro time options", () => {
  render(<TimerCountdown />, { initialState: fakeConfig });

  const timeTextOption = screen.getByText(/25:00/i);

  expect(timeTextOption).toBeInTheDocument();

  screen.debug();
});
