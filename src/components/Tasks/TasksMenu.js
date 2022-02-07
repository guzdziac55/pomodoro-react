/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react'
import {
    MdDeleteForever,
    MdDeleteSweep,
    MdDoneAll,
    MdOutlineAutoDelete,
    MdSave,
} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import GetCalendarButton from './TaskItem/GetCalendarButton'
import classes from './TasksMenu.module.css'
import { useClickOutside } from '../../hooks/useClickOutside'
import {
    deleteAllTasks,
    deleteDoneTasks,
    deleteFinishedTasks,
    newTaskTemplate,
} from '../../store/taskList-slice'
import SaveTemplateModal from '../SaveTemplateModal/SaveTemplateModal'

function TasksMenu({ tasks }) {
    const dispatch = useDispatch()
    const taskEditRef = useRef()
    const templateFormRef = useRef()
    const [openTaskEdit, setOpenTaskEdit] = useState(false)
    const [openTemplateModal, setOpenTemplateModal] = useState(false)

    useClickOutside(templateFormRef, () => {
        if (openTemplateModal) setOpenTemplateModal(false)
    })

    useClickOutside(taskEditRef, () => {
        if (openTaskEdit) setOpenTaskEdit(false)
    })

    const handleOpenTemplateModal = () => {
        if (tasks.length === 0) {
            toast.info('First add task to list')
            return
        }
        setOpenTemplateModal(true)
    }

    const onClicknewTaskTemplate = (name) => {
        dispatch(newTaskTemplate(name))
    }

    const onClickDeleteAllTasks = () => {
        dispatch(deleteAllTasks())
        setOpenTaskEdit(false)
    }

    const onClickDeleteFinishedTasks = () => {
        dispatch(deleteFinishedTasks())
        setOpenTaskEdit(false)
    }

    const onClickDeleteDoneTasks = () => {
        dispatch(deleteDoneTasks())
        setOpenTaskEdit(false)
    }

    return (
        <>
            {openTemplateModal && (
                <SaveTemplateModal
                    newTemplate={onClicknewTaskTemplate}
                    onClose={() => {
                        setOpenTemplateModal(false)
                    }}
                    formRef={templateFormRef}
                />
            )}
            <section className={classes.tasksMenu}>
                <span>Tasks</span>
                <div className={classes.options}>
                    <div className={classes.optionsButtons}>
                        {/* button with logic inside */}
                        <GetCalendarButton />
                        <button
                            type="button"
                            className={classes.button}
                            onClick={() => setOpenTaskEdit(true)}
                            data-testid="tasks-menuButton"
                        >
                            <MdOutlineAutoDelete className={classes.icon} />
                        </button>
                    </div>
                    {openTaskEdit && (
                        <ul
                            ref={taskEditRef}
                            data-testid="tasks-menuList"
                            className={classes.optionsList}
                        >
                            <li
                                role="menuitem"
                                className={classes.listItem}
                                onClick={onClickDeleteFinishedTasks}
                                tabIndex="0"
                            >
                                <MdDeleteSweep className={classes.iconSmall} />{' '}
                                delete finished
                            </li>
                            <li
                                role="menuitem"
                                className={classes.listItem}
                                onClick={onClickDeleteDoneTasks}
                            >
                                <MdDoneAll className={classes.iconSmall} />
                                delete done
                            </li>

                            <li
                                role="menuitem"
                                className={classes.listItem}
                                onClick={handleOpenTemplateModal}
                            >
                                <MdSave className={classes.iconSmall} />
                                save as template
                            </li>
                            <hr className={classes.break} />
                            <li
                                role="menuitem"
                                className={classes.listItem}
                                onClick={onClickDeleteAllTasks}
                            >
                                <MdDeleteForever
                                    className={classes.iconSmall}
                                />
                                delete all
                            </li>
                        </ul>
                    )}
                </div>
            </section>
        </>
    )
}

export default TasksMenu
