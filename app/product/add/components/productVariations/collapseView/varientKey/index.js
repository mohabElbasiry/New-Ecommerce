import { TooltipF } from "@/components/ToolTipCostom";
import { AccordionTrigger, ChevronDown } from "@/components/ui/accordion";
import { memo, useCallback, useMemo, useState } from "react";
import { updatePropertyParent } from "../functions/updatePropertyBasedOnParent";
import { debounce, isEqual, property } from "lodash";
import { produce } from "immer";
import { UpdateAction } from "../../RootFunction/middleWare";
import { DebounceHook } from "../../../hooks/DebounceHook";
import { InputWithLabelComponent } from "@/components/inputcomponent";

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
  item,
  setVarients = () => {},
}) => {
  const handleAction = (action) => {
    UpdateAction(action, setVarients);
  };

  const { useDebounceForUpdate } = DebounceHook({ handleAction });

  const SelectedItems = useMemo(() => {
    return selectedArray?.map((_, idx) => idx);
  }, [selectedArray]);
  const memoizedCheckedArray = useMemo(() => checkedArray, [checkedArray]);
  const checked = useCallback(
    (name) => {
      const checkedElements = new Map();
      if (checkedArray?.length) {
        checkedArray?.forEach((item) => {
          checkedElements.set(item?.key, item);
        });
        const checked = checkedElements.get(name);
        if (checked) {
          return true;
        }
        return false;
      }
      return false;
    },
    [memoizedCheckedArray]
  );
  if (item?.valuesL >= 2) {
    return (
      <AccordionTrigger
        className="flex 
        items-center w-full justify-between  border-[#ddd] border-b text-sm"
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name={name}
            checked={checked(name)}
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
            <div className=" ">
               <InputWithLabelComponent
               Input
                onClick={(e) => {
                  e.stopPropagation();
                }}
                price
                defaultValue={maxPrice}
                type="text" 
                inputCss={'text-center w-[140px]'}
               
                onChange={debounce((e) => {
                  if (!isNaN(e?.target?.value)) {
                    handleAction({
                      type: "updatePropertyParent",
                      payload: {
                        itemIndex,
                        newValue: e.target.value,
                        property: "price",
                      },
                    });
                  }
                  return;
                })}
              />
            </div>
          </TooltipF>
           <TooltipF text={"Change Varients"}>
            <InputWithLabelComponent
            Input
              type="number"
              value={TotalQuantity}
              onClick={(e) => {
                e.stopPropagation();
              }}
              inputCss="!w-[140px] text-center !bg-[#eee] !border-none"
              onChange={(e) => {
                if (!isNaN(e?.target?.value)) {
                  handleAction({
                    type: "updatePropertyParent",
                    payload: {
                      itemIndex,
                      newValue: e.target.value,
                      property: "price",
                    },
                  });

                  useDebounceForUpdate(e.target.value);
                }
                return;
              }}
              disabled={item?.valuesL > 1}
           
            />
          </TooltipF>
        </div>
      </AccordionTrigger>
    );
  }
};
export default memo(VarientKey);
