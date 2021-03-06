import React, { useRef } from 'react'
import classes from './SaveTemplateModal.module.css'
import Modal from '../UI/Modal'

function SaveTemplateModal({ newTemplate, onClose, formRef }) {
    const nameRef = useRef()

    const submitForm = (e) => {
        e.preventDefault()
        const templateName = nameRef.current.value
        newTemplate(templateName)
        onClose()
    }

    return (
        <Modal>
            <form ref={formRef} onSubmit={submitForm}>
                <div className={classes.formMain}>
                    <h1>Save your project template</h1>
                    <div className={classes.nameController}>
                        <input
                            required="true"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="insert project name"
                            ref={nameRef}
                        />
                    </div>
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

export default SaveTemplateModal
