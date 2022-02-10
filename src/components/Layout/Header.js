/* eslint-disable import/no-cycle */
import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import HeaderMenuTab from './HeaderMenuTab'

const headerVariants = {
    hidden: {
        y: -100,
        opacity: 1,
    },
    visable: {
        opacity: 1,
        y: 0,
    },
}

function Header() {
    return (
        <header
            variants={headerVariants}
            initial="hidden"
            animate="visable"
            className={classes.header}
        >
            <Link to="/app">
                <h1>Pomodoro</h1>
            </Link>

            <HeaderMenuTab />
        </header>
    )
}

export default Header
