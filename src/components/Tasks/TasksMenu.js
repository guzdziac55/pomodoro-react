import React, { useRef, useState } from "react";
import classes from "./TasksMenu.module.css";
import { useDispatch } from "react-redux";
import {
  MdOutlineAutoDelete,
  MdDeleteForever,
  MdDoneAll,
  MdDeleteSweep,
  MdSave,
  MdEditCalendar,
} from "react-icons/md";
import SaveTemplateModal from "../SaveTemplateModal/SaveTemplateModal";
import { useClickOutside } from "../../hooks/use-clickOutside";
import GetCalendarButton from "./TaskItem/GetCalendarButton";
import {
  deleteAllTasks,
  deleteFinishedTasks,
  deleteDoneTasks,
  newTaskTemplate,
} from "../../store/taskList-slice";

import { toast } from "react-toastify";

const TasksMenu = ({ tasks }) => {
  const dispatch = useDispatch();
  const taskEditRef = useRef();
  const templateFormRef = useRef();
  const [openTaskEdit, setOpenTaskEdit] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  useClickOutside(templateFormRef, () => {
    if (openTemplateModal) setOpenTemplateModal(false);
  });

  useClickOutside(taskEditRef, () => {
    if (openTaskEdit) setOpenTaskEdit(false);
  });

  const handleOpenTemplateModal = () => {
    if (tasks.length === 0) {
      toast.info("First add task to list");
      return;
    }
    setOpenTemplateModal(true);
  };

  const onClicknewTaskTemplate = (name) => {
    dispatch(newTaskTemplate(name));
  };

  const onClickDeleteAllTasks = () => {
    dispatch(deleteAllTasks());
    setOpenTaskEdit(false);
  };

  const onClickDeleteFinishedTasks = () => {
    dispatch(deleteFinishedTasks());
    setOpenTaskEdit(false);
  };

  const onClickDeleteDoneTasks = () => {
    dispatch(deleteDoneTasks());
    setOpenTaskEdit(false);
  };

  return (
    <>
      {openTemplateModal && (
        <SaveTemplateModal
          newTemplate={onClicknewTaskTemplate}
          onClose={() => {
            setOpenTemplateModal(false);
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
                className={classes.listItem}
                onClick={onClickDeleteFinishedTasks}
              >
                <MdDeleteSweep className={classes.iconSmall} /> delete finished
              </li>
              <li className={classes.listItem} onClick={onClickDeleteDoneTasks}>
                <MdDoneAll className={classes.iconSmall} />
                delete done
              </li>

              <li
                className={classes.listItem}
                onClick={handleOpenTemplateModal}
              >
                <MdSave className={classes.iconSmall} />
                save as template
              </li>
              <hr className={classes.break}></hr>
              <li className={classes.listItem} onClick={onClickDeleteAllTasks}>
                <MdDeleteForever className={classes.iconSmall} />
                delete all
              </li>
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default TasksMenu;
