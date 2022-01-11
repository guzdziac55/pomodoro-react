import React from "react";
import FullAppComponent from "../components/FullAppComponent/FullAppComponent";
import classes from "./AppPage.module.css";
import LayoutComponent from "./LayoutComponent";

const AppPage = () => {
  return (
    <LayoutComponent>
      <div className={classes.containerFull}>
        <div>
          <FullAppComponent />
        </div>
      </div>
    </LayoutComponent>
  );
};

export default AppPage;
