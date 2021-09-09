import React from "react";
import HeaderButtonMenu from "./HeaderButtonMenu";
import classes from "./HeaderMenuTab.module.css";
import IconLogin from "./IconLogin";

const HeaderMenuTab = (props) => {
  return (
    <div className={classes["tab-menu"]}>
      {/* this is bad becouse we need to call  onClick on button */}
      <HeaderButtonMenu icon={IconLogin} title={"Report"} />
      <HeaderButtonMenu icon={IconLogin} title={"Settings"} />
      <HeaderButtonMenu icon={IconLogin} title={"Login"} />
    </div>
  );
};

export default HeaderMenuTab;
