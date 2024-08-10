import { Reorder } from "framer-motion";
import { produce } from "immer";
import { VariationItem } from "./variationItem";
import { shapeData } from "../../collapseView/functions/datashape";
import { generateQualities } from "../../collapseView/functions/GenerateQualities";
import { UpdateAction } from "../../RootFunction/middleWare";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./variationItem/sortable";
export const VariationList = ({ productVarients, setVarients }) => {
  const handleAction = (action) => {
    UpdateAction(action, setVarients);
  };
  const handleReorder = (newVariants) => {
    handleAction({
      type: "handleReorder",
      payload: newVariants,
    });
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setVarients((prevItems) =>
        produce(prevItems, (draft) => {
          const oldIndex = prevItems.productvaritions.variants.findIndex(
            (variant) => variant.key_en === active.id
          );
          const newIndex = prevItems.productvaritions.variants.findIndex(
            (variant) => variant.key_en === over.id
          );

          draft.productvaritions.variants = arrayMove(
            prevItems.productvaritions.variants,
            oldIndex,
            newIndex
          );
        })
      );
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={productVarients.variants.map((variant) => variant.key_en)}
        strategy={verticalListSortingStrategy}
      >
        {productVarients?.variants?.map((item, idx) => {
          return (
            <SortableItem key={item.key_en} id={item.key_en} edit={item?.edit}>
              <VariationItem
                key={item?.key_en}
                productVarients={productVarients}
                setVarients={setVarients}
                item={item}
                idx={idx}
              />
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};
