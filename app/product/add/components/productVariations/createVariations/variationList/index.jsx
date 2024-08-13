import { produce } from "immer";
import { VariationItem } from "./variationItem";
import { UpdateAction } from "../../RootFunction/middleWare";

import { arrayMove } from "@dnd-kit/sortable";
import DragAndDropElelements from "@/components/GlobalUi/DragAndDropElements";
import SortableItem from "./variationItem/sortable";
export const VariationList = ({ productVarients, setVarients }) => {
  const handleAction = (action) => {
    UpdateAction(action, setVarients);
  };

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
   const Dragable = productVarients?.variants?.filter((item) => item.edit===true).length
    ? true
    : false;

    console.log(productVarients?.variants?.filter((item) => item.edit===true));
  return (
    <DragAndDropElelements
      items={productVarients?.variants?.map((item) => item?.key_en)}
      handleDragEnd={handleDragEnd}
      className="flex items-center flex-col"
    >
      {productVarients?.variants?.map((item, idx) => {
        return (
          <SortableItem key={item?.key_en} id={item?.key_en} 
          disabled ={productVarients?.variants?.length===1}
          edit={item?.edit||Dragable} >
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
    </DragAndDropElelements>
  );
};
