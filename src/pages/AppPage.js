import React, { useRef } from "react";
import FullAppComponent from "../components/FullAppComponent/FullAppComponent";
import classes from "./AppPage.module.css";
import LayoutComponent from "./LayoutComponent";

const AppPage = () => {
  const infoRef = useRef(null);

  console.log("info ref ");
  console.log(infoRef);

  return (
    <LayoutComponent>
      <div className={classes.containerFull}>
        <FullAppComponent />
      </div>
      {/* <InfoSection infoRef={infoRef} /> */}
      {/* <Footer /> */}
    </LayoutComponent>
  );
};

export default AppPage;
