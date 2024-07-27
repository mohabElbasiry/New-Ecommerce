import { TooltipF } from "@/components/ToolTipCostom";
import { AccordionTrigger, ChevronDown } from "@/components/ui/accordion";
import { memo, useMemo, useState } from "react";
import { updatePropertyParent } from "../functions/updatePropertyBasedOnParent";
import { isEqual } from "lodash";
import { produce } from "immer";

const VarientKey = ({
  varientsNumbers = 0,
  key = "",
  minPrice = 0,
  maxPrice = 0,
  TotalQuantity = 0,
   itemIndex = -1,
  selectedArray = [],
  setChecked,
  checkedArray = [],
  name,
  setVarients = () => {},
}) => {
  const SelectedItems = useMemo(() => {
    return selectedArray?.map((_, idx) => idx);
  }, [selectedArray]);
  return (
    <AccordionTrigger className="flex   items-center w-full justify-between  border-[#ddd] border-b text-sm">
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
        {varientsNumbers > 1 ? (
          <p className="pl-5"> {varientsNumbers} varients </p>
        ) : null}
      </div>
      <div className="flex gap-1 items-center">
        <TooltipF text={`This Will Apply To All ${varientsNumbers} Varients`}>
          <div className="border flex items-center pl-1 rounded-xl">
            <p>EGP</p>
            <input
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={maxPrice}
              type="text"
              className="text-black max-w-[180px] 
               h-[38px] rounded-xl p-3  
              ml-1 outline-[#ddd]"
              onChange={(e) => {
                if (!isNaN(e?.target?.value)) {
                  setVarients(
                    produce((draft) => {
                      draft.productvaritions.varitionsValues =
                        updatePropertyParent(
                          draft?.productvaritions.varitionsValues,
                          itemIndex,
                          e.target.value
                        );
                    })
                  );
                }
                return;
              }}
            />
          </div>
        </TooltipF>
        <TooltipF text={"Change Varients"}>
          <input
            type="number"
            value={TotalQuantity}
            onClick={(e) => {
              e.stopPropagation();
            }}
            disabled
            className="p-3 bg-[#eee] rounded-md py-2 text-center
           max-w-[150px] mr-6"
          />
        </TooltipF>
      </div>
    </AccordionTrigger>
  );
};
export default memo(VarientKey);
