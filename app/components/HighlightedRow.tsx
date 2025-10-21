import type { HighlightedRowProps, Timezone, ClockMode } from '../lib/types';
import { ClockDisplay } from './ClockDisplay';
import { CloseButton } from './ui';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';

// Drop zone component
function DropZone({ 
  isVisible, 
  position 
}: { 
  isVisible: boolean; 
  position: 'before' | 'after'; 
}) {
  if (!isVisible) return null;
  
  return (
    <div className={`h-full w-8 bg-green-400/50 border-2 border-dashed border-green-400 rounded flex items-center justify-center ${
      position === 'before' ? 'mr-2' : 'ml-2'
    }`}>
      <div className="text-green-400 text-xs font-medium transform -rotate-90 whitespace-nowrap">
        Drop here
      </div>
    </div>
  );
}

// Sortable item component
function SortableTimezoneItem({ 
  timezone, 
  index, 
  onRemoveHighlight, 
  clockMode,
  isBeingDragged
}: { 
  timezone: Timezone; 
  index: number; 
  onRemoveHighlight: (timezoneId: string) => void; 
  clockMode: ClockMode;
  isBeingDragged?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: timezone.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={{ 
        ...style,
        animationDelay: `${index * 100}ms` 
      }}
      className={`relative group animate-fade-in h-full w-64 flex-shrink-0 ${
        isBeingDragged 
          ? 'opacity-30 scale-95' 
          : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing h-full"
      >
        <ClockDisplay
          timezone={timezone}
          isHighlighted={true}
          clockMode={clockMode}
        />
      </div>
      {/* Close button */}
      <CloseButton
        onClick={(e) => {
          e?.stopPropagation();
          onRemoveHighlight(timezone.id);
        }}
        aria-label={`Remove ${timezone.city} from highlights`}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
    </div>
  );
}

export function HighlightedRow({ highlightedTimezones, onRemoveHighlight, onReorderTimezones, clockMode }: HighlightedRowProps) {
  // Ensure consistent rendering between server and client
  const hasTimezones = highlightedTimezones && highlightedTimezones.length > 0;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [hoverStartTime, setHoverStartTime] = useState<number | null>(null);
  const [showDropIndicator, setShowDropIndicator] = useState(false);
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle hover timing for drop indicator
  useEffect(() => {
    if (overId && hoverStartTime) {
      const timer = setTimeout(() => {
        if (Date.now() - hoverStartTime >= 500) {
          setShowDropIndicator(true);
        }
      }, 500 - (Date.now() - hoverStartTime));

      return () => clearTimeout(timer);
    }
  }, [overId, hoverStartTime]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over, active } = event;
    
    if (over && over.id !== activeId) {
      if (overId !== over.id) {
        setOverId(over.id as string);
        setHoverStartTime(Date.now());
        setShowDropIndicator(false);
        
        // Determine drop position based on mouse position
        const activeIndex = highlightedTimezones.findIndex(item => item.id === active.id);
        const overIndex = highlightedTimezones.findIndex(item => item.id === over.id);
        setDropPosition(activeIndex < overIndex ? 'after' : 'before');
      }
    } else {
      setOverId(null);
      setHoverStartTime(null);
      setShowDropIndicator(false);
      setDropPosition(null);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = highlightedTimezones.findIndex((item) => item.id === active.id);
      const overIndex = highlightedTimezones.findIndex((item) => item.id === over?.id);
      
      // Calculate new index based on drop position
      const newIndex = dropPosition === 'after' ? overIndex + 1 : overIndex;
      const reorderedTimezones = arrayMove(highlightedTimezones, oldIndex, newIndex);
      onReorderTimezones(reorderedTimezones);
    }
    
    setActiveId(null);
    setOverId(null);
    setHoverStartTime(null);
    setShowDropIndicator(false);
    setDropPosition(null);
  }
  
  if (!hasTimezones) {
    return (
      <div className="terminal-panel p-2 min-h-20 flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 border border-dashed border-green-600/50 rounded-full flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-green-600/50 rounded-full"></div>
        </div>
        <div className="text-green-500 text-xs font-medium mb-1">
          No Priority Timezones
        </div>
        <div className="text-green-600/70 text-xs">
          Click timezones below to add them
        </div>
      </div>
    );
  }
  
  const activeTimezone = highlightedTimezones.find(tz => tz.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={highlightedTimezones.map(tz => tz.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-row gap-2 h-full overflow-x-auto justify-evenly">
          {highlightedTimezones.map((timezone, index) => (
            <div key={`container-${timezone.id}`} className="flex flex-row items-center">
              {/* Drop zone before item */}
              <DropZone 
                isVisible={showDropIndicator && overId === timezone.id && dropPosition === 'before'} 
                position="before" 
              />
              
              <SortableTimezoneItem
                timezone={timezone}
                index={index}
                onRemoveHighlight={onRemoveHighlight}
                clockMode={clockMode}
                isBeingDragged={activeId === timezone.id}
              />
              
              {/* Drop zone after item */}
              <DropZone 
                isVisible={showDropIndicator && overId === timezone.id && dropPosition === 'after'} 
                position="after" 
              />
            </div>
          ))}
        </div>
      </SortableContext>
      
      <DragOverlay>
        {activeTimezone ? (
          <div className="opacity-90 transform rotate-3 scale-105">
            <ClockDisplay
              timezone={activeTimezone}
              isHighlighted={true}
              clockMode={clockMode}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}