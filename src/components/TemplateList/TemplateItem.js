import React from "react";
import classes from "./TemplateItem.module.css";
import {
  MdDisabledByDefault,
  MdDoubleArrow,
  MdOutlineArrowForward,
} from "react-icons/md";

import { useDispatch } from "react-redux";
import {
  removeTaskTemplate,
  addTemplateToList,
} from "../../store/taskList-slice";

const TemplateItem = ({ id, name }) => {
  const dispatch = useDispatch();

  return (
    <li className={classes.templateItem}>
      <span
        onClick={() => {
          dispatch(removeTaskTemplate(id));
        }}
      >
        <MdDisabledByDefault className={classes.icon}></MdDisabledByDefault>
      </span>
      <p className={classes.name}>{name}</p>

      <span
        onClick={() => {
          dispatch(addTemplateToList(id));
        }}
      >
        <MdOutlineArrowForward className={classes.icon}></MdOutlineArrowForward>
      </span>
    </li>
  );
};

export default TemplateItem;
