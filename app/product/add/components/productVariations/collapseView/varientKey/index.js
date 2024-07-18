import { TooltipF } from "@/components/ToolTipCostom";
import { AccordionTrigger, ChevronDown } from "@/components/ui/accordion";
import { memo, useMemo, useState } from "react";
import { updatePropertyParent } from "../functions/updatePropertyBasedOnParent";
import { isEqual } from "lodash";

const VarientKey = ({
  varientsNumbers = 0,
  key = "",
  minPrice = 0,
  maxPrice = 0,
  TotalQuantity = 0,
  setData,
  itemIndex = -1,
  selectedArray = [],
  setChecked,
  checkedArray=[],
  name,
}) => {
  const SelectedItems = useMemo(() => {
    return selectedArray?.map((_, idx) => idx);
  }, [selectedArray]);
  return (
    <AccordionTrigger
      className="flex 
      items-center w-full justify-between
      border-[#ddd] border-b text-sm"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name={name}
          checked={
            checkedArray?.length
              ? checkedArray.find((item) => item?.key === name)
                ? true
                : false
              : false
          }
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const checked = e.target.checked;
            console.log(e.target.name);
            if (checked) {
              setChecked((prev = []) => {
                return [...prev, { key: e.target.name, SelectedItems }];
              });
            } else {
              setChecked((prev = []) => {
                const deletedItem = prev?.filter(
                  (item) => item?.key !== e.target.name
                );
                return deletedItem;
              });
            }
          }}
        />
      </div>
      <div>
        <p> {name}</p>
        <p className="pl-5">
          {varientsNumbers}
          varients
        </p>
      </div>
      <div className="flex gap-1 items-center">
        <input
          type="number"
          value={TotalQuantity}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <TooltipF text={`This Will Apply To All ${varientsNumbers} Varients`}>
          <div className="border flex items-center pl-1 rounded-xl">
            <p>EGP</p>
            <input
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={maxPrice}
              type="text"
              className="text-black max-w-[180px]  h-[38px] rounded-xl p-3   ml-1  outline-[#ddd]"
              onChange={(e) => {
                if (!isNaN(e?.target?.value)) {
                  setData((prev) => {
                    return {
                      ...prev,
                      Data: updatePropertyParent(
                        prev?.Data,
                        itemIndex,
                        e.target.value
                      ),
                    };
                  });
                }
                return;
              }}
            />
          </div>
        </TooltipF>
      </div>
    </AccordionTrigger>
  );
};
export default memo(VarientKey);
