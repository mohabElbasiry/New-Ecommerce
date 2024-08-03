import { AccordionContent } from "@/components/ui/accordion";
import { produce } from "immer";

export const DeletedVarient = ({ valueItem, setVarients, parentname, idx }) => {
  console.log("object");
  const Undo = () => {
    setVarients(
      produce((draft) => {
        const updatedValuesAfterDelete =
          draft.productvaritions.varitionsValues.map((item) => {
            if (item?.key === parentname) {
              const values = item?.values.map((itemv, index) => {
 
                if (idx === valueItem.itemIndex) {

                 
                   return( {
                    ...itemv,
                    deleted: false,
                  });
                }
                return itemv;
              });


               return { ...item, values };
            }
            return item;
          });

          console.log(updatedValuesAfterDelete,'updatedValuesAfterDeleteupdatedValuesAfterDelete');
        draft.productvaritions.varitionsValues = updatedValuesAfterDelete;
        const activeVariantsMap = new Map();
        updatedValuesAfterDelete.forEach((item) => {
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

        const updatedOptions = draft.productvaritions.variants
          .map((option) => {
            const activeValues =
              activeVariantsMap.get(option.key_en) || new Set();
            return {
              ...option,
              values: option.values.filter((value) =>
                activeValues.has(value.value_en)
              ),
            };
          })
          .filter((item) => item?.values.length);

        draft.productvaritions.variants = updatedOptions;
        draft.productvaritions.REfvariants = updatedOptions;
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
