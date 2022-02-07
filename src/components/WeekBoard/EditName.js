import React from 'react'
import classes from './EditName.module.css'

function EditName() {
    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="type task name"
                    className={classes.nameInput}
                />
                <button
                    type="button"
                    // onClick={() => {
                    //     console.log('call function name')
                    // }}
                    className={classes.nameConfirm}
                >
                    ok
                </button>
            </div>
        </div>
    )
}

export default EditName
