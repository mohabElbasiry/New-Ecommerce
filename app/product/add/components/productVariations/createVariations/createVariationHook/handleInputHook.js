import { useCallback, useMemo, useState } from "react";
import { handleError } from "./functions/setError";
import { UpdateAction } from "../../RootFunction/middleWare";
import { initialState } from "@/app/product/add/constants/initialCreateValuedata";
import { uid } from "uid";
export const HandleInputChange = ({ list, listIndex }) => {
  const [createOptionsAndValues, SetCreateOptionsValues] =
    useState(initialState);

  const handleAction = (action) => UpdateAction(action, SetCreateOptionsValues);

  useMemo(() => {
    if (
      createOptionsAndValues?.currentValues[
        createOptionsAndValues?.currentValues.length - 1
      ]?.value_en?.trim() !== ""
      // &&
    ) {
      handleAction({
        type: "handleAddValue",
        payload: {
          value_ar: "",
          value_en: "",
          color: "",
          id: uid(),
        },
      });
    }
  }, [createOptionsAndValues?.currentValues]);

  useMemo(() => {
    handleAction({
      type: "handleEditDefaultValues",
      payload: { list, listIndex },
    });
  }, [list]);
  const handleValueChange = useCallback(
    (event, index, isAr = false) => {
      const { value } = event.target;

       handleAction({
        type: "handleValueChange",
        payload: {
          value,
          index,
          isAr,
        },
      });

      // updateOptions(currentOption, newValues);
    },
    [createOptionsAndValues.currentValues]
  );
  const handleKeyDown = useCallback(
    (event, index, item, isAr) => {
      if (index === 0) {
        return;
      }

      if (event.keyCode === 8) {
        if (event?.target?.value === "") {
          setTimeout(() => {
            handleAction({
              type: "FilterValueUsingIndex",
              payload: {
                index,
              },
            });
          }, 100);
        }
      }
    },
    [createOptionsAndValues?.currentValues]
  );

  return {
    handleKeyDown,
    handleValueChange,
    handleAction,
    createOptionsAndValues,
    SetCreateOptionsValues,
  };
};
