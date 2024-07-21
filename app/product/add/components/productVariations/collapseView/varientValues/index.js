import { AccordionContent } from "@/components/ui/accordion";
import { SelectedArrayCheckBox } from "../../variationTables/Update/selectedArray";
import { UpdateQualityImages } from "../../variationTables/Update/updateImages";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { UpdateFeildActionFunction } from "../../variationTables/Update/updateFields.js";
import { TooltipF } from "@/components/ToolTipCostom";
import {
  createIndexMap,
  updatePropertyChild,
} from "../functions/updatePropertyBasedOnChild";
import { memo, useCallback } from "react";
import { produce } from "immer";
const VarientValues = ({
  itemValue = {},
  idx = -1,
  setData = () => {},
  parentIndex = -1,
  setChecked = () => {},
  checkedArray = [],
  parentname,
  setVarients = () => {},
}) => {
  const checked = (() => {
    const checkedItem = checkedArray?.length
      ? checkedArray?.find((item) => item?.key === parentname)
      : null;
    if (checkedItem) {
      return checkedItem.SelectedItems?.some((item) => item === idx);
    } else {
      return false;
    }
  })();
  const HandleChange = useCallback(
    (e) => {
      const checked = e.target.checked;

      setChecked((prev = []) => {
        if (checked) {
          const founded = checkedArray?.length
            ? checkedArray?.find((item) => item.key === parentname)
            : false;

          if (!founded) {
            return [...prev, { key: parentname, SelectedItems: [idx] }];
          } else {
            // const prevSelected = [...prev?.SelectedItems]||[];
            const added = prev?.map((item) => {
              if (parentname === item?.key) {
                return {
                  ...item,
                  key: parentname,
                  SelectedItems: [...item?.SelectedItems, idx],
                };
              }

              return item;
            });
            return added;
          }
        } else {
          const itemkey = checkedArray.find((item) => item?.key === parentname);

          if (itemkey && !itemkey?.SelectedItems.length) {
            const FilterItemKeyPrev = prev?.filter(
              (item) => item?.key !== parentname
            );

            return FilterItemKeyPrev;
          } else {
            const FilterItemKeyPrev = prev?.map((item) => {
              if (item?.key === parentname) {
                if (item?.SelectedItems.length === 1) {
                  return [];
                }
                return {
                  ...item,
                  SelectedItems: item?.SelectedItems.filter((item, _idx) => {
                    return item !== idx;
                  }),
                };
              }
              return item;
            });

            return FilterItemKeyPrev;
          }
        }
      });
    },
    [idx]
  );
  return (
    <>
      {itemValue?.values?.length > 1 ? (
        <AccordionContent key={itemValue?.itemIndex}>
          <div
            className={`flex items-center justify-between pl-3 py-3 
        border-[#ddd]  mt-1 ${
          checked ? "bg-[#eeeeee9d]" : "bg-[white]"
        } rounded-xl `}
          >
            <div className="flex items-center gap-3  ">
              <input
                type="checkbox"
                checked={checked}
                onChange={HandleChange}
              />
              <UpdateQualityImages
                // setAutoGenerate={setAutoGenerate}
                // setBeforeFiltered={setBeforeFiltered}
                index={idx}
                item={itemValue}
              />
            </div>
            <div>
              <p> {itemValue?.val}</p>
            </div>
            <div className="flex gap-1 items-center  mx-2 ">
              <TooltipF text={`Change price`}>
                <div className="border flex items-center text-sm pl-1 rounded-xl">
                  <p>EGP</p>
                  <input
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    value={itemValue?.price}
                    type="text"
                    className="text-black max-w-[180px]  h-[38px] rounded-xl p-3   ml-1  outline-[#ddd]"
                    onChange={(e) => {
                      if (!isNaN(e?.target?.value)) {
                        setVarients(
                          produce((draft) => {
                            const indexMap = createIndexMap(
                              draft.productvaritions.varitionsValues
                            );
                            const updatedPrice = updatePropertyChild(
                              draft.productvaritions.varitionsValues,
                              parentIndex,
                              itemValue?.itemIndex,
                              "price",
                              e.target.value,
                              indexMap
                            );
                            draft.productvaritions.varitionsValues =
                              updatedPrice;
                          })
                        );
                      }
                      return;
                    }}
                  />
                </div>
              </TooltipF>

              <TooltipF text={`Change Quantity`}>
                <div className="border flex items-center pl-1 rounded-xl">
                  <input
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    value={itemValue?.quantity}
                    type="text"
                    className="text-black max-w-[180px]  h-[38px] rounded-xl p-3   ml-1  outline-[#ddd]"
                    onChange={(e) => {
                      if (!isNaN(e?.target?.value)) {
                        setVarients(
                          produce((draft) => {
                            const indexMap = createIndexMap(
                              draft.productvaritions.varitionsValues
                            );
                            const updatedPrice = updatePropertyChild(
                              draft.productvaritions.varitionsValues,
                              parentIndex,
                              itemValue?.itemIndex,
                              "quantity",
                              e.target.value,
                              indexMap
                            );
                            draft.productvaritions.varitionsValues =
                              updatedPrice;
                          })
                        );
                      }
                      return;
                    }}
                  />
                </div>
              </TooltipF>
            </div>
          </div>
        </AccordionContent>
      ) : null}
    </>
  );
};
export default memo(VarientValues);
