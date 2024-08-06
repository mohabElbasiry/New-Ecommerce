import { TooltipF } from "@/components/ToolTipCostom";
import { UpdateQualityImages } from "../../variationTables/Update/updateImages";
import {
  createIndexMap,
  updatePropertyChild,
} from "../functions/updatePropertyBasedOnChild";
import { useCallback, useEffect } from "react";
import { produce } from "immer";
import { debounce, property } from "lodash";
import { UpdateAction } from "../../RootFunction/middleWare";

export const VarientContent = ({
  setVarients,
  setChecked,
  checkedArray,
  parentname,
  idx,
  itemValue,
  parentIndex,
  setEditValue,
}) => {
  const handleAction = (action) => {
    UpdateAction(action, setVarients);
  };

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
          const updatedArray = prev.reduce(
            (acc, item) => {
              if (item.key === parentname) {
                item.SelectedItems.push(idx); // Mutate the array directly
                acc.found = true;
              }
              acc.result.push(item);
              return acc;
            },
            { result: [], found: false }
          );

          if (!updatedArray.found) {
            updatedArray.result.push({ key: parentname, SelectedItems: [idx] });
          }

          return updatedArray.result;
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
    <div
      className={`flex items-center justify-between pl-3 py-3 
border-[#ddd]  mt-1 ${
        checked ? "bg-[#eeeeee9d]" : "bg-[white]"
      } rounded-xl cursor-pointer `}
      onClick={() =>
        setEditValue(
          produce((draft) => {
            draft.open = true;
            draft.value = itemValue;
          })
        )
      }
    >
      <div className="flex items-center gap-3  ">
        <input
          onClick={(e) => e.stopPropagation()}
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
        {console.log(itemValue, "sdaaaaaaaaaaa")}
        <TooltipF text={`Change price`}>
          <div className="border flex items-center text-sm pl-1 rounded-xl">
            <p>EGP</p>
            <input
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={itemValue?.price}
              name={itemValue?.itemIndex}
              type="text"
              className="text-black max-w-[180px]  h-[38px] rounded-xl p-3   ml-1  outline-[#ddd]"
              onChange={(e) => {
                if (!isNaN(e?.target?.value)) {
                  handleAction({
                    type: "updatePropertyChild",
                    payload: {
                      property: "price",
                      newValue: e.target.value,
                      itemIndex: itemValue.itemIndex,
                      parentname,
                    },
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
              name={itemValue?.itemIndex}
              type="text"
              className="text-black max-w-[180px]  h-[38px] rounded-xl p-3   ml-1  outline-[#ddd]"
              onChange={(e) => {
                if (!isNaN(e?.target?.value)) {
                  handleAction({
                    type: "updatePropertyChild",
                    payload: {
                      property: "quantity",
                      newValue: e.target.value,
                      itemIndex: itemValue.itemIndex,
                      parentname,
                    },
                  });
                }
                return;
              }}
            />
          </div>
        </TooltipF>
      </div>
    </div>
  );
};
