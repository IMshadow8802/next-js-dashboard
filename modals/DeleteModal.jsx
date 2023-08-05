import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import boardsSlice from "@/redux/boardSlice";
import { Dialog, Input, Textarea } from "@material-tailwind/react";

const DeleteModal = ({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
}) => {
  const handleOpen = () => setIsDeleteModalOpen((prevState) => !prevState);

  return (
    <>
      {/* Dialog component */}
      <Dialog size="sm" open={true} handler={handleOpen}>
        {/* Dialog content */}
        <div className="p-4">
          <h3 className=" font-poppinsBold text-red-500 text-xl  ">
            Delete this {type}?
          </h3>
          {type === "task" ? (
            <p className="text-gray-500 text-sm mt-4 mb-4">
              Are you sure you want to delete the "{title}" task and its
              subtasks? This action cannot be reversed.
            </p>
          ) : (
            <p className="text-gray-500 text-sm mt-4 mb-4">
              Are you sure you want to delete the "{title}" board? This action
              will remove all columns and tasks and cannot be reversed.
            </p>
          )}

          <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
            <button
              onClick={onDeleteBtnClick}
              className="w-full items-center text-white hover:opacity-75 bg-red-500 p-2 rounded-2xl"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
              }}
              className="w-full items-center text-[#635fc7] dark:bg-white hover:opacity-75 bg-[#635fc71a]  p-2 rounded-2xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteModal;
