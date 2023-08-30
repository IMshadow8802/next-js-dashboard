import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import boardsSlice from "@/redux/boardSlice";
import { Dialog, Input, Alert } from "@material-tailwind/react";
import axios from "axios";
import { useSnackbar } from "notistack";
import useDataStore from "@/zustand/store";
import { fetchBoardDataById } from "@/zustand/Service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const crossIcon = "/img/icon-cross.svg";
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);

  const boardId = useDataStore((state) => state.activeBoardId)
  console.log("This is board Id",boardId)

  useEffect(() => {
    if (type === "edit" && boardId) {
      async function fetchData() {
        const boardData = await fetchBoardDataById(boardId);
        console.log("This is boarddata by id",boardData)
        if (boardData) {
          setNewColumns(
            boardData[0].BoardDT.map((col) => {
              return { name: col.ColName, tasks: [], id: uuidv4() };
            })
          );
          setName(boardData[0].Board);
          setIsFirstLoad(false);
        }
      }
      fetchData();
    }
  }, [boardId, type]);

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSaveNewBoard = async () => {
    setIsBoardModalOpen(false);
  
    if (!validate()) {
      // Validation failed
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const currentDate = new Date();
    const formattedCreateDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.toLocaleTimeString('en-US')}`;
  
    const data = {
      BoardId: type === "edit" ? (boardId ? boardId : "0") : "0", // Set BoardId based on type
      Board: name,
      CompId: "1",
      BranchId: "1",
      CreateUid: "1",
      CreateDate: formattedCreateDate,
      EditDate: formattedCreateDate,
      EditUid: "1",
      BoardDT: newColumns.map((col) => ({
        Id: "1",
        BoardId: "1",
        ColName: col.name,
      })),
    };
  
    try {
      const response = await axios.post(
        "http://103.30.72.63/eCRM/api/Board/SaveBoard",
        data
      );
      const successMessage = type === "edit" ? "Board Updated successfully" : "Board created successfully";
      toast.success(successMessage);
    } catch (error) {
      console.error("Error saving board:", error);
      toast.error("An error occurred while saving the board");
    }
  };
  
  const handleOpen = () => setIsBoardModalOpen((prevState) => !prevState);

  return (
    <>
      {/* Dialog component */}
      <Dialog size="sm" open={true} handler={handleOpen}>
        {/* Dialog content */}
        <div className="p-4">
          <h3 className="text-lg font-poppinsBold">
            {type === "edit" ? "Edit" : "Add New"} Board
          </h3>
          <div className="mt-2">
            <label className="text-sm dark:text-white text-gray-500">
              Board Name
            </label>
            <Input
              className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-900 focus:outline-[#635fc7] outline-1 ring-0 w-full"
              placeholder="e.g Web Design"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="board-name-input"
            />
          </div>
          <div className="mt-4">
            <label className="text-sm dark:text-white text-gray-500">
              Board Columns
            </label>

            {newColumns.map((column, index) => (
              <div key={index} className="flex items-center w-full mt-2">
                <input
                  className="bg-transparent p-2 flex-grow rounded-lg text-sm border border-gray-900 focus:outline-[#635fc7] outline-[1px] w-full"
                  onChange={(e) => {
                    onChange(column.id, e.target.value);
                  }}
                  type="text"
                  value={column.name}
                />
                <img
                  src={crossIcon}
                  onClick={() => {
                    onDelete(column.id);
                  }}
                  className="m-4 cursor-pointer"
                />
              </div>
            ))}

            <button
              className="w-full items-center mt-4 py-2 text-sm hover:opacity-70 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] rounded-xl"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              + Add New Column
            </button>
          </div>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid === true) {
                onSaveNewBoard();
              }
            }}
            className="w-full mt-2 mb-4 py-2 text-sm hover:opacity-70 dark:text-white dark:bg-[#635fc7] relative text-white bg-[#635fc7] rounded-xl"
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default AddEditBoardModal;