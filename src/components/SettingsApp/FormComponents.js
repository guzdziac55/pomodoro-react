/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import classes from './FormComponents.module.css'

export function InputWrapper({ title, children }) {
    return (
        <>
            <span className={classes.labelLarge}>{title}</span>
            <div className={classes.columnWrapper}>{children}</div>
        </>
    )
}

export function InputColumn({ register, name, title, ...rest }) {
    return (
        <div className={classes.formControlColumn}>
            <span className={classes.labelSmall}>{title}</span>
            <input className={classes.input} {...register(name)} {...rest} />
        </div>
    )
}

export function InputRow({ register, name, title, ...rest }) {
    return (
        <div className={classes.formControlRow}>
            <span className={classes.labelLarge}>{title}</span>
            <input
                className={classes.inputSmall}
                {...register(name)}
                {...rest}
            />
        </div>
    )
}

export function SelectNotification({
    register,
    options,
    name,
    title,
    playSound,
    ...rest
}) {
    return (
        <div className={[classes.formControlRow, classes.controlGap].join(' ')}>
            <span className={classes.labelLarge}>{title}</span>
            <div className={classes.select}>
                <select {...register(name)} {...rest}>
                    {options.map((value) => (
                        <option
                            className={classes.option}
                            value={value}
                            key={value}
                        >
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <button
                className={classes.buttonSound}
                type="button"
                onClick={playSound}
            >
                <MdOutlineNotificationsNone className={classes.icon} />
            </button>
        </div>
    )
}

export function Switch({ register, name, title, ...rest }) {
    return (
        <div className={classes.formControlRow}>
            <label htmlFor={title} className={classes.labelLarge}>
                {title}
            </label>
            {/* sprawdzić czy ten label w ogole potrzebny */}
            <label className={classes.switch}>
                <input
                    className={classes.checkbox}
                    {...register(name)}
                    {...rest}
                />
                <span className={classes.slider} />
            </label>
        </div>
    )
}
