import React from "react";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import { KanbanColumn as KanbanColumnType, KanbanItem } from "./types";

interface KanbanColumnProps {
  column: KanbanColumnType;
  onOpenDetails: (item: KanbanItem) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onOpenDetails,
}) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="w-80 flex-shrink-0 bg-secondary rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold ">{column.name}</h2>
        <span className=" px-2 py-1 rounded-full text-sm">
          {column.items.length}
        </span>
      </div>
      <div ref={setNodeRef} className="space-y-3 min-h-[calc(100vh-12rem)]">
        {column.items.map((item) => (
          <KanbanCard key={item.id} item={item} onOpenDetails={onOpenDetails} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
