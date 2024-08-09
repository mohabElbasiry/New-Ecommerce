import { useState, useEffect, useCallback, useMemo } from "react";
import { uid } from "uid";
import { initialState } from "../../../constants/initialCreateValuedata";
import { UpdateAction } from "../RootFunction/middleWare";
import { HandleInputChange } from "./createVariationHook/handleInputHook";
import { HandleAddVarients } from "./functions/createvarientvalidition";
import { produce } from "immer";
import { CreateVariationList } from "./createVaritionList";

export default function CreateVariation({ listIndex, setList, list }) {
  const {
    handleKeyDown,
    handleValueChange,
    handleAction,
    createOptionsAndValues,
    SetCreateOptionsValues,
  } = HandleInputChange({ list ,listIndex });
  const handleListAction = (action) => {
    UpdateAction(action, setList);
  };
  
  return (
    <CreateVariationList
      SetCreateOptionsValues={SetCreateOptionsValues}
      createOptionsAndValues={createOptionsAndValues}
      error={createOptionsAndValues.error}
      handleListAction={handleListAction}
      handleValueChange={handleValueChange}
      GeneralErrorMessage={createOptionsAndValues.GeneralErrorMessage}
      list={list}
      handleKeyDown={handleKeyDown}
      listIndex={listIndex}
     />
  );
}
