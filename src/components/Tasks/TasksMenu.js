import React, { useRef, useState } from "react";
import classes from "./TasksMenu.module.css";
import { useDispatch } from "react-redux";
import {
  MdOutlineAutoDelete,
  MdDeleteForever,
  MdDoneAll,
  MdDeleteSweep,
  MdSave,
} from "react-icons/md";
import SaveTemplateModal from "../SaveTemplateModal/SaveTemplateModal";
import { useClickOutside } from "../../hooks/use-clickOutside";
import {
  deleteAllTasks,
  deleteFinishedTasks,
  deleteDoneTasks,
  newTaskTemplate,
} from "../../store/taskList-slice";
import { toast } from "react-toastify";

const TasksMenu = ({ tasks }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const menuRef = useRef();
  const templateFormRef = useRef();

  useClickOutside(templateFormRef, () => {
    if (openTemplateModal) setOpenTemplateModal(false);
  });

  useClickOutside(menuRef, () => {
    if (open) setOpen(false);
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
    setOpen(false);
  };

  const onClickDeleteFinishedTasks = () => {
    dispatch(deleteFinishedTasks());
    setOpen(false);
  };

  const onClickDeleteDoneTasks = () => {
    dispatch(deleteDoneTasks());
    setOpen(false);
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
          <button className={classes.button} onClick={() => setOpen(true)}>
            <MdOutlineAutoDelete className={classes.icon} />
          </button>

          {open && (
            <ul ref={menuRef} className={classes.optionsList}>
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
              {/* save as template ! open modal with save button !  */}
              {/* check that project name exist !  */}
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
