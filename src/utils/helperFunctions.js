import { nanoid } from "@reduxjs/toolkit";

export const randomString = () => Math.random().toString(36).substr(2, 5);

export const generateAvatarURL = (avatarId) =>
  `https://api.multiavatar.com/${avatarId}.png`;

//  put into uttils  // helper functions
export const generateRandomId = () =>
  Math.floor(new Date().valueOf() * Math.random());

export const handleOnFocus = (e) => {
  const val = e.target.value;
  e.target.value = "";
  e.target.value = val;
};

// with constructor function
export function ObjTask(title = "sample title", note = "", estPomodoro = 1) {
  this.id = nanoid();
  this.title = title;
  this.note = note;
  this.actPomodoro = 0;
  this.estPomodoro = estPomodoro;
  this.done = false;
}
