import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { KanbanItem } from './types';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Building2, AlertCircle , GripVertical } from 'lucide-react';

interface KanbanCardProps {
  item: KanbanItem;
  onOpenDetails: (item: KanbanItem) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ item, onOpenDetails }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" p-4 rounded-lg shadow-sm border border-primary space-y-3"
      onClick={(e) => {
        if (!isDragging) {
          e.preventDefault();
          e.stopPropagation();
          onOpenDetails(item);
        }
      }}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-move h-6 flex items-center justify-end -mt-2 -mx-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium ">{item.positionTitle}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Building2 className="w-4 h-4" />
            <span className="text-muted-foreground">{item.companyName}</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            priorityColors[item.priority]
          }`}
        >
          {item.priority}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm ">
        <MapPin className="w-4 h-4" />
        <span>{item.location}</span>
      </div>

      {item.applicationDeadline && (
        <div className="flex items-center gap-2 text-sm ">
          <Calendar className="w-4 h-4" />
          <span>Due: {new Date(item.applicationDeadline).toLocaleDateString()}</span>
        </div>
      )}

      {item.tasks.length > 0 && (
        <div className="flex items-center gap-2 text-sm ">
          <AlertCircle className="w-4 h-4" />
          <span>{item.tasks.length} pending tasks</span>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetails(item);
        }}
      >
        View Details
      </Button>
    </div>
  );
};

export default KanbanCard;