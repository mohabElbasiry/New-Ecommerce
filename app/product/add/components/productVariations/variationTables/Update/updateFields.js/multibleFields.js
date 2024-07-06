import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";

export const MultibleFields = ({
  checkedElements,
  setAutoGenerate,
  property,
  setBeforeFiltered,
  ...props
}) => {
  const [Change, setChange] = useState(0);
    console.log(checkedElements,'checkedElementsadsssssss');
  const handleSubmitFeilds = () => {
    const MultibleSelect = (prev) =>
      prev?.map((itemv, index) => {
        const FOunded = checkedElements?.find((item, idx) => +item === index);
        console.log(FOunded, checkedElements, "checkedElementsFounded");
        if (FOunded !== undefined) {
          return {
            ...itemv,
            [property]: Change,
          };
        }
        return itemv;
      });

    setAutoGenerate((prev) => {
      return MultibleSelect(prev);
    });
    setBeforeFiltered((prev) => {
      const UpdatedPrice = MultibleSelect(prev);
      return UpdatedPrice;
    });
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <InputWithLabelComponent
        defaultValue={10}
        Input
        name={property}
        onChange={(e) => {
          setChange(e?.target.value);
        }}
        inputCss="w-fit text-sm !px-1 shadow 
   p-2 text-center  border border-black   flex justify-center !p-0 
   shadow bg-white max-w-[100px] !p-3 h-[30px]"
        inputType="number"
        {...props}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmitFeilds();
          props?.setOpen(false);
        }}
        type="button"
        className="text-white mt-auto mb-2 flex bg-[#333] 
        p-2 text-sm  rounded-md"
      >
        Change
      </button>
    </div>
  );
};
