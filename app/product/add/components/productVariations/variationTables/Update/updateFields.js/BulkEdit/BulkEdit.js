import { CustomDialoge } from "@/components/Modal";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";
import { UpdateFeildActionFunction } from "../index.js";
import { DefaultValues } from "./Functions/DefaultValue.js";
import { BatchEdit } from "./BatchEdit/index.js";

export const BulkEdit = ({
  checkedElements,
  setAutoGenerate,
  setBeforeFiltered,
  autoGenerate = [],
}) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
console.log(DefaultValues(
  "price",
  autoGenerate,
  checkedElements
),'asdddddddddddddddddd');
  return (
    <>
      <CustomDialoge open={open} setOpen={setOpen}>
        {action === "Edit Prices" ? (
          <UpdateFeildActionFunction
            checkedElements={checkedElements}
            setAutoGenerate={setAutoGenerate}
            property={"price"}
            setBeforeFiltered={setBeforeFiltered}
            setOpen={setOpen}
            defaultNumberValues={DefaultValues(
              "price",
              autoGenerate,
              checkedElements
            )}
          />
        ) : null}
        {action === "Edit Quantities" ? (
          <UpdateFeildActionFunction
            checkedElements={checkedElements}
            setAutoGenerate={setAutoGenerate}
            property={"quantity"}
            setBeforeFiltered={setBeforeFiltered}
            setOpen={setOpen}
            defaultNumberValues={DefaultValues(
              "quantity",
              autoGenerate,
              checkedElements
            )}
          />
        ) : null}
        {action === "" ? (
          <BatchEdit/>
        ) : null}
      </CustomDialoge>
      <InputWithLabelComponent
        Input={false}
        inputCss="!w-[20%] ml-auto !p-1 mx-2     "
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
