import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";

export const MultibleFields = ({
  checkedElements,
  setAutoGenerate,
  property,
  setBeforeFiltered,
}) => {
  const [Change, setChange] = useState(0);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitFeilds();
      }}
    >
      <InputWithLabelComponent
        defaultValue={0}
        Input
        name="Quantity"
        onChange={(e) => {
          setChange(e?.target.value);
        }}
        inputCss="w-fit text-sm !px-1 shadow 
   p-2 text-center  border border-black   flex justify-center !p-0 
   shadow bg-white max-w-[100px] !p-3 h-[30px]"
        inputType="number"
      />
      <button type="submit">Change</button>
    </form>
  );
};
