import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy
  , rectSortingStrategy
  , rectSwappingStrategy
  , verticalListSortingStrategy, 

} from "@dnd-kit/sortable";
import { memo } from "react";

const DragAndDropElelements = ({ handleDragEnd, items, children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        {/* //Items in Map  */}

        {children}
      </SortableContext>
    </DndContext>
  );
};
export default memo(DragAndDropElelements);
