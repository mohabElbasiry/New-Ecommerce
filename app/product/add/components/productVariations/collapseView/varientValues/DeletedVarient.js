import { AccordionContent } from "@/components/ui/accordion";
import { produce } from "immer";
import { memo } from "react";

 const DeletedVarient = ({ valueItem, setVarients, parentname, idx }) => {
  console.log('rerender')

  const Undo = () => {
    setVarients(
      produce((draft) => {
        draft.productvaritions.varitionsValues.forEach((item) => {
          if (item?.key === parentname) {
            item.values.forEach((itemv) => {
              if (itemv.itemIndex === idx) {
                itemv.deleted = false; // Directly mutate the item
              }
            });
          }
        });

        // Build the activeVariantsMap in a single iteration
        const activeVariantsMap = new Map();

        draft.productvaritions.varitionsValues.forEach((item) => {
          item.values.forEach((variant) => {
            if (!variant.deleted) {
              variant.values.forEach((v) => {
                if (!activeVariantsMap.has(v.key_en)) {
                  activeVariantsMap.set(v.key_en, new Set());
                }
                activeVariantsMap.get(v.key_en).add(v.value_en);
              });
            }
          });
        });

         draft.productvaritions.variants.forEach((option) => {
          const activeValues =
            activeVariantsMap.get(option.key_en) || new Set();
          option.values = option.values.filter((value) =>
            activeValues.has(value.value_en)
          );
        });

        // Filter out empty options directly in the original array
        draft.productvaritions.variants =
          draft.productvaritions.variants.filter(
            (option) => option.values.length > 0
          );

        // Apply the same updates to the REfvariants
        draft.productvaritions.REfvariants = draft.productvaritions.variants;
        const { history, ...others } = draft;
        draft.history.push(others);
      })
    );
  };
  return (
    <div
      className={`flex items-center justify-around gap-11 pl-3 py-5 
        border-[#ddd]  mt-1 w-[100%] m-auto px-[100px]    bg-[#eee]`}
    >
      <input type="checkbox" disabled />

      <p className="line-through">{valueItem?.val}</p>

      <div className="flex gap-3">
        <p>This variant will be deleted</p>

        <button onClick={Undo} type="button" className="text-blue-400">
          undo
        </button>
      </div>
    </div>
  );
};
export default memo(DeletedVarient)