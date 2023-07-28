"use client";
import React, { useState } from "react";
import KanbanHeader from "@/components/KanbanHeader";

const Kanban = () => {
  return (
    <div className="min-h-screen">
      <div className="px-4 pt-4">
        <KanbanHeader/>
      </div>
    </div>
  );
};

export default Kanban;
