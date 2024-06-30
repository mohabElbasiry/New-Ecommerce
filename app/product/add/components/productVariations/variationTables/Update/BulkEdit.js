import { CustomDialoge } from "@/components/Modal";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";
import { UpdateFeildActionFunction } from "./updateFields.js";
 
export const BulkEdit = ({ checkedElements, setAutoGenerate,setBeforeFiltered }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  return (
    <>
      <CustomDialoge open={open} setOpen={setOpen}>
        {action === "Edit Prices" ? (
          <UpdateFeildActionFunction
            checkedElements={checkedElements}
            setAutoGenerate={setAutoGenerate}
            property={"price"}
            setBeforeFiltered={setBeforeFiltered}
          />
        ) : null}
        {action === "Edit Quantities" ? (
          <UpdateFeildActionFunction
            checkedElements={checkedElements}
            setAutoGenerate={setAutoGenerate}
            property={"quantity"}
            setBeforeFiltered={setBeforeFiltered}
          />
        ) : null}
      </CustomDialoge>
      <InputWithLabelComponent
        Input={false}
        inputCss="w-[20%] ml-auto !p-1 mx-2 shadow   "
        PlaceHolder="Update"
        selectArray={[
          "Edit Prices",
          "Edit/add images",
          "Remove Images",
          "Edit Quantities",
          //   "Edit barcodes",
          //    "Edit Sku",
          //   "continue Selling when out of stock",
        ]}
        defaultSelected="bulk edit"
        onChange={(e) => {
          setOpen(true);
          setAction(e.target.value);
        }}
      />
    </>
  );
};
