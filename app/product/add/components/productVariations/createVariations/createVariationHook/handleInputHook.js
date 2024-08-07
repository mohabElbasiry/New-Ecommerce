import { useCallback } from "react";
import { handleError } from "./functions/setError";
import { UpdateAction } from "../../RootFunction/middleWare";
export const HandleInputChange = ({
  currentValues,
  createOptionsAndValues,
  SetCreateOptionsValues,
}) => {
  const handleAction = (action) => {
    UpdateAction(action, SetCreateOptionsValues);
  };
  const handleBlur = (e, idx, isAr) => {
    console.log("object");
    handleError(
      e.target.value,
      idx,
      isAr,
      SetCreateOptionsValues,
      createOptionsAndValues.currentValues,
      createOptionsAndValues?.error
    );
  };
  const handleValueChange = useCallback(
    (event, index, isAr = false) => {
      console.log("object");

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
    [currentValues]
  );
  const handleKeyDown = useCallback(
    (event, index, item, isAr) => {
      // const { value, name, keyCode } = event;
      console.log(event);
      // if (event.code === 8) {
      //   console.log("object");
      // }
      // const itemFounded = createOptionsAndValues?.currentValues?.find(
      //   (_, idx) => idx === index
      // );

      // if (
      //   keyCode === 8 &&
      //   event.target.value === "" &&
      //   itemFounded &&
      //   // itemFounded?.value_ar === "" &&
      //   itemFounded?.value_en === ""
      // ) {
      //   if (index === 0) {
      //     return;
      //   }

      //   if (
      //     createOptionsAndValues?.currentValues?.some(
      //       (item, idx) => idx === index
      //     )
      //   ) {

      //     console.log('object');
      //     if (event?.target?.value === "") {
      //       setTimeout(() => {
      //         handleAction({
      //           type: "FilterValueUsingIndex",
      //           payload: {
      //             index,
      //           },
      //         });
      //       }, 100);
      //     }
      //   }
      // }
    },
    [currentValues]
  );

  return { handleBlur, handleKeyDown, handleValueChange, handleAction };
};
