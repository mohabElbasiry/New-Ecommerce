import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SketchPicker } from "react-color";
import { handleError } from "./functions/setError";
import { Reorder } from "framer-motion";

export default function CreateVariation({ listIndex, setList, list }) {
  const [currentOption, setCurrentOption] = useState({
    option_en: "",
    option_ar: "",
  });
  const [currentValues, setCurrentValues] = useState([
    {
      value_ar: "",
      value_en: "",
      color: "",
    },
  ]);
  const [color, opencolor] = useState({ index: -1, open: false });
  const [GeneralErrorMessage, setGeneralErrorMessage] = useState({
    isError: false,
    ErrorMessage: "",
  });
  const [error, setError] = useState([]);
  const handleOptionChange = (event) => {
    setCurrentOption({
      ...currentOption,
      [event?.target.name]: event?.target.value,
    });
  };
  const handleKeyDown = useCallback(
    (event, index, item) => {
      const itemFounded = currentValues?.find((_, idx) => idx === index);
      if (
        event.keyCode === 8 &&
        event.target.value === "" &&
        itemFounded &&
        itemFounded?.value_ar === "" &&
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
        newValues[index] = {
          ...newValues[index],
          value_ar: event.target.value,
          color: "",
        };
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
    if (
      currentValues[currentValues.length - 1]?.value_en?.trim() !== "" &&
      currentValues[currentValues.length - 1]?.value_ar?.trim() !== ""
    ) {
      setCurrentValues([
        ...currentValues,
        {
          value_ar: "",
          value_en: "",
          color: "",
        },
      ]);
    }
  }, [currentValues]);

  useEffect(() => {
    if (list?.length) {
      setCurrentOption((prev) => ({
        option_ar: list[listIndex]?.key_ar,
        option_en: list[listIndex]?.key_en,
      }));
      setCurrentValues(list[listIndex]?.values);
    }
  }, [list]);
  return (
    <form
      className="w-[100%]"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(currentValues, "handleSubmit");
        if (
          currentValues?.length === 1 &&
          currentValues?.[0]?.value_ar?.trim() === "" &&
          currentValues?.[0]?.value_en?.trim() === ""
        ) {
          setGeneralErrorMessage((prev) => ({
            ...prev,
            ErrorMessage: "please Fill This Form",
            isError: true,
          }));

          return;
        }
        if (
          currentValues?.length > 1 &&
          currentValues
            ?.filter((idx) => idx !== currentValues - 1)
            .every(
              (item) =>
                item?.value_ar?.trim() === "" && item?.value_en?.trim() === ""
            )
        ) {
          setGeneralErrorMessage((prev) => ({
            ...prev,
            ErrorMessage: "please Fill This Form",
            isError: true,
          }));
        }

        setGeneralErrorMessage((prev) => ({
          ...prev,
          ErrorMessage: "",
          isError: false,
        }));

        setList((prev) => {
          return prev?.map((item, idx) => {
            if (idx === listIndex) {
              return {
                ...item,
                key_en: currentOption?.option_en,
                key_ar: currentOption?.option_ar,
                values: currentValues?.filter(
                  (item) => item?.value_ar !== "" && item?.value_en !== ""
                ),
                edit: false,
              };
            }
            return item;
          });
        });
      }}
    >
      <div className="w-[100%] p-3">
        <div className="grid grid-cols-2 gap-1  ">
          <InputWithLabelComponent
            Input
            type="text"
            name={"option_en"}
            value={currentOption?.option_en}
            onChange={handleOptionChange}
            placeholder="Enter option name"
            isRequired
            label="option in en"
            PlaceHolder={`colors`}
          />
          <InputWithLabelComponent
            Input
            type="text"
            value={currentOption?.option_ar}
            name={"option_ar"}
            onChange={handleOptionChange}
            placeholder="Enter option name"
            isRequired
            label="option in ar"
            PlaceHolder={`الالوان`}
          />
        </div>
        <p className="my-3">Option values</p>
        {console.log(currentValues, "currentValues")}
        <Reorder.Group values={currentValues} onReorder={setCurrentValues}>
          {currentValues?.map((value, index) => (
            <div>
              <Reorder.Item
                value={value}
                key={value}
                className="flex gap-2  w-[100%] flex-col "
              >
                <div className="flex gap-3 relative items-center">
                  <InputWithLabelComponent
                    Input
                    type="text"
                    name="value_en"
                    key={index}
                    value={value?.value_en}
                    onChange={(event) => handleValueChange(event, index, false)}
                    PlaceHolder={`value in english`}
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
                  <InputWithLabelComponent
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
                  />
                  <div
                    className={`border w-[30px] h-[30px] my-auto rounded-full border-[#333]`}
                    onClick={() => {
                      opencolor({
                        ...color,
                        index: index,
                        open: !color?.open,
                      });
                    }}
                  ></div>

                  <div className="absolute top-0 right-[-250px]">
                    {color?.index === index && color?.open ? (
                      <SketchPicker />
                    ) : null}
                  </div>
                  {currentValues?.some((_, idx) => idx === index) &&
                  index !== currentValues?.length - 1 ? (
                    <button
                      onClick={() => HandleDelete(index)}
                      className="w-[25px]   right-3 top-[30%]"
                    >
                      <img src="/trash.svg" />
                    </button>
                  ) : null}
                </div>
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
            setList((prev) => prev?.filter((_, idx) => idx !== listIndex));
          }}
          className="bg-[#eee] shadow text-black text-xs   rounded-lg px-3 p-1"
        >
          Delete
        </button>
        <button
          type="submit"
          className="bg-[#fefefed] shadow text-black text-xs border border-[#33333370] rounded-lg px-3 p-1"
        >
          Done
        </button>
      </div>
    </form>
  );
}
