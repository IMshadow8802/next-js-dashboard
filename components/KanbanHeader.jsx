import React, { useState,useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import KHeaderDropDown from "./KHeaderDropdown";
import boardsSlice from "@/redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import AddEditBoardModal from "@/modals/AddEditBoardModal";
import AddEditTaskModal from "@/modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "@/modals/DeleteModal";
import useDataStore from "@/zustand/store";
import { fetchDataAndSet } from "@/zustand/Service";
import axios from "axios";

const KanbanHeader = ({ setIsBoardModalOpen, isBoardModalOpen }) => {
  const iconUp = "/img/icon-chevron-up.svg";
  const iconDown = "/img/icon-chevron-down.svg";
  const elipsis = "/img/icon-vertical-ellipsis.svg";
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");

  // Function to handle the open/close state of AddEditTaskModal
  const handleAddTaskModalOpen = () => {
    setIsTaskModalOpen((prevState) => !prevState);
  };

  const dropdownOpen = useDataStore((state) => state.dropdownOpen);
  const setOpenDropdownState = useDataStore((state) => state.setOpenDropdown);

  const onDropdownClick = () => {
    useDataStore.setState({ dropdownOpen: !dropdownOpen }); // Update Zustand state
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const boardData = useDataStore((state) => state.data);
  //console.log(boardData)

  useEffect(() => {
    fetchDataAndSet();
  }, []);

  const activeBoardId = useDataStore((state) => state.activeBoardId);

  function getActiveBoardName(boardData, activeBoardId) {
    const activeBoard = boardData.find((board) => board.BoardId === activeBoardId);
    return activeBoard ? activeBoard.Board : "No Active Board";
  }

  return (
    <div className="flex justify-between p-4 font-poppinsBold">
      {/* Left side */}
      <div className="bg-gray-100 flex items-center space-x-2 md:space-x-4">
        <img src="/img/logo-mobile.svg" alt="logo" className="h-6 w-6" />
        <h3 className="hidden md:inline-block">Kanban</h3>
        <div className="flex items-center">
          <h3 className="truncate max-w-[200px] md:text-xl text-xl md:ml-20 font-Poppins">
          {boardData.length > 0 ? getActiveBoardName(boardData, activeBoardId) : "Loading..."}
          </h3>
          <img
            src={dropdownOpen ? iconUp : iconDown}
            alt="dropdown icon"
            className="w-3 ml-2 cursor-pointer"
            onClick={onDropdownClick}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex space-x-4 items-center md:space-x-6">
        <Button
          color="blue"
          className="hidden md:block"
          onClick={handleAddTaskModalOpen}
        >
          + Add New Task
        </Button>
        <Button
          color="blue"
          onClick={handleAddTaskModalOpen}
          className="py-1 px-3 md:hidden"
        >
          +
        </Button>

        <img
          onClick={() => {
            setBoardType("edit");
            setOpenDropdownState(false);
            setIsElipsisMenuOpen((prevState) => !prevState);
          }}
          src={elipsis}
          alt="elipsis"
          className="cursor-pointer h-6"
        />
        {isElipsisMenuOpen && (
          <ElipsisMenu
            type="Boards"
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
      </div>

      {dropdownOpen && (
          <KHeaderDropDown
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {isTaskModalOpen && (
        <AddEditTaskModal
          isTaskModalOpen={isTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
};

export default KanbanHeader;
