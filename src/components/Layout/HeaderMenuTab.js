import React from "react";
import HeaderButtonMenu from "./HeaderButtonMenu";
import classes from "./HeaderMenuTab.module.css";
import IconLogin from "./IconLogin";
import IconReport from "./IconReport";
import IconSettings from "./IconSettings";

const iconSrc = {
  report: IconReport,
  settings: IconSettings,
  login: IconLogin,
};

const HeaderMenuTab = (props) => {
  return (
    <div className={classes["tab-menu"]}>
      {/* this is bad becouse we need to call  onClick on button */}
      <HeaderButtonMenu icon={iconSrc.report} title={"Report"} />
      <HeaderButtonMenu icon={iconSrc.settings} title={"Settings"} />
      <HeaderButtonMenu icon={iconSrc.login} title={"Login"} />
    </div>
  );
};

export default HeaderMenuTab;
