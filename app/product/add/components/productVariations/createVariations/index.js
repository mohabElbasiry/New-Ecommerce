import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function ProductVariation() {
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [currentValues, setCurrentValues] = useState([
    { value_ar: "", value_en: "", color: "" },
  ]);
  const [error, setError] = useState([]);
  const handleOptionChange = (event) => {
    setCurrentOption(event.target.value);
  };
  const handleKeyDown = useCallback(
    (event, index) => {
      if (event.keyCode === 8 && event.target.value === "") {
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
          }
        }
      }
    },
    [currentValues]
  );
  const handleValueChange = useCallback(
    (event, index, isAr = false) => {
      if (
        (event?.target?.value !== "" &&
          currentValues?.length &&
          currentValues?.some(
            (item) => item?.value_en?.trim() === event.target.value
          )) ||
        currentValues?.some(
          (item) => item?.value_ar?.trim() === event.target.value
        )
      ) {
        setError((prev) => {
          if (prev?.length) {
            const founded = prev?.find((item, idx) => item?.index === index);
            if (founded) {
              return prev;
            }
          }
          const newObj = {
            index: index,
            Message: "This Value Already Exist",
            isAr,
            isEn: !isAr,
          };
          return [...prev, newObj];
        });
      }
      const founded = error?.find((item, idx) => item?.index === index);
      if (founded) {
        console.log("Founded", founded);
        setError((prev) =>
          prev?.filter((item, idx) => item?.index !== founded?.index)
        );
      }
      const newValues = [...currentValues];
      if (isAr) {
        newValues[index] = {
          value_ar: event.target.value,
          color: "",
        };
      } else {
        newValues[index] = {
          value_en: event.target.value,
          color: "",
        };
      }

      setCurrentValues(newValues);
      updateOptions(currentOption, newValues);
    },
    [currentValues]
  );

  const updateOptions = (optionName, optionValues) => {
    if (optionName.trim() !== "") {
      const newOptions = [...options];
      const optionIndex = newOptions.findIndex(
        (option) => option.name === optionName
      );

      if (optionIndex !== -1) {
        newOptions[optionIndex].values = optionValues.filter(
          (value) => value.trim() !== ""
        );
      } else {
        newOptions.push({
          name: optionName,
          values: optionValues.filter((value) => value.trim() !== ""),
        });
      }
      setOptions(newOptions);
    }
  };

  useMemo(() => {
    if (currentValues[currentValues.length - 1]?.value_en?.trim() !== "") {
      setCurrentValues([
        ...currentValues,
        { value_ar: "", value_en: "", color: "" },
      ]);
    }
  }, [JSON.stringify(currentValues)]);
  const HandleDelete = useCallback(
    (index) => {
      setCurrentValues((prev) => {
        const DeletedItem = prev?.filter((item, idx) => idx !== index);
        return DeletedItem;
      });
    },
    [JSON.stringify(currentValues)]
  );
  console.log(currentValues, "currentValues");
  const handleBlur = (e, idx) => {
    if (currentValues?.length) {
      const founded = currentValues?.some((item, iedx) => iedx === idx);
      console.log(founded && e.target.value === "", "foundeddsa");
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
  return (
    <div className="w-[60%]">
      <p>Option Name</p>

      <div>
        <InputWithLabelComponent
          Input
          type="text"
          value={currentOption}
          onChange={handleOptionChange}
          placeholder="Enter option name"
        />
        <p className="my-3">Option values</p>
        {currentValues.map((value, index) => (
          <div className="flex gap-2  w-fit flex-col">
            <div className="flex gap-1">
              <InputWithLabelComponent
                Input
                type="text"
                label="option in English"
                name="value_en"
                key={index}
                value={value?.value_en}
                onChange={(event) => handleValueChange(event, index, false)}
                placeholder={`Enter value ${index + 1}`}
                isRequired={index !== currentValues?.length - 1}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onBlur={(e) => handleBlur(e, index)}
                isError={
                  error?.some((item) => item?.index === index) &&
                  index !== currentValues?.length - 1 &&
                  error?.find((item) => item?.index === index)?.isEn
                }
                message={error?.find((item) => item?.index === index)?.Message}
              />
              <InputWithLabelComponent
                Input
                label="option in arabic"
                type="text"
                name="value_ar"
                key={index}
                value={value?.value_ar}
                onChange={(event) => handleValueChange(event, index, true)}
                placeholder={`Enter value ${index + 1}`}
                isRequired={index !== currentValues?.length - 1}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onBlur={(e) => handleBlur(e, index)}
                isError={
                  error?.some((item) => item?.index === index) &&
                  index !== currentValues?.length - 1 &&
                  error?.find((item) => item?.index === index)?.isAr
                }
                message={error?.find((item) => item?.index === index)?.Message}
              />
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

            <div>
              {/* {error?.some((item) => item?.index === index)
                ? error?.find((item) => item.index === index)?.Message
                : null} */}
            </div>
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
}
