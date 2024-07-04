import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";
import { MultibleFields } from "./multibleFields";

export const UpdateFeildActionFunction = ({
  item = false,
  checkedElements,
  setAutoGenerate,
  property,
  setBeforeFiltered,
  value,
  idx,
  itemValue
}) => {
  const FIlterOutF = (prev, value) => {
    return prev?.map((item, itemdx) => {
      if (item?.itemIndex === itemValue?.itemIndex) {
        return {
          ...item,
          [property]: value,
        };
      } else {
        return item;
      }
    });
  };

  const handleChangeItem = (value) => {
    setAutoGenerate((prev) => {
      const UpdatedPrice = FIlterOutF(prev, value);
       return UpdatedPrice;
    });
    setBeforeFiltered((prev) => {
      const UpdatedPrice = FIlterOutF(prev, value);
      return UpdatedPrice;
    });
  };

  if (item) {
    return (
      <InputWithLabelComponent
        Input
        inputCss="w-fit   text-sm !px-1 shadow 
    p-2 text-center  border border-black   flex justify-center !p-0 
     shadow bg-white max-w-[100px] !p-3 h-[30px] min-w-[100px] mx-2"
        inputType="number"
        value={value}
        onChange={(e) => {
          handleChangeItem(e?.target.value, idx);
        }}
      />
    );
  } else {
    return (
      <MultibleFields
        checkedElements={checkedElements}
        property={property}
        setAutoGenerate={setAutoGenerate}
        setBeforeFiltered={setBeforeFiltered}
      />
    );
  }
};
