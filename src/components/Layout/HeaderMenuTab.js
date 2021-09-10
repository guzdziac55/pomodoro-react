import React from "react";
import HeaderButtonMenu from "./HeaderButtonMenu";
import IconLogin from "./IconLogin";
import classes from "./HeaderMenuTab.module.css";

const HeaderMenuTab = (props) => {
  return (
    <div className={classes["tab-menu"]}>
      <HeaderButtonMenu icon={<IconLogin />} title={"Report"} />
      <HeaderButtonMenu icon={<IconLogin />} title={"Settings"} />
      <HeaderButtonMenu icon={<IconLogin />} title={"Login"} />
    </div>
    //  {/* <HeaderButtonMenu icon={<IconLogin />} title={"Login"} /> */}
  );
};

export default HeaderMenuTab;
