import { useState, useEffect } from "react";

export const useNotifcationAudio = (url) => {
  //
  // put url Selector Redux here !

  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toogle = () => setPlaying(!playing);
  const playNotification = () => setPlaying(true);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  //   listening when notification sound ends
  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, playNotification, toogle];
};

export default useNotifcationAudio;
