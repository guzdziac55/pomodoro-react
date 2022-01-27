import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import classes from "./WeekBoard.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import BoardPatterns from "./BoardPatterns";
import { useDispatch, useSelector } from "react-redux"; // for save rrors
import BoardColumn from "./BoardColumn";
import {
  copySampleTask,
  reorderTask,
  moveTask,
} from "../../store/weekPlan-slice";
import "../../store/thunks/taskList-actions";

import { selectWeekPlan } from "../../store/weekPlan-slice";

const onDragEnd = (dispatch, { source, destination }) => {
  if (!destination) return;

  const { index: srcItem, droppableId: srcSColumn } = source;
  const { index: destItem, droppableId: destSColumn } = destination;

  const srcColumn = Number(srcSColumn);
  const destColumn = Number(destSColumn);

  if (srcColumn === 0)
    dispatch(
      copySampleTask({
        srcItem,
        destItem,
        srcColumn,
        destColumn,
      })
    );

  if (srcColumn !== 0)
    dispatch(moveTask({ srcItem, destItem, srcColumn, destColumn }));
};

const WeekBoard = () => {
  const columns = useSelector(selectWeekPlan);
  const dispatch = useDispatch();
  //
  const [cardInEdit, setCardInEdit] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  // const createSample = () => {
  //   const sampleColumn = columns[0];
  //   const sampleColumnItems = columns[0].items;
  //   const newObj = Object.assign({}, { id: nanoid() });
  //   newObj.estPomodoro = 1;
  //   newObj.content = "sample task";
  //   setColumns({
  //     ...columns,
  //     0: { ...sampleColumn, items: [newObj, ...sampleColumnItems] },
  //   });
  // };

  // const handleChangeEstPom = (colInd, itemInd, estPom) => {
  //   const toEdit = Object.assign({}, { ...columns[colInd].items[itemInd] });
  //   toEdit.estPomodoro = estPom;

  return (
    <div className={classes.boardContainer}>
      <DragDropContext onDragEnd={(result) => onDragEnd(dispatch, result)}>
        {Object.entries(columns).map(([id, column]) => {
          if (id == 0) return <BoardPatterns id={id} column={column} />;
          return (
            <BoardColumn
              id={id}
              column={column}
              cardInEdit={cardInEdit}
              tempTitle={tempTitle}
            ></BoardColumn>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default WeekBoard;

const allTasks = [
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
];
const MondayTasks = [
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  // { id: nanoid(), content: "first task" },
  // { id: nanoid(), content: "first task" },
  // { id: nanoid(), content: "secound task" },
];
const TuesdayTasks = [
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
];
const WednesdayTasks = [
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
];

const ThursdayTasks = [
  // {
  //   id: nanoid(),
  //   actPomodoro: 0,
  //   done: false,
  //   estPomodoro: 1,
  //   content: "sadasd",
  // },
  // {
  //   id: nanoid(),
  //   actPomodoro: 0,
  //   done: false,
  //   estPomodoro: 1,
  //   content: "sadasd",
  // },
];
const FridayTasks = [
  // {
  //   id: nanoid(),
  //   actPomodoro: 0,
  //   done: false,
  //   estPomodoro: 1,
  //   content: "sadasd",
  // },
  // {
  //   id: nanoid(),
  //   actPomodoro: 0,
  //   done: false,
  //   estPomodoro: 1,
  //   content: "sadasd",
  // },
];
const SaturdayTasks = [
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
];
const SundayTasks = [
  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },

  {
    id: nanoid(),
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
];

// /////////////////////

// const patterTasks = {
//   [0]: {
//     name: "Tasks",
//     items: allTasks,
//   },
// };

const columnsBackend = {
  [0]: {
    name: "Tasks",
    items: allTasks,
  },
  [1]: {
    name: "Monday",
    items: MondayTasks,
  },
  [2]: {
    name: "Tuesday",
    items: TuesdayTasks,
  },
  [3]: {
    name: "Wednesday",
    items: WednesdayTasks,
    // items: {},
  },
  [4]: {
    name: "Thursday",
    items: ThursdayTasks,
  },
  [5]: {
    name: "Friday",
    items: FridayTasks,
  },
  [6]: {
    name: "Saturday",
    items: SaturdayTasks,
  },
  [7]: {
    name: "Sunday",
    items: SundayTasks,
  },
};
