import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector, connect } from 'react-redux'
import { toast } from 'react-toastify'
import useSound from 'use-sound'

import {
    InputColumn,
    InputRow,
    InputWrapper,
    SelectNotification,
    Switch,
} from './FormComponents'
import classes from './Settings.module.css'
import { notifications } from '../../assets/notifications/notifications'
import { findNotification } from '../../hooks/findNotification'
import {
    selectAlarmSound,
    setConfig,
    setConfigChanged,
} from '../../store/config-slice'
import Modal from '../UI/Modal'

// destruck inside !
function Settings({ onClose, formRef }) {
    const dispatch = useDispatch()
    const ref = formRef

    const defaultConfigState = useSelector((state) => state.config)
    const initialSelectNotification = useSelector(selectAlarmSound)
    const [notification, setNotification] = useState(initialSelectNotification)
    const [play] = useSound(findNotification(notification))

    const { register, handleSubmit } = useForm({
        defaultValues: { ...defaultConfigState },
    })
    const notificationsOption = notifications.map(
        (notificationItem) => notificationItem.name
    )

    const onSubmit = (data) => {
        const {
            pomodoroTime,
            shortBreak,
            longBreak,
            configChanged,
            ...dataRest
        } = data
        const newConfigState = {
            ...dataRest,
            stageOptions: [+pomodoroTime, +shortBreak, +longBreak],
        }

        dispatch(setConfig(newConfigState))
        dispatch(setConfigChanged())
        toast.success('Settings saved')
        onClose()
    }

    return (
        <Modal>
            <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.formMain}>
                    <InputWrapper title="Time Options">
                        <InputColumn
                            register={register}
                            name="pomodoroTime"
                            title="Pomodoro"
                            type="number"
                            min="0"
                            max="360"
                            required
                            defaultValue={defaultConfigState.stageOptions[0]}
                        />
                        <InputColumn
                            register={register}
                            name="shortBreak"
                            title="Short break"
                            type="number"
                            min="0"
                            max="360"
                            required
                            defaultValue={defaultConfigState.stageOptions[1]}
                        />
                        <InputColumn
                            register={register}
                            name="longBreak"
                            title="Long break"
                            type="number"
                            min="0"
                            max="360"
                            required
                            defaultValue={defaultConfigState.stageOptions[2]}
                        />
                    </InputWrapper>

                    <SelectNotification
                        name="alarmSound"
                        options={notificationsOption}
                        playSound={play}
                        register={register}
                        title="Alarm Sound"
                        onChange={(e) => {
                            setNotification(e.target.value)
                        }}
                    />

                    <Switch
                        register={register}
                        name="autoBreak"
                        title="Auto Break"
                        type="checkbox"
                        defaultChecked={defaultConfigState.autoBreak === true}
                    />

                    <Switch
                        register={register}
                        name="autoPomodoros"
                        title="Auto Pomodoros"
                        type="checkbox"
                        defaultChecked={
                            defaultConfigState.autoPomodoros === true
                        }
                    />

                    <InputRow
                        register={register}
                        name="longBreakInterval"
                        title="Long break interval"
                        type="number"
                        min="0"
                        max="10"
                        required
                        defaultValue={defaultConfigState.longBreakInterval}
                    />

                    <Switch
                        register={register}
                        name="keyBindsShow"
                        title="Show KeyBinds tips"
                        type="checkbox"
                        defaultChecked={
                            defaultConfigState.keyBindsTips === true
                        }
                    />

                    <Switch
                        register={register}
                        name="keyBindsEnable"
                        title="Enable / Disable KeyBinds"
                        type="checkbox"
                        defaultChecked={
                            defaultConfigState.keyBindsTips === true
                        }
                    />

                    {/*  bottom menu */}
                </div>
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

const SettingsForm = connect()(Settings)

export default SettingsForm
