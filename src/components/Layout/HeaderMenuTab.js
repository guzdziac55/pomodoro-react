import React from "react";
// import HeaderButtonMenu from "./HeaderButtonMenu";
import IconLogin from "./IconLogin";
import classes from "./HeaderMenuTab.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { authlogout } from "../../store/auth-actions";

const HeaderMenuTab = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  const setTheme = (theme) => {
    dispatch(uiActions.changeTheme(theme));
  };
  // const handleLogout = dispatch(authActions.logout());

  const handleLogout = () => {
    dispatch(authlogout());
  };

  return (
    <div className={classes["tab-menu"]}>
      {isLogged && (
        <button className={classes.button}>
          <span className={classes.icon}>
            <IconLogin />
          </span>
          <span>Report</span>
        </button>
      )}

      {isLogged && (
        <button onClick={props.onShow} className={classes.button}>
          <span className={classes.icon}>
            <IconLogin />
          </span>
          <span>Settings</span>
        </button>
      )}

      {isLogged && (
        <Link to="/profile">
          <button className={classes.button}>
            <span className={classes.icon}>
              <IconLogin />
            </span>
            <span>Profile</span>
          </button>
        </Link>
      )}

      {!isLogged && (
        <Link to="/login">
          <button className={classes.button}>
            <span className={classes.icon}>
              <IconLogin />
            </span>
            <span>Login</span>
          </button>
        </Link>
      )}
      {isLogged && (
        <button onClick={handleLogout} className={classes.button}>
          <span className={classes.icon}>
            <IconLogin />
          </span>
          <span>Logout</span>
        </button>
      )}
    </div>
  );
};

export default HeaderMenuTab;

// <HeaderButtonMenu icon={<IconLogin />}>Report</HeaderButtonMenu>
// <HeaderButtonMenu onShow={props.onShow} icon={<IconLogin />}>
//   Settings
// </HeaderButtonMenu>
// <HeaderButtonMenu link="/login" icon={<IconLogin />}>
//   Login
// </HeaderButtonMenu>
