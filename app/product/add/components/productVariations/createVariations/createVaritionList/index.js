import { useCallback } from "react";
import UpdateOptionsValue from "./variationOption";
import VariationValues from "./variationsValues";
import { CreateAndDeleteVariations } from "../submitVariartion";

export const CreateVariationList = ({
  createOptionsAndValues,
  handleValueChange,
  GeneralErrorMessage,
  handleKeyDown,
  list,
  listIndex,
  SetCreateOptionsValues,
  handleListAction,
}) => {
  return (
    <div>
      <div className="w-[100%] p-3">
        <UpdateOptionsValue
          currentOptions={createOptionsAndValues.currentOptions}
          SetCreateOptionsValues={SetCreateOptionsValues}
          list={list}
        />
        <p className="my-3">Option values</p>
        <VariationValues
          currentValues={createOptionsAndValues.currentValues}
          error={createOptionsAndValues.error}
          handleKeyDown={handleKeyDown}
          handleValueChange={handleValueChange}
          SetCreateOptionsValues={SetCreateOptionsValues}
        />
      </div>
      <p className="p-2 text-sm capitalize text-red-500">
        {GeneralErrorMessage?.isError ? GeneralErrorMessage?.ErrorMessage : ""}
      </p>

      <CreateAndDeleteVariations
        SetCreateOptionsValues={SetCreateOptionsValues}
        currentOptions={createOptionsAndValues.currentOptions}
        currentValues={createOptionsAndValues.currentValues}
        handleListAction={handleListAction}
        list={list}
        listIndex={listIndex}
      />
    </div>
  );
};
