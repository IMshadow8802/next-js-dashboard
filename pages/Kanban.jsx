"use client";
import React, { useState } from "react";
import KanbanHeader from "@/components/KanbanHeader";
import boardsSlice from "@/redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";

const Kanban = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <div className="min-h-screen">
      <div className="px-4 pt-4">
        <KanbanHeader
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
        />
      </div>
    </div>
  );
};

export default Kanban;
