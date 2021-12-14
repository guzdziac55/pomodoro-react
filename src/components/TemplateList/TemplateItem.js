import React from "react";
import classes from "./TemplateItem.module.css";
import {
  MdDisabledByDefault,
  MdDoubleArrow,
  MdOutlineArrowForward,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeTaskTemplate } from "../../store/taskList-slice";

// save tempalte items without id !

// when add into taskList add them id ! => they are part of new taskList

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
          console.log("add to list");
        }}
      >
        <MdOutlineArrowForward className={classes.icon}></MdOutlineArrowForward>
      </span>
    </li>
  );
};

export default TemplateItem;
