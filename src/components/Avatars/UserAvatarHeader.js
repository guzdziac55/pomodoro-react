import React from 'react'
import { useSelector } from 'react-redux'
import classes from './UserAvatarHeader.module.css'
import { selectUserAvatar } from '../../store/profile-slice'
import { generateAvatarURL } from '../../utils/helperFunctions'

function UserAvatarHeader({ onClick }) {
    const userAvatar = useSelector(selectUserAvatar)

    return (
        <div className={classes.avatarContainer}>
            <button type="button" onClick={onClick}>
                <img
                    alt="avatar"
                    className={classes.avatar}
                    src={generateAvatarURL(userAvatar)}
                />
            </button>
        </div>
    )
}

export default UserAvatarHeader
