/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { useSelector } from 'react-redux'
import classes from './UserAvatarHeader.module.css'
import { selectUserAvatar } from '../../store/profile-slice'
import { generateAvatarURL } from '../../utils/helperFunctions'

function UserAvatarHeader({ onClick }) {
    const userAvatar = useSelector(selectUserAvatar)

    return (
        <div className={classes.avatarContainer} onClick={onClick}>
            <img
                alt="avatar"
                className={classes.avatar}
                src={generateAvatarURL(userAvatar)}
            />
        </div>
    )
}

export default UserAvatarHeader
