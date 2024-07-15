import { TooltipF } from "@/components/ToolTipCostom";
import { AccordionTrigger, ChevronDown } from "@/components/ui/accordion";
import { memo, useState } from "react";
import {   updatePropertyParent } from "../functions/updatePropertyBasedOnParent";

const VarientKey = ({
  varientsNumbers = 0,
  key = "",
  minPrice = 0,
  maxPrice = 0,
  TotalQuantity = 0,
  setData,
  itemIndex = -1,
}) => {
  const [value, setValue] = useState({
    default: +maxPrice,
    AfterValue: "",
  });

  console.log('rerender');

  return (
    <AccordionTrigger
      className="flex 
      items-center w-full justify-between
      border-[#ddd] border-b"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
      <div>
        <p> {key}</p>
        <p className="pl-5">
          {varientsNumbers}
          varients
        </p>
      </div>
      <div className="flex gap-1 items-center">
        <input
          type="number"
          defaultValue={TotalQuantity}
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
                      Data: updatePropertyParent(prev?.Data, itemIndex, e.target.value),
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
export default  memo(VarientKey)
