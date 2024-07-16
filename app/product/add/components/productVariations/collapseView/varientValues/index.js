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
import { memo } from "react";
const VarientValues = ({
  itemValue = {},
  idx = -1,
  setData = () => {},
  parentIndex = -1,
  setChecked = () => {},
  checkedArray = [],
  parentname,
}) => {
  return (
    <AccordionContent>
      <div className="flex items-center justify-between pl-10  border-[#ddd] border-b">
        <div className="flex items-center gap-3   ">
          <input
            type="checkbox"
            checked={(() => {
              const checkedItem = checkedArray?.length
                ? checkedArray?.find((item) => item?.key === parentname)
                : null;
              if (checkedItem) {
                return checkedItem.SelectedItems?.some((item) => item === idx);
              } else {
                return false;
              }
            })()}
            onChange={(e) => {
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
                        return item;
                      }

                      return item;
                    });
                    console.log(added, "adssssssssssssssssssss");
                    return added;
                  }
                } else {
                  const itemkey = checkedArray.find(
                    (item) => item?.key === parentname
                  );
                  console.log("object",itemkey);

                  if (itemkey && !itemkey?.SelectedItems.length) {

                    console.log("object");

                    const FilterItemKeyPrev = prev?.filter(
                      (item) => item?.key !== parentname
                    );

                    return FilterItemKeyPrev;
                  } else {
                    console.log("object");
                    const FilterItemKeyPrev = prev?.map((item) => {
                      if (item?.key === parentname) {
                        return {
                          ...item,
                          SelectedItems: item?.SelectedItems.filter(
                            (item) => item !== idx
                          ),
                        };
                      }
                      return item;
                    });

                    return FilterItemKeyPrev;
                  }
                }
              });
            }}
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
        <div className="flex gap-1 items-center">
          <TooltipF text={`Change price`}>
            <div className="border flex items-center pl-1 rounded-xl">
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
                    console.log;

                    setData((prev) => {
                      const indexMap = createIndexMap(prev.Data);
                      const itemdsa = updatePropertyChild(
                        prev?.Data,
                        parentIndex,
                        itemValue?.itemIndex,
                        "price",
                        e.target.value,
                        indexMap
                      );
                      return { ...prev, Data: itemdsa };
                    });
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
                    console.log;

                    setData((prev) => {
                      const indexMap = createIndexMap(prev.Data);
                      const itemdsa = updatePropertyChild(
                        prev?.Data,
                        parentIndex,
                        itemValue?.itemIndex,
                        "quantity",
                        e.target.value,
                        indexMap
                      );
                      return { ...prev, Data: itemdsa };
                    });
                  }
                  return;
                }}
              />
            </div>
          </TooltipF>
        </div>
      </div>
    </AccordionContent>
  );
};
export default memo(VarientValues);
