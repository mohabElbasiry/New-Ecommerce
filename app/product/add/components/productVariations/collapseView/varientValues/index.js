import { AccordionContent } from "@/components/ui/accordion";

import { memo, useCallback, useMemo } from "react";
import  DeletedVarient  from "./DeletedVarient";
import { VarientContent } from "./varientContent";
const VarientValues = ({
  itemValue = {},
  idx = -1,
  setData = () => {},
  parentIndex = -1,
  setChecked = () => {},
  checkedArray = [],
  parentname,
  setVarients = () => {},
  setEditValue,
  parentitemIndex
}) => {
  //deleted items
 

  if (itemValue?.deleted) {
    return (
      <DeletedVarient
        valueItem={itemValue}
        setVarients={setVarients}
        idx={itemValue?.itemIndex}
        parentname={parentname}
      />
    );
  }
  if (itemValue?.values?.length === 1) {
    return (
      <VarientContent
        setVarients={setVarients}
        checkedArray={checkedArray}
        parentname={parentname}
        setChecked={setChecked}
        idx={idx}
        itemValue={itemValue}
        parentIndex={parentIndex}
        setEditValue={setEditValue}
        parentitemIndex={parentitemIndex}
      />
    );
  } else {
    return (
      <AccordionContent key={itemValue?.itemIndex}>
        <VarientContent
          setVarients={setVarients}
          checkedArray={checkedArray}
          parentname={parentname}
          setChecked={setChecked}
          idx={idx}
          itemValue={itemValue}
          parentIndex={parentIndex}
          setEditValue={setEditValue}
          parentitemIndex={parentitemIndex}
        />
      </AccordionContent>
    );
  }
};
export default VarientValues;
