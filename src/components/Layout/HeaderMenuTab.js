import React from "react";
import classes from "./HeaderMenuTab.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MdLogin,
  MdSettings,
  MdQueryStats,
  MdPermIdentity,
  MdOutlineLogout,
} from "react-icons/md";
import { useAuthLogout } from "../../hooks/use-auth";
import { selectCurrentUser } from "../../store/auth-slice";

const HeaderMenuTab = (props) => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const isCurrentUser = useSelector(selectCurrentUser);
  // change is logged to is CurrentUser ? true false

  const { isLoading, error, authLogout } = useAuthLogout();

  const handleLogout = () => {
    authLogout();
  };

  return (
    <div className={classes.tabMenu}>
      {!isLogged && (
        <button className={classes.button}>
          <MdQueryStats className={classes.icon} />

          <span>Report</span>
        </button>
      )}

      {!isLogged && (
        <button onClick={props.onShow} className={classes.button}>
          <MdSettings className={classes.icon} />
          <span>Settings</span>
        </button>
      )}

      {!isLogged && (
        <Link to="/profile">
          <button className={classes.button}>
            <MdPermIdentity className={classes.icon} />

            <span>Profile</span>
          </button>
        </Link>
      )}

      {!isLogged && (
        <Link to="/login">
          <button className={classes.button}>
            <MdLogin className={classes.icon} />

            <span>Login</span>
          </button>
        </Link>
      )}
      {!isLogged && (
        <button onClick={handleLogout} className={classes.button}>
          <MdOutlineLogout className={classes.icon} />
          <span>Logout</span>
        </button>
      )}
    </div>
    // </IconContext.Provider>
  );
};

export default HeaderMenuTab;
