import { render, screen } from "@testing-library/react";

import { Greetings } from "./greetings";

test("renders hello world as a test", () => {
  render(<Greetings />);
  const helloWorldElement = screen.getByText("Hello World"); // exact ma porównywać substrings i uppercases
  expect(helloWorldElement);
});
