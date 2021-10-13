import React from "react";
import HeaderButtonMenu from "./HeaderButtonMenu";
import IconLogin from "./IconLogin";
import classes from "./HeaderMenuTab.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useSelector } from "react-redux";
import { authlogout } from "../../store/auth-actions";

const HeaderMenuTab = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  // const handleLogout = dispatch(authActions.logout());

  const handleLogout = () => {
    console.log("logout");
    // logout operuje tylko na dispatch stoptimer i localStorage
    authlogout(dispatch);
    // dispatch(authActions.logout());
    // //  stopTimerhere with let TimerId
    // // handle
    // localStorage.removeItem("token");
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
