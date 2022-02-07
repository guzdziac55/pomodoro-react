import React from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props) => {
    const invalid = !props.valid ? classes.error : ''

    return (
        <div className={classes.input}>
            <label className={classes.label} htmlFor={props.input.id}>
                {props.label}
            </label>
            <input
                ref={props.useRef}
                value={props.input.value}
                className={`${invalid}`}
                autoComplete="off"
                {...props.input}
            />
        </div>
    )
})

export default Input
