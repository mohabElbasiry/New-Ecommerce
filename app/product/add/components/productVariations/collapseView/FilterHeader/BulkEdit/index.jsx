import { CustomDialoge } from "@/components/Modal";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";
//  import { DefaultValues } from "./Functions/DefaultValue.js";
 import { UpdateFeildActionFunction } from "../../../variationTables/Update/updateFields.js/index.js";
import { BatchEdit } from "../../../variationTables/Update/updateFields.js/BulkEdit/BatchEdit/index.js";

export const BulkEditView = ({
  checkedElements,
   }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
 
  return (
    <div className="">
      <CustomDialoge open={open} setOpen={setOpen}>
        {action === "Edit Prices" ? (
          <UpdateFeildActionFunction
            checkedElements={checkedElements}
            setAutoGenerate={setAutoGenerate}
            property={"price"}
            setBeforeFiltered={setBeforeFiltered}
            setOpen={setOpen}
            // defaultNumberValues={DefaultValues(
            //   "price",
            //   autoGenerate,
            //   checkedElements
            // )}
          />
        ) : null}
        {action === "Edit Quantities" ? (
          <UpdateFeildActionFunction
            checkedElements={checkedElements}
            setAutoGenerate={setAutoGenerate}
            property={"quantity"}
            setBeforeFiltered={setBeforeFiltered}
            setOpen={setOpen}
            // defaultNumberValues={DefaultValues(
            //   "quantity",
            //   autoGenerate,
            //   checkedElements
            // )}
          />
        ) : null}
        {action === "" ? (
          <BatchEdit/>
        ) : null}
      </CustomDialoge>
      <InputWithLabelComponent  w
        Input={false}
        inputCss="  ml-auto !p-1 mx-2     "
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
    </div>
  );
};
