import React from "react";
import { SelectNotification } from "../components/SettingsApp/FormComponents";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import { findNotification } from "./findNotification";
import { useEffect, useState } from "react";

export const useSoundHook = () => {
  const notification = useSelector(SelectNotification);

  const [play] = useSound(findNotification(notification));

  return [play];
};

export default useSound;
