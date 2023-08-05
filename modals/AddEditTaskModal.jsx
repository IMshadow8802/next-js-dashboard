import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import boardsSlice from "@/redux/boardSlice";
import { Dialog,Input,Textarea } from "@material-tailwind/react";

function AddEditTaskModal({
  type,
  device,
  isTaskModalOpen,
  setIsTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  const handleOpen = () => setIsTaskModalOpen((prevState) => !prevState);

  return (
    <>

      {/* Dialog component */}
      <Dialog
        size="sm"
        open={isTaskModalOpen}
        handler={handleOpen}
      >
        {/* Dialog content */}
        <div className="p-4">
          <h3 className="text-lg font-poppinsBold">
            {type === "edit" ? "Edit" : "Add New"} Task
          </h3>
          <div className="mt-4 mb-4 flex flex-col space-y-1">
            <label className="text-sm text-gray-600">Task Name</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="task-name-input"
              type="text"
              className="px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-900 focus:outline-[#635fc7] outline-1 ring-0"
              placeholder="e.g Take coffee break"
            />
          </div>

          <div className="mt-2 flex flex-col space-y-1">
            <label className="text-sm text-gray-600">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="task-description-input"
              className="px-4 py-2 outline-none min-h-[200px] focus:border-0 rounded-md text-sm border border-gray-900 focus:outline-[#635fc7] outline-[1px]"
              placeholder="e.g. It's always good to take a break. This 15-minute break will recharge the batteries a little."
            />
          </div>

          {/* Subtasks */}
          <div className="mt-4 flex flex-col space-y-3">
            <label className="text-sm text-gray-600">Subtasks</label>

            {subtasks.map((subtask, index) => (
              <div key={index} className="flex items-center w-full">
                <Input
                  onChange={(e) => {
                    onChangeSubtasks(subtask.id, e.target.value);
                  }}
                  type="text"
                  value={subtask.title}
                  className="px-4 py-2 outline-none focus:border-0 flex-grow rounded-md text-sm border border-gray-900 focus:outline-[#635fc7] outline-[1px]"
                  placeholder="e.g Take coffee break"
                />
                <img
                  src="/img/icon-cross.svg"
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                  className="m-4 cursor-pointer"
                />
              </div>
            ))}

            <button
              className="w-full mt-4 items-center text-white bg-[#635fc7] p-2 rounded-2xl"
              onClick={() => {
                setSubtasks((state) => [
                  ...state,
                  { title: "", isCompleted: false, id: uuidv4() },
                ]);
              }}
            >
              + Add New Subtask
            </button>
          </div>

          {/* current Status */}
          <div className="mt-4 flex flex-col space-y-3">
            <label className="text-sm text-gray-600">Current Status</label>
            <select
              value={status}
              onChange={onChangeStatus}
              className="select-status flex-grow p-4 mb-2 mt-2 rounded-2xl text-sm bg-transparent focus:border-0 border border-gray-900 focus:outline-[#635fc7] outline-none"
            >
              {columns.map((column, index) => (
                <option key={index}>{column.name}</option>
              ))}
            </select>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid) {
                  onSubmit(type);
                  setIsTaskModalOpen(false);
                  type === "edit" && setIsTaskModalOpen(false);
                }
              }}
              className="w-full items-center text-white bg-[#635fc7] p-2 rounded-2xl mt-2"
            >
              {type === "edit" ? "Save Edit" : "Create Task"}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AddEditTaskModal;