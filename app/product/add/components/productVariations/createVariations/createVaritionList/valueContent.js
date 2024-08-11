import { InputWithLabelComponent } from "@/components/inputcomponent";
import { ColorPicker } from "./colorPicker";
import { memo } from "react";

const ValueContent = ({
  handleValueChange,
  value,
  error,
  currentValues,
  index,
  handleKeyDown,
}) => {
  return (
    <div
      className="flex gap-3 relative items-center add-values-variant"
      key={value?.value_en}
    >
      <InputWithLabelComponent
        Input
        inputCss="!w-[520px] p-2"
        type="text"
        name="value_en"
        value={value?.value_en}
        onChange={(event) => handleValueChange(event, index, false)}
        PlaceHolder={`option values`}
        isRequired={index !== currentValues?.length - 1}
        // onKeyDown={(e) => {
        //   handleKeyDown(e, index, value, false);
        // }}
        isError={error?.find((item) => item?.index === index)?.en?.Message}
        message={error?.find((item) => item?.index === index)?.en?.Message}
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
      <ColorPicker index={index} />
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
  );
};
export default memo(ValueContent);
