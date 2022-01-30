import React from "react";
import classes from "./GetCalendarButton.module.css";
import moment from "moment";
import { selectWeekDay } from "../../../store/weekPlan-slice";
import { useDispatch, useSelector } from "react-redux";
import { MdEditCalendar } from "react-icons/md";
import { replaceTaskList } from "../../../store/taskList-slice";

const GetCalendarButton = () => {
  const currentWeekDay = moment().isoWeekday();
  const dispatch = useDispatch();
  const weekday = useSelector((state) => selectWeekDay(state, currentWeekDay));

  const handleLoadWeekDayPlan = () => {
    const alert = window.confirm(
      "Do u want to load WeekDay / currentDay tasks ? Remember that u lost your progress on current TaskList "
    );
    if (!alert) {
      return;
    }
    dispatch(replaceTaskList(weekday));
  };

  return (
    <>
      {weekday && (
        <button className={classes.button}>
          <MdEditCalendar
            className={classes.icon}
            onClick={() => {
              dispatch(handleLoadWeekDayPlan);
            }}
          />
        </button>
      )}
    </>
  );
};

export default GetCalendarButton;
