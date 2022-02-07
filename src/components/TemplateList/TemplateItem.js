/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { MdDisabledByDefault, MdOutlineArrowForward } from 'react-icons/md'

import { useDispatch } from 'react-redux'
import classes from './TemplateItem.module.css'
import {
    addTemplateToList,
    removeTaskTemplate,
} from '../../store/taskList-slice'

function TemplateItem({ id, name }) {
    const dispatch = useDispatch()

    return (
        <li className={classes.templateItem}>
            <span
                onClick={() => {
                    dispatch(removeTaskTemplate(id))
                }}
            >
                <MdDisabledByDefault className={classes.icon} />
            </span>
            <p className={classes.name}>{name}</p>

            <span
                onClick={() => {
                    dispatch(addTemplateToList(id))
                }}
            >
                <MdOutlineArrowForward className={classes.icon} />
            </span>
        </li>
    )
}

export default TemplateItem
