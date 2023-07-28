import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import KHeaderDropDown from "./KHeaderDropdown";
import boardsSlice from "@/redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";

const KanbanHeader = () => {
  const iconUp = "/img/icon-chevron-up.svg"; // Replace this with your actual path
  const iconDown = "/img/icon-chevron-down.svg";
  const elipsis = "/img/icon-vertical-ellipsis.svg";
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const dispatch = useDispatch();
  
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
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

  return (
    <div className="flex justify-between p-4 font-poppinsBold mt-6">
      {/* Left side */}
      <div className="bg-gray-100 flex items-center space-x-2 md:space-x-4">
        <img src="/img/logo-mobile.svg" alt="logo" className="h-6 w-6" />
        <h3 className="hidden md:inline-block">Kanban</h3>
        <div className="flex items-center">
          <h3 className="truncate max-w-[200px] md:text-xl text-xl md:ml-20 font-Poppins">
            Board Name
          </h3>
          <img
            src={openDropdown ? iconUp : iconDown}
            alt="dropdown icon"
            className="w-3 ml-2 md:hidden"
            onClick={onDropdownClick}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex space-x-4 items-center md:space-x-6">
        <Button
          color="blue"
          className="hidden md:block"
          onClick={() => {
            setIsTaskModalOpen((prevState) => !prevState);
          }}
        >
          + Add New Task
        </Button>
        <Button
          color="blue"
          onClick={() => {
            setIsTaskModalOpen((prevState) => !prevState);
          }}
          className="py-1 px-3 md:hidden"
        >
          +
        </Button>

        <img
          onClick={() => {
            setBoardType("edit");
            setOpenDropdown(false);
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

      {openDropdown && (
          <KHeaderDropDown
            setOpenDropdown={setOpenDropdown}
            // setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
    </div>
  );
};

export default KanbanHeader;
