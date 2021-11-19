import React, { useRef, useState } from "react";
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
import HookForm from "../SettingsApp/SettingsApp";
import { useClickOutside } from "../../hooks/use-clickOutside";

const HeaderMenuTab = ({ onSetOpen }) => {
  const isLogged = useSelector(selectCurrentUser);
  const { isLoading, error, authLogout } = useAuthLogout();
  const [open, setOpen] = useState(false);

  const formRef = useRef();

  const handleLogout = () => {
    authLogout();
  };

  useClickOutside(formRef, () => {
    if (open) setOpen(false);
  });

  return (
    <>
      {/* Render Settings Form  */}
      {open && (
        <HookForm
          onClose={() => {
            setOpen(false);
          }}
          formRef={formRef}
        />
      )}
      <div className={classes.tabMenu}>
        {isLogged && (
          <button className={classes.button}>
            <MdQueryStats className={classes.icon} />
            <span>Report</span>
          </button>
        )}

        <button onClick={() => setOpen(true)} className={classes.button}>
          <MdSettings className={classes.icon} />
          <span>Settings</span>
        </button>

        {isLogged && (
          <Link to="/profile">
            <button className={classes.button}>
              <MdPermIdentity className={classes.icon} />
              <span>Profile</span>
            </button>
          </Link>
        )}

        {!isLogged && (
          <Link to="/signup">
            <button className={classes.button}>
              <MdPermIdentity className={classes.icon} />
              <span>Sign up</span>
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
        {isLogged && (
          <button onClick={handleLogout} className={classes.button}>
            <MdOutlineLogout className={classes.icon} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </>
  );
};

export default HeaderMenuTab;
