import TimerButtonStart from "./TimerButtonStart";
import React from "react";
import {
  fakeTimerTickingTrue,
  fakeTimerTickingFalse,
  render,
  screen,
} from "../../utils/testUtils";

describe("Testing TimerButton Start/Stop", () => {
  test("Shows button stop while ticking is true", () => {
    render(<TimerButtonStart />, { initialState: fakeTimerTickingTrue });
    const stopButton = screen.getByText(/stop/i);
    expect(stopButton).toBeInTheDocument();
    // screen.debug();
  });
  test("Shows button start while ticking is false'", () => {
    render(<TimerButtonStart />, { initialState: fakeTimerTickingFalse });
    const startButton = screen.getByText(/start/i);
    expect(startButton).toBeInTheDocument();
    // screen.debug();
  });
});
