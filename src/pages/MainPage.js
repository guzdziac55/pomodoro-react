import React, { useRef, useEffect } from "react";
import InfoSection from "../components/InfoSection/InfoSection";
import FullAppComponent from "../components/FullAppComponent/FullAppComponent";
import classes from "./MainPage.module.css";
import LayoutComponent from "./LayoutComponent";
import Footer from "../components/Footer/Footer";

const MainPage = () => {
  const infoRef = useRef();
  console.log(infoRef);
  return (
    <LayoutComponent>
      <div className={classes.containerFull}>
        <FullAppComponent infoRef={infoRef} />
      </div>

      <InfoSection infoRef={infoRef} />
      <Footer />
    </LayoutComponent>
  );
};

export default MainPage;
