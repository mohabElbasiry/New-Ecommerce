import { AccordionContent } from "@/components/ui/accordion";
import { SelectedArrayCheckBox } from "../../variationTables/Update/selectedArray";
import { UpdateQualityImages } from "../../variationTables/Update/updateImages";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { UpdateFeildActionFunction } from "../../variationTables/Update/updateFields.js";
import { TooltipF } from "@/components/ToolTipCostom";
import { updatePropertyChild } from "../functions/updatePropertyBasedOnChild";
import { memo } from "react";
  const VarientValues = ({
  itemValue = {},
  idx = -1,
  setData = () => {},
  parentIndex,
}) => {
  console.log('rerender');
  return (
    <AccordionContent>
      <div className="flex items-center justify-between pl-10  border-[#ddd] border-b">
        <div className="flex items-center gap-3   ">
          <SelectedArrayCheckBox
            all={false}
            // setCheckedElements={setCheckedElements}
            idx={idx}
            // autoGenerate={autoGenerate}
            // checkedElements={checkedElements}
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
          <InputWithLabelComponent
            // label="compare To Price"
            PlaceHolder="Add product price"
            Input
            inputType="number"
            // register={{ ...register("price") }}
            price
            onClick={(e) => {
              e.stopPropagation();
            }}
            inputCss="max-w-[150px] h-[35px]"
          />

          <UpdateFeildActionFunction
            // checkedElements={checkedElements}
            item
            idx={idx}
            property={"price"}
            // setAutoGenerate={setAutoGenerate}
            // setBeforeFiltered={setBeforeFiltered}
            inputCss={"max-w-[100px]  h-[35px] text-left p-2 !bg-[#eee]"}
            disabled
            value={+itemValue?.price}
            itemValue={itemValue}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
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
                      const itemdsa = updatePropertyChild(
                        prev?.Data,
                        parentIndex,
                        itemValue?.itemIndex,
                        "price",
                        e.target.value
                      );
                       return {...prev,Data:itemdsa};
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
export default memo(VarientValues)