import React from 'react'
import classes from './TextArea.module.css'

import { handleOnFocus } from '../../utils/helperFunctions'

function TextArea({ onAction, onChange, value }) {
    const handleKeyDown = (e, callback) => {
        if (e.keyCode === 13) callback()
    }

    return (
        <textarea
            className={classes.textArea}
            value={value}
            onChange={(e) => onChange(e)}
            onBlur={onAction}
            onKeyDown={(e) => handleKeyDown(e, onAction)}
            onFocus={handleOnFocus}
            rows="5"
            cols="22"
            placeholder="type name here"
            maxLength="50"
        />
    )
}

export default TextArea
