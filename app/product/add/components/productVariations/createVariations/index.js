import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SketchPicker } from "react-color";
import { handleError } from "./createVariationHook/functions/setError";
import { Reorder } from "framer-motion";
import { produce } from "immer";
import { generateQualities } from "../collapseView/functions/GenerateQualities";
import { shapeData } from "../collapseView/functions/datashape";
import { ReorderIcon } from "../../drageControl";
import { uid } from "uid";
import { initialState } from "../../../constants/initialCreateValuedata";
import { UpdateAction } from "../RootFunction/middleWare";
import { HandleInputChange } from "./createVariationHook/handleInputHook";

export default function CreateVariation({
  listIndex,
  setList,
  list,
  setChangeOnHistory,
}) {
  const [createOptionsAndValues, SetCreateOptionsValues] =
    useState(initialState);
  console.log(createOptionsAndValues, "createOptionsAndValues");

  const [currentValues, setCurrentValues] = useState([
    {
      // value_ar: "",
      value_en: "",
      color: "",
      id: uid(),
    },
  ]);
  const [currentOption, setCurrentOption] = useState({
    option_en: "",
    option_ar: "",
    error: false,
    ErrorMessage: "",
  });
  const { handleBlur, handleKeyDown, handleValueChange, handleAction } =
    HandleInputChange({
      createOptionsAndValues,
      currentValues,
      SetCreateOptionsValues,
      setCurrentValues,
    });
  const [color, opencolor] = useState({ index: -1, open: false });
  const [GeneralErrorMessage, setGeneralErrorMessage] = useState({
    isError: false,
    ErrorMessage: "",
    value: false,
  });
  const handleOptionChange = useCallback(
    (event) => {
      if (currentOption.option_en.trim() !== "") {
        setGeneralErrorMessage({});
      }
      setCurrentOption((prev) => {
        const isOneOfOthers = list
          ?.filter((option) => !option?.edit)
          .find((option) => {
            return option.key_en.trim() === event.target.value.trim();
          });
        return {
          ...prev,
          [event?.target.name]: event?.target.value,
          error: isOneOfOthers ? true : false,
          ErrorMessage: isOneOfOthers
            ? "Please Enter different option name"
            : "",
        };
      });
    },
    [list]
  );

  const HandleDelete = useCallback(
    (index) => {
      handleAction({
        type: "FilterValueUsingIndex",
        payload: {
          index,
        },
      });
      // setCurrentValues((prev) => {
      //   const DeletedItem = prev?.filter((item, idx) => idx !== index);
      //   return DeletedItem;
      // });
    },
    [JSON.stringify(currentValues)]
  );

  useEffect(() => {
    if (document && open) {
      const searchIcon = document.getElementById("action-component");

      const handleCloseOutside = (e) => {
        if (!searchIcon?.contains(e.target)) {
          opencolor((prev) => ({ ...prev, open: false }));
        }
      };
      const handlePress = (e) => {
        if (e.keyCode === 27) {
          opencolor((prev) => ({ ...prev, open: false }));
        }
      };
      document.addEventListener("keydown", handlePress);
      document.addEventListener("click", handleCloseOutside);
      return () => document.removeEventListener("click", handleCloseOutside);
    }
  }, [color]);
  useEffect(() => {
    if (
      createOptionsAndValues?.currentValues[
        createOptionsAndValues?.currentValues.length - 1
      ]?.value_en?.trim() !== ""
      // &&
      // currentValues[currentValues.length - 1]?.value_ar?.trim() !== ""
    ) {
      console.log("object");
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

  useEffect(() => {
    if (list?.length) {
      setCurrentOption((prev) => ({
        // option_ar: list[listIndex]?.key_ar,
        option_en: list[listIndex]?.key_en,
      }));
      setCurrentValues(list[listIndex]?.values);
    }
  }, [list]);
  return (
    <div>
      <div className="w-[100%] p-3">
        <div className="grid grid-cols-1 gap-1  add-name-variant">
          <InputWithLabelComponent
            Input
            type="text"
            name={"option_en"}
            value={currentOption?.option_en}
            onChange={handleOptionChange}
            placeholder="Enter option name"
            isRequired
            label="option"
            isError={currentOption?.error}
            message={currentOption?.ErrorMessage}
            PlaceHolder={`colors`}
          />
          {/* <InputWithLabelComponent
            Input
            type="text"
            value={currentOption?.option_ar}
            name={"option_ar"}
            onChange={handleOptionChange}
            placeholder="Enter option name"
            isRequired
            label="option in ar"
            PlaceHolder={`الالوان`}
          /> */}
        </div>
        <p className="my-3">Option values</p>
        <Reorder.Group values={currentValues} onReorder={setCurrentValues}>
          {createOptionsAndValues?.currentValues?.map((value, index) => (
            <div>
              <Reorder.Item
                value={value}
                key={value}
                dragListener={false}
                className="flex gap-2  w-[100%] flex-col "
              >
                <div className="flex gap-3 relative items-center add-values-variant">
                  <InputWithLabelComponent
                    Input
                    inputCss="!w-[520px] p-2"
                    type="text"
                    name="value_en"
                    key={index}
                    value={value?.value_en}
                    onChange={(event) => handleValueChange(event, index, false)}
                    PlaceHolder={`option values`}
                    isRequired={index !== currentValues?.length - 1}
                    onKeyDown={(e) => handleKeyDown(e, index, value, false)}
                    onBlur={(e) => handleBlur(e, index, false)}
                    isError={
                      createOptionsAndValues?.error?.find(
                        (item) => item?.index === index
                      )?.en?.Message
                    }
                    message={
                      createOptionsAndValues?.error?.find(
                        (item) => item?.index === index
                      )?.en?.Message
                    }
                    Autocomplete="off"
                  />
                  {/* <InputWithLabelComponent
                    Input
                    type="text"
                    name="value_ar"
                    key={index}
                    value={value?.value_ar}
                    onChange={(event) => handleValueChange(event, index, true)}
                    PlaceHolder={`value in Arabic`}
                    isRequired={index !== currentValues?.length - 1}
                    onKeyDown={(e) => handleKeyDown(e, index, value)}
                    onBlur={(e) => handleBlur(e, index)}
                    isError={
                      error?.find((item) => item?.index === index)?.ar?.Message
                    }
                    message={
                      error?.find((item) => item?.index === index)?.ar?.Message
                    }
                    Autocomplete="off"
                  /> */}
                  <div
                    className={`border w-[30px] h-[30px] my-auto rounded-full border-[#333]`}
                    onClick={() => {
                      if (index === color?.index && color?.open) {
                        opencolor({
                          ...color,
                          index: index,
                          open: false,
                        });
                      } else {
                        opencolor({
                          ...color,
                          index: index,
                          open: true,
                        });
                      }
                    }}
                  ></div>

                  <div className="absolute z-[10000] top-0 right-[0px]">
                    {color?.index === index && color?.open ? (
                      <SketchPicker />
                    ) : null}
                  </div>
                  {createOptionsAndValues?.currentValues?.some(
                    (_, idx) => idx === index
                  ) &&
                  index !==
                    createOptionsAndValues?.currentValues?.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => HandleDelete(index)}
                      className="w-[25px]   right-3 top-[30%]"
                    >
                      <img src="/trash.svg" />
                    </button>
                  ) : null}
                </div>
                <ReorderIcon />
              </Reorder.Item>
            </div>
          ))}
        </Reorder.Group>
      </div>
      <p className="p-2 text-sm capitalize text-red-500">
        {GeneralErrorMessage?.isError ? GeneralErrorMessage?.ErrorMessage : ""}
      </p>
      <div className={"flex justify-between p-3 border-t-2  border-b-2 "}>
        <button
          type="button"
          onClick={() => {
            setList(
              produce((draft) => {
                const updatedVarient =
                  draft?.productvaritions?.variants?.filter((_, idx) => {
                    return idx !== listIndex;
                  });
                draft.productvaritions.variants = updatedVarient;
                draft.productvaritions.REfvariants = updatedVarient;

                // draft.productvaritions.varitionsValues = generateQualities(
                //   Data?.flatMap((item) => item.values),
                //   draft?.productvaritions?.variants?.filter(
                //     (_, idx) => idx !== listIndex
                //   )
                // );
                const dataShape = generateQualities(
                  draft.productvaritions.varitionsValues?.flatMap(
                    (item) => item.values
                  ) || [],
                  updatedVarient || []
                );
                if (updatedVarient?.length === 0) {
                  draft.productvaritions.varitionsValues = [];
                  return;
                }
                draft.productvaritions.varitionsValues = shapeData(
                  dataShape,
                  updatedVarient || []
                );
                const { history, ...others } = draft;
                draft.history.push(others);
              })
            );
          }}
          className="bg-[#eee] shadow text-black text-xs   rounded-lg px-3 p-1"
        >
          Delete
        </button>
        <button
          type="button"
          className="bg-[#fefefed] shadow text-black text-xs border  done-variant
          border-[#33333370] rounded-lg px-3 p-1"
          onClick={(e) => {
            e.preventDefault();

            // const isOneOfOthers = list
            //   ?.filter((option) => !option?.edit)
            //   .find((option) => {
            //     return (
            //       option?.key_en?.trim() === currentOption?.option_en?.trim()
            //     );
            //   });

            // if (isOneOfOthers) {
            //   return;
            // }

            // if (currentOption.option_en.trim() === "") {
            //   setGeneralErrorMessage((prev) => ({
            //     ...prev,
            //     ErrorMessage: "please Fill This Form",
            //     isError: true,
            //     value: false,
            //   }));
            //   return;
            // }

            // if (
            //   currentValues?.length === 1 &&
            //   currentValues?.[0]?.value_ar?.trim() === "" &&
            //   currentValues?.[0]?.value_en?.trim() === ""
            // ) {
            //   setGeneralErrorMessage((prev) => ({
            //     ...prev,
            //     ErrorMessage: "please Fill This Form",
            //     isError: true,
            //     value: true,
            //   }));

            //   return;
            // }
            // if (
            //   currentValues?.length > 1 &&
            //   currentValues
            //     ?.filter((idx) => idx !== currentValues - 1)
            //     .every(
            //       (item) =>
            //         item?.value_ar?.trim() === "" &&
            //         item?.value_en?.trim() === ""
            //     )
            // ) {
            //   setGeneralErrorMessage((prev) => ({
            //     ...prev,
            //     ErrorMessage: "please Fill This Form",
            //     isError: true,
            //     value: true,
            //   }));
            // }

            // setGeneralErrorMessage((prev) => ({
            //   ...prev,
            //   ErrorMessage: "",
            //   isError: false,
            // }));
            handleAction({ type: "handleUpdateList", payload: { listIndex } });
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
