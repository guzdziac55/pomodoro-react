import React from "react";
import classes from "./TemplateList.module.css";
import { selectTemplateList } from "../../store/taskList-slice";
import TemplateItem from "./TemplateItem";
import { useSelector } from "react-redux";
import { useState } from "react";

const TemplateList = () => {
  const templates = useSelector(selectTemplateList);
  const [showList, setShowList] = useState(true);

  const toogleList = () => {
    setShowList((current) => setShowList(!current));
  };

  const templateList = templates.map((template) => (
    <TemplateItem
      key={template.id}
      id={template.id}
      name={template.templateName}
    />
  ));

  return (
    <>
      <button className={classes.showButton} onClick={toogleList}>
        {showList ? "Hide Templates " : "Show Templates"}
      </button>
      {showList && (
        <ul className={classes.templateList}>
          {templates.length === 0 ? (
            <p className={classes.info}>There is no templates </p>
          ) : (
            templateList
          )}
        </ul>
      )}
    </>
  );
};

export default TemplateList;
