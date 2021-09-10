import React from "react";
import HeaderButtonMenu from "./HeaderButtonMenu";
import classes from "./HeaderMenuTab.module.css";
import IconLogin from "./IconLogin";
import classes from "./HeaderButtonMenu.module.css";

const HeaderMenuTab = (props) => {
  return (
    <div className={classes["tab-menu"]}>
      {/* this is bad becouse we need to call  onClick on button */}
      {/*  we can pass prop function into it  */}
      <HeaderButtonMenu>
        <span className={classes.icon}>
          <IconLogin></IconLogin>
        </span>
        <span>asdasdsad</span>
      </HeaderButtonMenu>
      {/* <HeaderButtonMenu icon={<IconLogin />} title={"Report"} /> */}
      <HeaderButtonMenu icon={<IconLogin />} title={"Settings"} />
      <HeaderButtonMenu icon={<IconLogin />} title={"Login"} />
    </div>
  );
};

export default HeaderMenuTab;
