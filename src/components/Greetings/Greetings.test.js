import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Output } from "./Output";
import { Greetings } from "./greetings";

describe("Greeting component", () => {
  // test("renders hello world as a text", () => {
  //   render(<Greetings />);
  //   const helloWorldElement = screen.getByText("Hello World"); // exact ma porównywać substrings i uppercases
  //   expect(helloWorldElement).toBeInTheDocument();
  // });

  // test("renders good to see you if the button was NOT clicked", () => {
  //   render(<Greetings />);
  //   const paragraphElement = screen.getByText("Hello Dawid good to see you!", {
  //     exact: false,
  //   });
  //   expect(paragraphElement).toBeInTheDocument();
  // });

  // test("renders text changed when the button was clicked", () => {
  //   render(<Greetings />); //arrage

  //   const buttonElement = screen.getByRole("button");
  //   userEvent.click(buttonElement); //act   clikc butotn

  //   const paragraphElement = screen.getByText("Changed");
  //   expect(paragraphElement).toBeInTheDocument();
  // });

  //   test("hide goodToSeeYou paragraph when user click the button ", () => {
  //     render(<Greetings />);

  //     // ACT
  //     const buttonElement = screen.getByRole("button");
  //     userEvent.click(buttonElement);

  //     const paragraphElement = screen.queryByText("Hello Dawid good to see you!");
  //     expect(paragraphElement).not.toBeInTheDocument();
  //   });
  // });

  test("show goodToSeeYou when user lick the button", () => {
    render(<Greetings />);

    const actionButton = screen.getByRole("button");

    userEvent.click(actionButton);
    const userParagraph = screen.queryByText("Hello Dawid good to see you!");
    expect(userParagraph).not.toBeInTheDocument();
  });
});

// gdy coś musi być initial render dom =>
// to użyj getByText = >

//gdy testujemy że czegoś nie ma użyj query
// query nie wywala nam testu => pozawala przechwytywać 0
