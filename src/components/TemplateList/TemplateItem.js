import React from "react";
import classes from "./TemplateItem.module.css";
import {
  MdDisabledByDefault,
  MdDoubleArrow,
  MdOutlineArrowForward,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeTaskTemplate } from "../../store/taskList-slice";
// maybe add later : numberOfTasksInside
// we need an id,name,
//  dispatch  => addToTasksList
// dispatch => deleteTemplate    => modal are u sure ?

// Add special modal with outsideclick are u sure to deleteTemplate
// number of tempaltes inside etc
// Form onClose etc

// think about useCallBack funtion here !

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
          //   dispatch(removeTaskTemplate(id));
        }}
      >
        <MdOutlineArrowForward className={classes.icon}></MdOutlineArrowForward>
      </span>
    </li>
  );
};

export default TemplateItem;
