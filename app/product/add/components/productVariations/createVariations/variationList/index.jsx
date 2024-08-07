import { Reorder } from "framer-motion";
import { produce } from "immer";
import { VariationItem } from "./variationItem";
import { shapeData } from "../../collapseView/functions/datashape";
import { generateQualities } from "../../collapseView/functions/GenerateQualities";
import { UpdateAction } from "../../RootFunction/middleWare";

export const VariationList = ({ productVarients, setVarients }) => {
  const handleAction = (action) => {
    UpdateAction(action, setVarients);
  };
  const handleReorder = (newVariants) => {
    handleAction({
      type:'handleReorder',
      payload:newVariants
    })
  };

  return (
    <Reorder.Group
      onDragEnd={(e) => e.stopPropagation()}
      axis="y"
      values={productVarients?.variants}
      onReorder={handleReorder}
      dragListenser={false}
    >
      {productVarients?.variants?.map((item, idx) => {
        return (
          <VariationItem
            key={item?.key_en}
            productVarients={productVarients}
            setVarients={setVarients}
            item={item}
            idx={idx}
          />
        );
      })}
    </Reorder.Group>
  );
};
