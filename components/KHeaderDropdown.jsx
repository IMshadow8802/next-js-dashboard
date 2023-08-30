import React, {useEffect } from "react";
import useDataStore from "@/zustand/store";
import { fetchDataAndSet } from "@/zustand/Service";

function KHeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const boardIcon = "/img/icon-board.svg";
  const darkIcon = "/img/icon-dark-theme.svg";
  const lightIcon = "/img/icon-light-theme.svg";

  const boardData = useDataStore((state) => state.data);
  //console.log(boardData)

  const setActiveBoard = useDataStore((state) => state.setActiveBoard);
  const activeBoardId = useDataStore((state) => state.activeBoardId)
  //console.log(activeBoardId);
  const setOpenDropdownState = useDataStore((state) => state.setOpenDropdown);

  useEffect(() => {
    fetchDataAndSet();
  }, []);

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown md:left-[320px] md:right-[400px] "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdownState(false);
      }}
    >
      {/* DropDown Modal */}
      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boardData?.length})
        </h3>

        <div>
          {(
            boardData.map((board, index) => (
              <div
                className={` flex items-baseline space-x-2 px-5 py-4  ${
                  board.BoardId === activeBoardId  &&
                  " bg-[#635fc7] rounded-r-full text-white mr-8 "
                } `}
                key={index}
                onClick={() => {
                  setActiveBoard(board.BoardId);
                  setOpenDropdownState(false);
                }}
              >
                <img src={boardIcon} className="  filter-white  h-4 " />{" "}
                <p className=" text-lg font-poppinsBold cursor-pointer">{board.Board}</p>
              </div>
            ))
          )}

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdownState(false);
            }}
            className=" flex items-baseline space-x-2  text-[#635fc7] px-5 py-4  "
          >
            <img src={boardIcon} className="   filter-white  h-4 " />
            <p className=" text-lg font-poppinsBold cursor-pointer">Create New Board </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KHeaderDropDown;
