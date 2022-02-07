import React, { useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import classes from './ProfileForm.module.css'
import { useCheckImage } from '../../hooks/use-checkImage'
import {
    selectUserAvatar,
    selectUserName,
    setAvatarUrl,
    setUserName,
} from '../../store/profile-slice'
import { generateAvatarURL, randomString } from '../../utils/helperFunctions'

import Modal from '../UI/Modal'

function ProfileForm({ formRef, onClose }) {
    const dispatch = useDispatch()

    const initialName = useSelector(selectUserName)
    const initialAvatar = useSelector(selectUserAvatar)

    const [name, setName] = useState(initialName)
    const [isLoading, imageExist, avatarId, checkImage] = useCheckImage()

    useEffect(() => {
        checkImage('default')
    }, [checkImage])

    const getRandomAvatar = () => {
        const random = randomString()
        checkImage(random)
    }

    const confirmAvatar = () => {
        dispatch(setAvatarUrl(avatarId))
    }

    const submitForm = () => {
        dispatch(setUserName(name))
        onClose()
    }

    const isLoadingClass = isLoading ? classes.hidden : classes.show

    return (
        <Modal>
            <form onSubmit={submitForm} ref={formRef}>
                <div className={classes.formMain}>
                    {/* CURRENT AVATAR SHOW */}
                    <h1>Hello {initialName}</h1>
                    <div className={classes.formControlColumn}>
                        <div className={classes.avatarContainer}>
                            <img
                                alt="initial-avatar"
                                src={generateAvatarURL(initialAvatar)}
                                className={classes.avatarImg}
                            />
                        </div>

                        {/* AVATAR GENERATOR BY NAME  */}
                        <span className={classes.labelLarge}>
                            Set user Avatar
                        </span>
                        <div className={classes.nameContainer}>
                            <input
                                id="name"
                                className={classes.nameInput}
                                type="text"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                value={name}
                                placeholder="Set your name to draw avatar"
                            />

                            <button
                                className={`${classes.nameSubmit} ${isLoadingClass}`}
                                onClick={() => {
                                    checkImage(name)
                                }}
                                type="button"
                            >
                                <span> getAvatar</span>
                            </button>
                        </div>

                        {/* AVATAR GENERATOR RANDOM */}
                        {imageExist && (
                            <div className={classes.avatarPicker}>
                                <div className={classes.rollAvatarContainer}>
                                    <img
                                        alt="avatar"
                                        src={generateAvatarURL(avatarId)}
                                        className={classes.avatarImg}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className={`${classes.getAvatarButton} ${isLoadingClass}`}
                                    onClick={getRandomAvatar}
                                >
                                    <MdRefresh className={classes.iconSmall} />
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmAvatar}
                                    className={isLoadingClass}
                                >
                                    ok
                                </button>
                            </div>
                        )}
                        {!imageExist && (
                            <p> cannot get avatar // too many api calls </p>
                        )}
                    </div>
                </div>
                {/* {openAvatars && <div></div>} */}
                <div className={classes.formMenu}>
                    <button
                        type="button"
                        className={classes.btnCancel}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button type="submit">Confirm</button>
                </div>
            </form>
        </Modal>
    )
}

export default ProfileForm
