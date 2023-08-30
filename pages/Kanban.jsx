"use client";
import React, { useState } from "react";
import KanbanHeader from "@/components/KanbanHeader";
import KanbanHome from "@/components/KanbanHome";
import boardsSlice from "@/redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import EmptyBoard from "@/components/EmptyBoard";
import Header from "@/components/Header";
import DashboardNavbar from "@/components/DashNav";
import { useMediaQuery } from "react-responsive";

const Kanban = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [selectedBoardData, setSelectedBoardData] = useState(null);

  return (
    <div className="min-h-screen">
      <div className="p-4">{isTablet ? <Header /> : <DashboardNavbar />}</div>
      <div className="pl-4 pr-4">
        {boards.length > 0 ? (
          <>
            <KanbanHeader
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
            <KanbanHome
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
          </>
        ) : (
          <EmptyBoard type="add" />
        )}
      </div>
    </div>
  );
};

export default Kanban;
