export const randomString = () => Math.random().toString(36).substr(2, 5);

export const generateAvatarURL = (avatarId) =>
  `https://api.multiavatar.com/${avatarId}.png`;

//  put into uttils  // helper functions
export const generateRandomId = () =>
  Math.floor(new Date().valueOf() * Math.random());
