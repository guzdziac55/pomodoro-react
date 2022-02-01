import React, { useState } from "react";
import { Output } from "./Output";

export const Greetings = () => {
  const [changeText, setChangeText] = useState(false);

  return (
    <div>
      <h1>Hello World</h1>
      <p>dupa dupa maryna</p>
      {/* {changeText && <Output>Hello Dawid good to see you!</Output>} */}
      {changeText && <p>Changed</p>}
      <button
        onClick={() => {
          setChangeText(true);
        }}
      >
        change text
      </button>
    </div>
  );
};
