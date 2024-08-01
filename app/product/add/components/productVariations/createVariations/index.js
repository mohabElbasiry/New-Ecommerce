import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SketchPicker } from "react-color";
import { handleError } from "./functions/setError";
import { Reorder } from "framer-motion";
import { produce } from "immer";
import { generateQualities } from "../collapseView/functions/GenerateQualities";
import { shapeData } from "../collapseView/functions/datashape";
import { ReorderIcon } from "../../drageControl";
import { uid } from "uid";

export default function CreateVariation({ listIndex, setList, list }) {
  const [currentOption, setCurrentOption] = useState({
    option_en: "",
    option_ar: "",
    error: false,
    ErrorMessage: "",
  });
  const [currentValues, setCurrentValues] = useState([
    {
      // value_ar: "",
      value_en: "",
      color: "",
      id: uid(),
    },
  ]);
  const [color, opencolor] = useState({ index: -1, open: false });
  const [GeneralErrorMessage, setGeneralErrorMessage] = useState({
    isError: false,
    ErrorMessage: "",
    value: false,
  });
  const [error, setError] = useState([]);
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
  const handleKeyDown = useCallback(
    (event, index, item) => {
      const itemFounded = currentValues?.find((_, idx) => idx === index);
      if (
        event.keyCode === 8 &&
        event.target.value === "" &&
        itemFounded &&
        // itemFounded?.value_ar === "" &&
        itemFounded?.value_en === ""
      ) {
        if (index === 0) {
          return;
        }
        if (currentValues?.some((item, idx) => idx === index)) {
          if (event?.target?.value === "") {
            setTimeout(() => {
              setCurrentValues((prev) => {
                return prev?.filter((_, idx) => idx !== index);
              });
            }, 100);
            setError((prev) => {
              if (
                error?.length &&
                prev?.some((item) => item?.index === index)
              ) {
                return prev?.filter((item) => item?.index !== index);
              } else {
                return prev;
              }
            });
          }
        }
      }
    },
    [currentValues]
  );

  const handleValueChange = useCallback(
    (event, index, isAr = false) => {
      handleError(event, index, isAr, setError, currentValues, error);
      const newValues = [...currentValues];

      if (isAr) {
        // newValues[index] = {
        //   ...newValues[index],
        //   value_ar: event.target.value,
        //   color: "",
        // };
      } else {
        newValues[index] = {
          ...newValues[index],
          value_en: event.target.value,
          color: "",
        };
      }
      setCurrentValues(newValues);
      // updateOptions(currentOption, newValues);
    },
    [currentValues]
  );

  const HandleDelete = useCallback(
    (index) => {
      setCurrentValues((prev) => {
        const DeletedItem = prev?.filter((item, idx) => idx !== index);
        return DeletedItem;
      });
    },
    [JSON.stringify(currentValues)]
  );
  const handleBlur = (e, idx) => {
    if (currentValues?.length) {
      const founded = currentValues?.some((item, iedx) => iedx === idx);
      if (
        founded &&
        e.target.value === "" &&
        idx !== currentValues?.length - 1
      ) {
        setError((prev) => {
          if (prev?.some((_, i) => i.index === idx)) {
            prev?.map((item, i) => {
              if (i === idx) {
                return {
                  index: idx,
                  Message: "Required",
                  isAr,
                  isEn: !isAr,
                };
              } else {
                return i;
              }
            });
          } else {
            return [...prev, { index: idx, Message: "Required" }];
          }
        });
      }
    }
  };
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
      currentValues[currentValues.length - 1]?.value_en?.trim() !== ""
      // &&
      // currentValues[currentValues.length - 1]?.value_ar?.trim() !== ""
    ) {
      setCurrentValues([
        ...currentValues,
        {
          value_ar: "",
          value_en: "",
          color: "",
          id: uid(),
        },
      ]);
    }
  }, [currentValues]);

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
          {currentValues?.map((value, index) => (
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
                    onKeyDown={(e) => handleKeyDown(e, index, value)}
                    onBlur={(e) => handleBlur(e, index)}
                    isError={
                      error?.find((item) => item?.index === index)?.en?.Message
                    }
                    message={
                      error?.find((item) => item?.index === index)?.en?.Message
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
                  {currentValues?.some((_, idx) => idx === index) &&
                  index !== currentValues?.length - 1 ? (
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

            const isOneOfOthers = list
              ?.filter((option) => !option?.edit)
              .find((option) => {
                return (
                  option?.key_en?.trim() === currentOption?.option_en?.trim()
                );
              });

            if (isOneOfOthers) {
              return;
            }

            if (currentOption.option_en.trim() === "") {
              setGeneralErrorMessage((prev) => ({
                ...prev,
                ErrorMessage: "please Fill This Form",
                isError: true,
                value: false,
              }));
              return;
            }

            if (
              currentValues?.length === 1 &&
              currentValues?.[0]?.value_ar?.trim() === "" &&
              currentValues?.[0]?.value_en?.trim() === ""
            ) {
              setGeneralErrorMessage((prev) => ({
                ...prev,
                ErrorMessage: "please Fill This Form",
                isError: true,
                value: true,
              }));

              return;
            }
            if (
              currentValues?.length > 1 &&
              currentValues
                ?.filter((idx) => idx !== currentValues - 1)
                .every(
                  (item) =>
                    item?.value_ar?.trim() === "" &&
                    item?.value_en?.trim() === ""
                )
            ) {
              setGeneralErrorMessage((prev) => ({
                ...prev,
                ErrorMessage: "please Fill This Form",
                isError: true,
                value: true,
              }));
            }

            setGeneralErrorMessage((prev) => ({
              ...prev,
              ErrorMessage: "",
              isError: false,
            }));
            setList(
              produce((draft) => {
                const Updated = draft.productvaritions.variants.map(
                  (item, idx) => {
                    if (idx === listIndex) {
                      return {
                        ...item,
                        key_en: currentOption?.option_en,
                        key_ar: currentOption?.option_ar,
                        values: currentValues?.filter(
                          (item) =>
                            // item?.value_ar !== "" &&
                            item?.value_en !== ""
                        ),
                        edit: false,
                      };
                    }
                    return item;
                  }
                );

                draft.productvaritions.variants = Updated;
                draft.productvaritions.REfvariants = Updated;
                const dataShape = generateQualities(
                  draft.productvaritions.varitionsValues?.flatMap(
                    (item) => item.values
                  ) || [],
                  Updated || []
                );
                draft.productvaritions.varitionsValues = shapeData(
                  dataShape || [],
                  Updated || []
                );
              })
            );
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
