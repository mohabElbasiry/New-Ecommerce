import { InputWithLabelComponent } from "@/components/inputcomponent";
import { memo, useCallback } from "react";
import { UpdateAction } from "../../RootFunction/middleWare";

 const UpdateOptionsValue = ({ currentOptions, SetCreateOptionsValues,list}) => {
    console.log('object');
    const handleAction = (action) => UpdateAction(action, SetCreateOptionsValues);

    const {error,ErrorMessage,option_en}=currentOptions
  const handleOptionChange = useCallback(
    (e) => {
      const { value, name } = e.target;

      handleAction({
        type: "HandleUpdateOptions",
        payload: {
          list, 
          value,
          name,
        },
      });
    },

    [currentOptions]
  );
  return (
    <div className="grid grid-cols-1 gap-1  add-name-variant">
      <InputWithLabelComponent
        Input
        type="text"
        name={"option_en"}
        value={ option_en}
        onChange={handleOptionChange}
        placeholder="Enter option name"
        isRequired
        label="option"
        isError={error}
        message={ErrorMessage}
        PlaceHolder={`colors`}
      />
      {/* <InputWithLabelComponent
        Input
        type="text"
        value={currentOption?.option_ar}
        name={"option_ar"}
        onChange={handleOptionChange}
        placeholder="Enter option name"
        isRequired
        label="option in ar"
        PlaceHolder={`الالوان`}
      /> */}
    </div>
  );
};
export default memo(UpdateOptionsValue)