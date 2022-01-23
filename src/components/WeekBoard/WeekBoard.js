import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import classes from "./WeekBoard.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import BoardPatterns from "./BoardPatterns";
import BoardColumn from "./BoardColumn";
import { useCallback } from "react";

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

  console.log("result");
  console.log(result);

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

const WeekBoard = () => {
  const [columns, setColumns] = useState(columnsBackend);

  const [cardInEdit, setCardInEdit] = useState(null); // task id
  const [tempTitle, setTempTitle] = useState(""); // task detail => title
  // const [tempEstPomodoro, setEstPomodoro] = useState("");

  const handleDeleteTask = useCallback(
    (itemInd, colInd) => {
      const newColumn = { ...columns };
      newColumn[colInd].items.splice(itemInd, 1);
      setColumns(newColumn);
    },
    [columns]
  );

  const createSample = () => {
    const sampleColumn = columns[0];
    const sampleColumnItems = columns[0].items;
    const newObj = Object.assign({}, { id: nanoid() });
    newObj.estPomodoro = 1;
    newObj.content = "sample task";
    setColumns({
      ...columns,
      0: { ...sampleColumn, items: [newObj, ...sampleColumnItems] },
    });
  };

  const closeEdit = () => {
    setTempTitle("");
    setCardInEdit(null);
  };

  const handleCardTitleEdit = (e, colInd) => {
    e.preventDefault();
    const editItemIdx = columns[colInd].items.findIndex(
      (item) => item.id === cardInEdit
    );
    if (tempTitle.length < 1) {
      handleDeleteTask(editItemIdx, colInd);
      closeEdit();
    } else {
      const toEdit = Object.assign(
        {},
        { ...columns[colInd].items[editItemIdx] }
      );
      toEdit.content = tempTitle.trim();
      const newColumn = { ...columns };
      newColumn[colInd].items[editItemIdx] = toEdit;
      setColumns({ ...newColumn });
      closeEdit();
    }
  };

  const handleChangeEstPom = (colInd, itemInd, estPom) => {
    const toEdit = Object.assign({}, { ...columns[colInd].items[itemInd] });
    toEdit.estPomodoro = estPom;

    const newColumn = { ...columns };
    newColumn[colInd].items[itemInd] = toEdit;
    setColumns({ ...newColumn });
  };

  // const
  const handleOpenEditor = (item, columnId) => {
    console.log(item);
    setCardInEdit(item.id);
    setTempTitle(item.content);
  };

  const handleTaskNameChange = (e) => {
    setTempTitle(e.target.value);
    console.log(tempTitle);
  };

  return (
    <div className={classes.boardContainer}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          if (id == 0)
            return (
              <BoardPatterns
                id={id}
                column={column}
                // useStateProps
                cardInEdit={cardInEdit}
                tempTitle={tempTitle}
                // functions
                handleDeleteTask={handleDeleteTask}
                handleOpenEditor={handleOpenEditor}
                handleCardEdit={handleCardTitleEdit}
                handleChangeEstPom={handleChangeEstPom}
                handleTaskNameChange={handleTaskNameChange}
                //  sample
                createSample={createSample}
              />
            );
          return (
            <BoardColumn
              id={id}
              column={column}
              // useStateProps
              cardInEdit={cardInEdit}
              tempTitle={tempTitle}
              // functions
              handleDeleteTask={handleDeleteTask}
              handleOpenEditor={handleOpenEditor}
              handleCardEdit={handleCardTitleEdit}
              handleChangeEstPom={handleChangeEstPom}
              handleTaskNameChange={handleTaskNameChange}
            ></BoardColumn>
          );
        })}
      </DragDropContext>
      {/* <button
        onClick={() => {
          createSample(columns, setColumns);
        }}
      >
        add
      </button> */}
    </div>
  );
};

export default WeekBoard;
