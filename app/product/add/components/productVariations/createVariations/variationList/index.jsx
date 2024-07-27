import { Reorder } from "framer-motion";
import { produce } from "immer";
import { VariationItem } from "./variationItem";
import { shapeData } from "../../collapseView/functions/datashape";
import { generateQualities } from "../../collapseView/functions/GenerateQualities";

export const VariationList = ({ productVarients, setVarients }) => {
  const handleReorder = (newVariants) => {
    setVarients(
      produce((draft) => {
        draft.productvaritions.variants = newVariants;
        draft.productvaritions.varitionsValues = shapeData(
          generateQualities(
            draft.productvaritions.varitionsValues?.flatMap(
              (item) => item?.values
            ),
            newVariants || []
          ),
          newVariants || []
        );
      })
    );
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
