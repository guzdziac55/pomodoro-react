import React from 'react'
import classes from './Notifications.module.css'
import { Spinner } from './Spinner'

const getSpecialClass = (status) => {
    if (status === 'error') return classes.error
    if (status === 'succes') return classes.succes
    return ''
}

function Notifications({ status, isLoading, title, message }) {
    const specialClass = getSpecialClass(status)
    const cssClasses = `${classes.notifications} ${specialClass}`

    return (
        <section className={cssClasses}>
            {isLoading && <Spinner />}
            <h2>{title}</h2>
            <p>{message}</p>
        </section>
    )
}

export default React.memo(Notifications)
