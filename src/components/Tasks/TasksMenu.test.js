import { screen, render } from "@testing-library/react";
import TasksMenu from "./TasksMenu";
import React from "react";
import store from "../../store";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
// import userEvent from "@testing-library/user-event";

// test("Shows tasks context menu after click on Button open task edit", () => {
//   render(
//     <Provider store={store}>
//       <TasksMenu />
//     </Provider>
//   );

//   const buttonOpen = querySelector(
//     "#root > main > div:nth-child(2) > div > div:nth-child(2) > section > div"
//   );

//   userEvent.click(buttonOpen);

//   //   const taskMenu = screen.
//   screen.debug();
//   //   expect();
// });

// problem with selector taskMenu button / ul list !
