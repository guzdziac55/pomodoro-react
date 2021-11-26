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
import SettingsForm from "../SettingsApp/Settings";
import { useClickOutside } from "../../hooks/use-clickOutside";
import ProfileForm from "../ProfileApp/ProfileForm";
import UserAvatarHeader from "./UserAvatarHeader";

const HeaderMenuTab = ({ onSetOpen }) => {
  const isLogged = useSelector(selectCurrentUser);
  const { isLoading, error, authLogout } = useAuthLogout();
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const profileFormRef = useRef();
  const settingsFormRef = useRef();

  const handleLogout = () => {
    authLogout();
  };

  useClickOutside(profileFormRef, () => {
    console.log("outside click Formref");
    if (openProfileModal) setOpenProfileModal(false);
  });

  useClickOutside(settingsFormRef, () => {
    if (openSettingsModal) setOpenSettingsModal(false);
  });

  return (
    <>
      {openProfileModal && (
        <ProfileForm
          onClose={() => {
            setOpenProfileModal(false);
          }}
          formRef={profileFormRef}
        />
      )}
      {/*  */}
      {openSettingsModal && (
        <SettingsForm
          onClose={() => {
            setOpenSettingsModal(false);
          }}
          formRef={settingsFormRef}
        />
      )}
      <div className={classes.tabMenu}>
        {isLogged && (
          <button className={classes.button}>
            <MdQueryStats className={classes.icon} />
            <span>Report</span>
          </button>
        )}

        <button
          onClick={() => setOpenSettingsModal(true)}
          className={classes.button}
        >
          <MdSettings className={classes.icon} />
          <span>Settings</span>
        </button>

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

        {isLogged && (
          <UserAvatarHeader onClick={() => setOpenProfileModal(true)} />
        )}
      </div>
    </>
  );
};

export default HeaderMenuTab;
