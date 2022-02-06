import moment from 'moment'
import React from 'react'
import { MdEditCalendar } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import classes from './GetCalendarButton.module.css'
import { replaceTaskList } from '../../../store/taskList-slice'
import { selectWeekDay } from '../../../store/weekPlan-slice'

function GetCalendarButton() {
    const currentWeekDay = moment().isoWeekday()
    const dispatch = useDispatch()
    const weekday = useSelector((state) => selectWeekDay(state, currentWeekDay))

    const handleLoadWeekDayPlan = () => {
        // eslint-disable-next-line no-alert
        const alert = window.confirm(
            'Do u want to load WeekDay / currentDay tasks ? Remember that u lost your progress on current TaskList '
        )
        if (!alert) {
            return
        }
        dispatch(replaceTaskList(weekday))
    }

    return (
        <div>
            {weekday && (
                <button type="button" className={classes.button}>
                    <MdEditCalendar
                        className={classes.icon}
                        onClick={() => {
                            dispatch(handleLoadWeekDayPlan)
                        }}
                    />
                </button>
            )}
        </div>
    )
}

export default GetCalendarButton
