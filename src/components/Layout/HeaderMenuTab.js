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
  const [openSettings, setOpenSettings] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const profileFormRef = useRef();
  const settingsFormRef = useRef();

  const handleLogout = () => {
    authLogout();
  };

  useClickOutside(profileFormRef, () => {
    console.log("outside click Formref");
    if (openProfile) setOpenProfile(false);
  });

  useClickOutside(settingsFormRef, () => {
    if (openSettings) setOpenSettings(false);
  });

  return (
    <>
      {openProfile && (
        <ProfileForm
          onClose={() => {
            setOpenProfile(false);
          }}
          formRef={profileFormRef}
        />
      )}
      {/*  */}
      {openSettings && (
        <SettingsForm
          onClose={() => {
            setOpenSettings(false);
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
          onClick={() => setOpenSettings(true)}
          className={classes.button}
        >
          <MdSettings className={classes.icon} />
          <span>Settings</span>
        </button>

        {isLogged && (
          <button
            className={classes.button}
            onClick={() => setOpenProfile(true)}
          >
            <MdPermIdentity className={classes.icon} />
            <span>Profile</span>
          </button>
        )}

        {/* PODMIANKA LOGO AVATAR IMAGE  */}
        {/* PODMIANKA LOGO AVATAR IMAGE  */}
        {/* PODMIANKA LOGO AVATAR IMAGE  */}

        {isLogged && <UserAvatarHeader onClick={() => setOpenProfile(true)} />}

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

//  OLD PROFILE
// <button
//   className={classes.button}
//   onClick={() => setOpenProfile(true)}
// >
//   <MdPermIdentity className={classes.icon} />
//   <span>Profile</span>
// </button>
