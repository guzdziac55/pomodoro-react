import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Test = (props) => {
  const chuj = useSelector((state) => state.tasksList.chuj);
  const active = useSelector((state) => state.tasksList.activeTask);

  return (
    <div>
      {chuj}
      {active}
    </div>
  );
};

export default Test;
