import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import { initialBoardData } from './data';
import { BoardData, KanbanItem } from './types';
import JobDetailsDialog from './JobDetailsDialog';

const KanbanBoard: React.FC = () => {
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);
  const [selectedJob, setSelectedJob] = useState<KanbanItem | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumn = boardData.columns.find((col) =>
      col.items.some((item) => item.id === active.id)
    );
    const destinationColumn = boardData.columns.find(
      (col) => col.id === over.id
    );

    if (!sourceColumn || !destinationColumn || sourceColumn.id === destinationColumn.id) {
      return;
    }

    const sourceItems = sourceColumn.items.filter((item) => item.id !== active.id);
    const movedItem = sourceColumn.items.find((item) => item.id === active.id)!;
    const destinationItems = [...destinationColumn.items, movedItem];

    setBoardData({
      columns: boardData.columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, items: sourceItems };
        }
        if (col.id === destinationColumn.id) {
          return { ...col, items: destinationItems };
        }
        return col;
      }),
    });
  };

  const handleOpenDetails = (item: KanbanItem) => {
    setSelectedJob(item);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 p-6 overflow-x-auto min-h-screen">
          {boardData.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>
      </DndContext>

      <JobDetailsDialog
        job={selectedJob}
        open={selectedJob !== null}
        onClose={handleCloseDetails}
      />
    </>
  );
};

export default KanbanBoard;