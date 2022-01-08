import React, { useRef } from "react";
import FullAppComponent from "../components/FullAppComponent/FullAppComponent";
import classes from "./AppPage.module.css";
import LayoutComponent from "./LayoutComponent";

const AppPage = () => {
  const infoRef = useRef(null);

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
