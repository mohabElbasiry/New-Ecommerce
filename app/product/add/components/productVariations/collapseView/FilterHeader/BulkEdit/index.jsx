import { CustomDialoge } from "@/components/Modal";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";
//  import { DefaultValues } from "./Functions/DefaultValue.js";
import { UpdateFeildActionFunction } from "../../../variationTables/Update/updateFields.js/index.js";
import { BatchEdit } from "../../../variationTables/Update/updateFields.js/BulkEdit/BatchEdit/index.js";

import { BulkEditButton } from "./BUlkeditButton/index.jsx";
import { Actions } from "./Action/index.js";

export const BulkEditView = ({
  checkedArray = [],
  variants = [],
  varitionsValues = [],
  setVarients = () => {},
}) => {

  return (
    <div className="flex gap-3">
         <BulkEditButton
        checkedArray={checkedArray}
        varitions={variants}
        varitionsValues={varitionsValues}
        setVariens={setVarients}
      />
    <Actions checkedArray={checkedArray} setVarients={setVarients}/>
   
    </div>
  );
};
