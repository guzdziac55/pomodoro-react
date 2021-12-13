import React from "react";
import classes from "./TemplateList.module.css";
import { selectTemplateList } from "../../store/taskList-slice";
import TemplateItem from "./TemplateItem";
import { useSelector } from "react-redux";
// selector get Template List

// template.map (

// render Li elements !

//  prepere later special Li components with props
//  with icons inside

// )

const TemplateList = () => {
  const templates = useSelector(selectTemplateList);

  //   first make
  //   then return

  const templateList = templates.map((template) => (
    <TemplateItem
      key={template.id}
      id={template.id}
      name={template.templateName}
    />
  ));

  return <ul className={classes.templateList}>{templateList}</ul>;
};

export default TemplateList;
