import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import classes from "./WeekBoard.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import BoardPatterns from "./BoardPatterns";
import BoardColumn from "./BoardColumn";

const allTasks = [
  { id: nanoid(), content: "adadad" },
  { id: nanoid(), content: "2" },
  { id: nanoid(), content: "3" },
  { id: nanoid(), content: "3" },
  { id: nanoid(), content: "3" },
  { id: nanoid(), content: "3" },
  { id: nanoid(), content: "3" },
  { id: nanoid(), content: "3" },
  { id: nanoid(), content: "3" },
];
const MondayTasks = [
  {
    id: 1522273026653,
    actPomodoro: 0,
    done: false,
    estPomodoro: 1,
    content: "sadasd",
  },
  { id: nanoid(), content: "first task" },
  { id: nanoid(), content: "first task" },
  { id: nanoid(), content: "secound task" },
];
const TuesdayTasks = [
  { id: nanoid(), content: "first task" },
  { id: nanoid(), content: "secound task" },
];
const WednesdayTasks = [
  { id: nanoid(), content: "first task" },
  { id: nanoid(), content: "secound task" },
];
// const ThursdayTasks = [
//   { id: 2, content: "first task" },
//   { id: 3, content: "secound task" },
// ];
// const FridayTasks = [
//   { id: 2, content: "first task" },
//   { id: 3, content: "secound task" },
// ];
// const SaturdayTasks = [
//   { id: 2, content: "first task" },
//   { id: 3, content: "secound task" },
// ];
// const SundayTasks = [
//   { id: 2, content: "first task" },
//   { id: 3, content: "secound task" },
// ];

// /////////////////////

const patterTasks = {
  [0]: {
    name: "Tasks",
    items: allTasks,
  },
};

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
  // [4]: {
  //   name: "Thursday",
  //   items: ThursdayTasks,
  // },
  // [5]: {
  //   name: "Friday",
  //   items: FridayTasks,
  // },
  // [6]: {
  //   name: "Saturday",
  //   items: SaturdayTasks,
  // },
  // [7]: {
  //   name: "Sunday",
  //   items: SundayTasks,
  // },
};

const reorder = (list, startIndex, endIndex) => {
  const result = [...list.items];
  const removed = result.splice(startIndex, 1);
  result.splice(endIndex, 0, ...removed);
  return result;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = [...source.items]; // dest[0]. items
  const destClone = [...destination.items];

  const toCopy = Object.assign({}, sourceClone[droppableSource.index]);
  toCopy.id = nanoid();

  destClone.splice(droppableDestination.index, 0, toCopy);

  const result = {};
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = [...source.items]; // dest[0]. items
  const destClone = [...destination.items];

  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone; // only items
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const onDragEnd = (result, columns, setColumns) => {
  const { source, destination } = result;
  if (!destination) return;
  const sInd = +source.droppableId; // source collumn index
  const dInd = +destination.droppableId; // dest collumn ind

  // DIFFERENT COLUMNS ACTION
  if (sInd !== dInd) {
    // GDY WYCIĄGAMY Z PATTERNS !
    if (sInd === 0) {
      const result = copy(columns[sInd], columns[dInd], source, destination);
      const newState = { ...columns };
      newState[dInd].items = [...result[dInd]];
      setColumns(newState);
    } else {
      const result = move(columns[sInd], columns[dInd], source, destination);
      const newState = { ...columns }; // clone copy State

      newState[sInd].items = [...result[sInd]];
      newState[dInd].items = [...result[dInd]];

      setColumns(newState);
    }
  } else {
    const items = reorder(columns[sInd], source.index, destination.index);
    const newColumns = { ...columns };
    newColumns[sInd] = { ...columns[sInd], items };
    setColumns(newColumns);
  }
};

const createSample = (columns, setColumns) => {
  const sampleColumn = columns[0];
  const sampleColumnItems = columns[0].items;
  const newObj = Object.assign({}, { id: nanoid() });
  setColumns({
    ...columns,
    0: { ...sampleColumn, items: [newObj, ...sampleColumnItems] },
  });
};

const WeekBoard = () => {
  const [columns, setColumns] = useState(columnsBackend);
  return (
    <div className={classes.boardContainer}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {/* {Object.entries()} */}

        {Object.entries(columns).map(([id, column]) => {
          if (id == 0) return <BoardPatterns id={id} column={column} />;
          return <BoardColumn id={id} column={column} />;
        })}
      </DragDropContext>
      <button
        onClick={() => {
          createSample(columns, setColumns);
        }}
      >
        add
      </button>
    </div>
  );
};

export default WeekBoard;
