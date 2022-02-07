/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

function Backdrop({ onClose }) {
    return <div className={classes.backdrop} onClick={onClose} />
}
function ModalOverlay({ children }) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays')

function Modal({ children }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.body.style.overflow = 'unset'
    }, [])
    return (
        <>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    )
}

export default Modal
