import { InputWithLabelComponent } from "@/components/inputcomponent";
import { Reorder } from "framer-motion";
import { ColorPicker } from "./colorPicker";
import { ReorderIcon } from "../../../drageControl";
import { memo, useCallback } from "react";
import { UpdateAction } from "../../RootFunction/middleWare";

const VariationValues = ({
  handleKeyDown,
  currentValues,
  handleValueChange,
  error,
  SetCreateOptionsValues,
}) => {
  const handleAction = useCallback((action)=>UpdateAction(action, SetCreateOptionsValues),[])

  const HandleDelete = useCallback(
    (index) => {
      handleAction({
        type: "FilterValueUsingIndex",
        payload: {
          index,
        },
      });
    },
    [currentValues]
  );
   return (
    <div>
         {currentValues?.map((value, index) => (
        <div>
          
            <div className="flex gap-3 relative items-center add-values-variant">
              <InputWithLabelComponent
                Input
                inputCss="!w-[520px] p-2"
                type="text"
                name="value_en"
                key={index}
                value={value?.value_en}
                onChange={(event) => handleValueChange(event, index, false)}
                PlaceHolder={`option values`}
                isRequired={index !== currentValues?.length - 1}
                onKeyDown={(e) => {
                  console.log(e.keyCode, "cladsssssssssssss");

                  handleKeyDown(e, index, value, false);
                }}
                isError={
                  error?.find((item) => item?.index === index)?.en?.Message
                }
                message={
                  error?.find((item) => item?.index === index)?.en?.Message
                }
                Autocomplete="off"
              />
              {/* <InputWithLabelComponent
                Input
                type="text"
                name="value_ar"
                key={index}
                value={value?.value_ar}
                onChange={(event) => handleValueChange(event, index, true)}
                PlaceHolder={`value in Arabic`}
                isRequired={index !== currentValues?.length - 1}
                onKeyDown={(e) => handleKeyDown(e, index, value)}
                onBlur={(e) => handleBlur(e, index)}
                isError={
                  error?.find((item) => item?.index === index)?.ar?.Message
                }
                message={
                  error?.find((item) => item?.index === index)?.ar?.Message
                }
                Autocomplete="off"
              /> */}
              <ColorPicker index={index} color_value={value?.color} handleAction={handleAction} />
              {currentValues?.some((_, idx) => idx === index) &&
              index !== currentValues?.length - 1 ? (
                <button
                  type="button"
                  onClick={() => HandleDelete(index)}
                  className="w-[25px]   right-3 top-[30%]"
                >
                  <img src="/trash.svg" />
                </button>
              ) : null}
            </div>
       
        </div>
      ))}
    </div>
   );
};
export default memo(VariationValues);
