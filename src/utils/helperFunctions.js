import { nanoid } from '@reduxjs/toolkit'

export const randomString = () => Math.random().toString(36).substr(2, 5)

export const generateAvatarURL = (avatarId) =>
    `https://api.multiavatar.com/${avatarId}.png`

export const generateRandomId = () =>
    Math.floor(new Date().valueOf() * Math.random())

export const handleOnFocus = (e) => {
    const val = e.target.value
    e.target.value = ''
    e.target.value = val
}

export const ObjTask = (title = 'sample title', note = '', estPomodoro = 1) => {
    const taskObject = {
        id: nanoid(),
        title,
        note,
        actPomodoro: 0,
        estPomodoro,
        done: false,
    }
    return taskObject
}
