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
  MdOutlineCalendarToday,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useAuthLogout } from "../../hooks/use-auth";
import { selectCurrentUser } from "../../store/auth-slice";
import SettingsForm from "../SettingsApp/Settings";
import { useClickOutside } from "../../hooks/use-clickOutside";
import ProfileForm from "../ProfileApp/ProfileForm";
import UserAvatarHeader from "../Avatars/UserAvatarHeader";
import { toast } from "react-toastify";

const hoverVariant = {
  hover: {
    scale: 1.1,
    y: -3,
  },
};

const HeaderMenuTab = ({ onSetOpen }) => {
  const isLogged = useSelector(selectCurrentUser);
  const { authLogout } = useAuthLogout();
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const profileFormRef = useRef();
  const settingsFormRef = useRef();

  const handleLogout = () => {
    authLogout();
  };

  useClickOutside(profileFormRef, () => {
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
      {openSettingsModal && (
        <SettingsForm
          onClose={() => {
            setOpenSettingsModal(false);
          }}
          formRef={settingsFormRef}
        />
      )}

      {/* navigation !  */}
      <div className={classes.tabMenu}>
        <motion.button
          variants={hoverVariant}
          whileHover="hover"
          onClick={() => setOpenSettingsModal(true)}
          className={classes.button}
        >
          <MdSettings className={classes.icon} />
          <span>Settings</span>
        </motion.button>

        {isLogged && (
          <>
            {/* //  WEEK BOARD DND */}
            <Link to="/board">
              <motion.button
                className={classes.button}
                variants={hoverVariant}
                whileHover="hover"
              >
                {/* icon here */}
                <MdOutlineCalendarToday className={classes.icon} />
                <span>Week Board</span>
              </motion.button>
            </Link>

            <motion.button
              onClick={() => {
                toast.info("This functionality comming soon");
              }}
              className={classes.button}
              variants={hoverVariant}
              whileHover="hover"
            >
              <MdQueryStats className={classes.icon} />
              <span>Report</span>
            </motion.button>

            <motion.button
              onClick={handleLogout}
              className={classes.button}
              variants={hoverVariant}
              whileHover="hover"
            >
              <MdOutlineLogout className={classes.icon} />
              <span>Logout</span>
            </motion.button>
            <UserAvatarHeader onClick={() => setOpenProfileModal(true)} />
          </>
        )}

        {!isLogged && (
          <>
            <Link to="/signup">
              <motion.button
                variants={hoverVariant}
                whileHover="hover"
                className={classes.button}
              >
                <MdPermIdentity className={classes.icon} />
                <span>SignUp</span>
              </motion.button>
            </Link>

            <Link to="/login">
              <motion.button
                variants={hoverVariant}
                whileHover="hover"
                className={classes.button}
              >
                <MdLogin className={classes.icon} />
                <span>Login</span>
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default HeaderMenuTab;
