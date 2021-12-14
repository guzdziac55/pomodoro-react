export const generateAvatarURL = (avatarId) =>
  `https://api.multiavatar.com/${avatarId}.png`;

export const generateRandomId = () =>
  Math.floor(new Date().valueOf() * Math.random());
